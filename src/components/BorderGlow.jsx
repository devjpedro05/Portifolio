import { useCallback, useEffect, useRef } from "react";
import "./BorderGlow.css";

function parseHSL(hslStr) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 191, s: 92, l: 64 };
  return {
    h: parseFloat(match[1]),
    s: parseFloat(match[2]),
    l: parseFloat(match[3]),
  };
}

function buildGlowVars(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ["", "-60", "-50", "-40", "-30", "-20", "-10"];
  const vars = {};

  for (let index = 0; index < opacities.length; index += 1) {
    vars[`--glow-color${keys[index]}`] = `hsl(${base} / ${Math.min(
      opacities[index] * intensity,
      100
    )}%)`;
  }

  return vars;
}

const GRADIENT_POSITIONS = [
  "82% 18%",
  "70% 32%",
  "12% 12%",
  "40% 34%",
  "86% 82%",
  "76% 16%",
  "26% 84%",
];

const GRADIENT_KEYS = [
  "--gradient-one",
  "--gradient-two",
  "--gradient-three",
  "--gradient-four",
  "--gradient-five",
  "--gradient-six",
  "--gradient-seven",
];

const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildGradientVars(colors) {
  const vars = {};

  for (let index = 0; index < 7; index += 1) {
    const color = colors[Math.min(COLOR_MAP[index], colors.length - 1)];
    vars[GRADIENT_KEYS[index]] = `radial-gradient(at ${GRADIENT_POSITIONS[index]}, ${color} 0px, transparent 52%)`;
  }

  vars["--gradient-base"] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

function easeOutCubic(x) {
  return 1 - (1 - x) ** 3;
}

function animateValue({
  start = 0,
  end = 100,
  duration = 1000,
  delay = 0,
  ease = easeOutCubic,
  onUpdate,
  onEnd,
}) {
  const t0 = performance.now() + delay;

  function tick() {
    const elapsed = performance.now() - t0;
    const t = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) requestAnimationFrame(tick);
    else if (onEnd) onEnd();
  }

  setTimeout(() => requestAnimationFrame(tick), delay);
}

export default function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "191 92 64",
  backgroundColor = "rgba(15, 23, 42, 0.78)",
  borderRadius = 32,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = ["#22D3EE", "#38BDF8", "#8B5CF6"],
  fillOpacity = 0.38,
}) {
  const cardRef = useRef(null);

  const handlePointerMove = useCallback(
    (event) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const xPercent = (x / rect.width) * 100;
      const distanceToEdge = Math.min(x, rect.width - x, y, rect.height - y);
      const normalizedEdge = 1 - Math.min(distanceToEdge / Math.max(rect.width, rect.height), 0.45) / 0.45;
      const intensity = Math.max(0.58, normalizedEdge);

      card.style.setProperty("--edge-proximity", `${(intensity * 100).toFixed(3)}`);
      card.style.setProperty("--cursor-x", `${xPercent.toFixed(3)}%`);
    },
    []
  );

  useEffect(() => {
    if (!animated || !cardRef.current) return undefined;

    const card = cardRef.current;
    card.classList.add("sweep-active");
    card.style.setProperty("--cursor-x", "-12%");

    animateValue({
      duration: 350,
      start: 0,
      end: 100,
      onUpdate: (value) => card.style.setProperty("--edge-proximity", value.toFixed(3)),
    });

    animateValue({
      duration: 1800,
      start: -12,
      end: 112,
      onUpdate: (value) => card.style.setProperty("--cursor-x", `${value.toFixed(3)}%`),
    });

    animateValue({
      delay: 1500,
      duration: 800,
      start: 100,
      end: 0,
      onUpdate: (value) => card.style.setProperty("--edge-proximity", value.toFixed(3)),
      onEnd: () => card.classList.remove("sweep-active"),
    });

    return () => {
      card.classList.remove("sweep-active");
    };
  }, [animated]);

  const glowVars = buildGlowVars(glowColor, glowIntensity);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={`border-glow-card ${className}`.trim()}
      style={{
        "--card-bg": backgroundColor,
        "--edge-sensitivity": edgeSensitivity,
        "--border-radius": `${borderRadius}px`,
        "--glow-padding": `${glowRadius}px`,
        "--cone-spread": coneSpread,
        "--fill-opacity": fillOpacity,
        ...glowVars,
        ...buildGradientVars(colors),
      }}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">{children}</div>
    </div>
  );
}
