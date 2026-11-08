import { useEffect, useRef } from "react";

const CELL = 44;
const DIRECTIONS = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

const random = (min, max) => min + Math.random() * (max - min);
const randomInt = (min, max) => Math.floor(random(min, max + 1));

// Gera uma trilha estilo placa de circuito: segmentos retos na grade, com curvas de 45°.
const createTrace = (columns, rows) => {
  let x = randomInt(0, columns);
  let y = randomInt(0, rows);
  let direction = DIRECTIONS[randomInt(0, 3)];
  const points = [[x * CELL, y * CELL]];
  const segments = randomInt(3, 7);

  for (let i = 0; i < segments; i += 1) {
    const steps = randomInt(2, 6);
    x += direction[0] * steps;
    y += direction[1] * steps;
    points.push([x * CELL, y * CELL]);

    const candidates = DIRECTIONS.filter(
      ([dx, dy]) =>
        !(dx === -direction[0] && dy === -direction[1]) &&
        !(dx === direction[0] && dy === direction[1]) &&
        Math.abs(dx - direction[0]) + Math.abs(dy - direction[1]) <= 2,
    );
    direction = candidates[randomInt(0, candidates.length - 1)];
  }

  const lengths = [];
  let total = 0;
  for (let i = 1; i < points.length; i += 1) {
    const length = Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
    lengths.push(length);
    total += length;
  }

  return { points, lengths, total };
};

const pointAt = (trace, distance) => {
  let remaining = Math.max(0, Math.min(distance, trace.total));
  for (let i = 0; i < trace.lengths.length; i += 1) {
    if (remaining <= trace.lengths[i]) {
      const t = trace.lengths[i] === 0 ? 0 : remaining / trace.lengths[i];
      const [x1, y1] = trace.points[i];
      const [x2, y2] = trace.points[i + 1];
      return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t];
    }
    remaining -= trace.lengths[i];
  }
  return trace.points[trace.points.length - 1];
};

const drawTraceSection = (context, trace, from, to) => {
  const start = Math.max(0, from);
  const end = Math.min(trace.total, to);
  if (end <= start) return;

  context.beginPath();
  const [sx, sy] = pointAt(trace, start);
  context.moveTo(sx, sy);

  let walked = 0;
  for (let i = 0; i < trace.lengths.length; i += 1) {
    walked += trace.lengths[i];
    if (walked > start && walked < end) context.lineTo(trace.points[i + 1][0], trace.points[i + 1][1]);
  }

  const [ex, ey] = pointAt(trace, end);
  context.lineTo(ex, ey);
  context.stroke();
};

// Fundo animado: trilhas de circuito quase invisíveis com pulsos de dados
// percorrendo-as. Canvas 2D leve, pausa com a aba oculta e fica estático
// para quem prefere menos movimento.
export default function CircuitBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const staticLayer = document.createElement("canvas");
    const staticContext = staticLayer.getContext("2d");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let traces = [];
    let pulses = [];
    let frame = 0;
    let lastTime = 0;
    let width = 0;
    let height = 0;
    let ratio = 1;

    const spawnPulse = (pulse = {}) => {
      const trace = traces[randomInt(0, traces.length - 1)];
      return Object.assign(pulse, {
        trace,
        distance: -random(0, trace.total),
        speed: random(70, 150),
        tail: random(70, 140),
        hue: Math.random() > 0.5 ? "34, 211, 238" : "37, 99, 235",
      });
    };

    const build = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      const isSmall = width < 768;

      for (const target of [canvas, staticLayer]) {
        target.width = Math.round(width * ratio);
        target.height = Math.round(height * ratio);
      }
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const columns = Math.ceil(width / CELL);
      const rows = Math.ceil(height / CELL);
      const traceCount = Math.round((columns * rows) / (isSmall ? 34 : 26));
      traces = Array.from({ length: traceCount }, () => createTrace(columns, rows));

      staticContext.setTransform(ratio, 0, 0, ratio, 0, 0);
      staticContext.clearRect(0, 0, width, height);
      staticContext.lineWidth = 1;
      staticContext.lineJoin = "round";
      staticContext.strokeStyle = "rgba(56, 189, 248, 0.055)";
      for (const trace of traces) {
        drawTraceSection(staticContext, trace, 0, trace.total);
        const [ex, ey] = trace.points[trace.points.length - 1];
        staticContext.beginPath();
        staticContext.arc(ex, ey, 2.4, 0, Math.PI * 2);
        staticContext.fillStyle = "rgba(56, 189, 248, 0.12)";
        staticContext.fill();
      }

      pulses = Array.from({ length: isSmall ? 7 : 16 }, () => spawnPulse());
      paint(0);
    };

    const paint = (delta) => {
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(staticLayer, 0, 0);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.lineCap = "round";
      context.lineJoin = "round";

      for (const pulse of pulses) {
        pulse.distance += pulse.speed * delta;
        if (pulse.distance - pulse.tail > pulse.trace.total) spawnPulse(pulse);
        if (pulse.distance <= 0) continue;

        const head = Math.min(pulse.distance, pulse.trace.total);
        const gradientStart = pointAt(pulse.trace, pulse.distance - pulse.tail);
        const gradientEnd = pointAt(pulse.trace, head);
        const gradient = context.createLinearGradient(...gradientStart, ...gradientEnd);
        gradient.addColorStop(0, `rgba(${pulse.hue}, 0)`);
        gradient.addColorStop(1, `rgba(${pulse.hue}, 0.75)`);

        context.strokeStyle = gradient;
        context.lineWidth = 1.4;
        drawTraceSection(context, pulse.trace, pulse.distance - pulse.tail, head);

        if (pulse.distance <= pulse.trace.total) {
          context.beginPath();
          context.arc(gradientEnd[0], gradientEnd[1], 1.8, 0, Math.PI * 2);
          context.fillStyle = `rgba(${pulse.hue}, 1)`;
          context.shadowColor = `rgba(${pulse.hue}, 1)`;
          context.shadowBlur = 10;
          context.fill();
          context.shadowBlur = 0;
        }
      }
    };

    const loop = (time) => {
      const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
      lastTime = time;
      paint(delta);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      lastTime = 0;
      if (!reducedMotion.matches && !document.hidden) frame = requestAnimationFrame(loop);
    };

    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // celulares disparam resize ao esconder a barra do navegador: ignora só mudança de altura pequena
        if (Math.abs(window.innerWidth - width) < 2 && Math.abs(window.innerHeight - height) < 120) return;
        build();
      }, 200);
    };

    build();
    start();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", start);
    reducedMotion.addEventListener("change", start);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", start);
      reducedMotion.removeEventListener("change", start);
    };
  }, []);

  return <canvas ref={canvasRef} className="circuit-background" aria-hidden="true" />;
}
