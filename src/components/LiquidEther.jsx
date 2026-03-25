import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./LiquidEther.css";

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec2 uPrevMouse;
  uniform float uTime;
  uniform float uIntensity;
  uniform float uCursorSize;
  uniform vec3 uColor0;
  uniform vec3 uColor1;
  uniform vec3 uColor2;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
      (c - a) * u.y * (1.0 - u.x) +
      (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p = p * 2.1 + vec2(1.7, -1.3);
      amplitude *= 0.52;
    }

    return value;
  }

  float segmentDistance(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / max(dot(ba, ba), 0.0001), 0.0, 1.0);
    return length(pa - ba * h);
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv - 0.5;
    p.x *= uResolution.x / max(uResolution.y, 1.0);

    vec2 mouse = uMouse;
    vec2 prevMouse = uPrevMouse;
    mouse.x *= uResolution.x / max(uResolution.y, 1.0);
    prevMouse.x *= uResolution.x / max(uResolution.y, 1.0);

    float time = uTime * 0.18;
    float flowA = fbm(p * 2.1 + vec2(time * 0.85, -time * 0.45));
    float flowB = fbm((p + flowA * 0.35) * 3.2 - vec2(time * 0.35, time * 0.2));
    float flowC = fbm((p - flowB * 0.2) * 4.2 + vec2(-time * 0.18, time * 0.38));

    float cursor = exp(-length(p - mouse) * mix(9.2, 4.0, clamp(uCursorSize, 0.0, 1.0)));
    float trailLine = exp(-segmentDistance(p, prevMouse, mouse) * 22.0);
    float trailHead = exp(-length(p - mix(prevMouse, mouse, 0.82)) * 8.6);
    float trail = max(trailLine * 1.18, trailHead * 0.78);

    float liquid = smoothstep(
      0.12,
      0.92,
      flowA * 0.9 + flowB * 0.7 + flowC * 0.52 + cursor * 0.84 + trail * 0.74
    );

    vec3 color = mix(uColor0, uColor1, smoothstep(0.16, 0.84, flowA + cursor * 0.18));
    color = mix(color, uColor2, smoothstep(0.28, 0.96, flowB + flowC * 0.4 + cursor * 0.18 + trail * 0.44));

    float sheen = smoothstep(0.38, 1.0, flowC + cursor * 0.22 + trail * 0.52);
    color += vec3(0.12, 0.16, 0.22) * sheen;
    color += mix(uColor1, uColor2, 0.35) * trail * 0.38;

    float alpha = liquid * (0.1 + uIntensity * 0.14) + cursor * 0.1 + trail * 0.26;
    alpha *= 0.7;

    gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.48));
  }
`;

export default function LiquidEther({
  mouseForce = 20,
  cursorSize = 100,
  resolution = 0.35,
  colors = ["#22D3EE", "#38BDF8", "#8B5CF6"],
  style = {},
  className = "",
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 1.35,
  autoResumeDelay = 3000,
}) {
  const mountRef = useRef(null);
  const animationRef = useRef(0);
  const rendererRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const visibilityObserverRef = useRef(null);
  const lastInteractionRef = useRef(Date.now());
  const pointerRef = useRef({ x: 0.08, y: -0.02, active: false });

  useEffect(() => {
    if (!mountRef.current) return undefined;

    const container = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    rendererRef.current = renderer;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    container.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uResolution: { value: new THREE.Vector2(1, 1) },
        uMouse: { value: new THREE.Vector2(0.08, -0.02) },
        uPrevMouse: { value: new THREE.Vector2(0.08, -0.02) },
        uTime: { value: 0 },
        uIntensity: { value: autoIntensity },
        uCursorSize: { value: THREE.MathUtils.clamp(cursorSize / 180, 0.2, 1) },
        uColor0: { value: new THREE.Color(colors[0] || "#22D3EE") },
        uColor1: { value: new THREE.Color(colors[1] || "#38BDF8") },
        uColor2: { value: new THREE.Color(colors[2] || "#8B5CF6") },
      },
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const clock = new THREE.Clock();
    let isVisible = true;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      renderer.setSize(width, height, false);
      material.uniforms.uResolution.value.set(width * resolution, height * resolution);
    };

    const setPointerFromClient = (clientX, clientY) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const nx = (clientX - rect.left) / rect.width;
      const ny = (clientY - rect.top) / rect.height;
      pointerRef.current = {
        x: (nx - 0.5) * 2,
        y: -(ny - 0.5) * 2,
        active:
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom,
      };
      lastInteractionRef.current = Date.now();
    };

    const handlePointerMove = (event) => {
      setPointerFromClient(event.clientX, event.clientY);
    };

    const handleTouchMove = (event) => {
      const touch = event.touches[0];
      if (!touch) return;
      setPointerFromClient(touch.clientX, touch.clientY);
    };

    const animate = () => {
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();
      const idleFor = Date.now() - lastInteractionRef.current;
      const autoActive = autoDemo && idleFor > autoResumeDelay;

      let targetX = pointerRef.current.x;
      let targetY = pointerRef.current.y;

      if (autoActive || !pointerRef.current.active) {
        const orbit = elapsed * autoSpeed;
        targetX = Math.sin(orbit * 1.1) * 0.36;
        targetY = Math.cos(orbit * 0.82) * 0.22;
      }

      const targetVector = new THREE.Vector2(
        targetX * (mouseForce / 20) * 0.95,
        targetY * (mouseForce / 20) * 0.95
      );

      material.uniforms.uTime.value = elapsed;
      material.uniforms.uPrevMouse.value.copy(material.uniforms.uMouse.value);
      material.uniforms.uMouse.value.lerp(targetVector, autoActive ? 0.045 : 0.22);

      renderer.render(scene, camera);
      animationRef.current = window.requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);
    resizeObserverRef.current = resizeObserver;

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = !!entry?.isIntersecting;
        if (isVisible && !animationRef.current) {
          clock.start();
          animationRef.current = window.requestAnimationFrame(animate);
        } else if (!isVisible && animationRef.current) {
          window.cancelAnimationFrame(animationRef.current);
          animationRef.current = 0;
        }
      },
      { threshold: 0.01 }
    );
    visibilityObserver.observe(container);
    visibilityObserverRef.current = visibilityObserver;

    updateSize();
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    animationRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (animationRef.current) window.cancelAnimationFrame(animationRef.current);
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
      if (visibilityObserverRef.current) visibilityObserverRef.current.disconnect();
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [autoDemo, autoIntensity, autoResumeDelay, autoSpeed, colors, cursorSize, mouseForce, resolution]);

  return <div ref={mountRef} className={`liquid-ether-container ${className}`.trim()} style={style} />;
}
