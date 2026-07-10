import { useEffect, useMemo, useRef, useState } from "react";
import "./MagicProjectCard.css";

const DEFAULT_GLOW_COLOR = "34, 211, 238";
const DEFAULT_SPOTLIGHT_RADIUS = 190;

const seededRandom = (seed) => {
  const value = Math.sin(seed * 127.1) * 43758.5453123;
  return value - Math.floor(value);
};

const buildStarField = (count) =>
  Array.from({ length: count }, (_, index) => ({
    id: `star-${index}`,
    x: 8 + seededRandom(index + 1) * 84,
    y: 10 + seededRandom(index + 21) * 78,
    size: 2 + seededRandom(index + 51) * 2.8,
    delay: index * 0.04 + seededRandom(index + 81) * 0.1,
    duration: 3.2 + seededRandom(index + 101) * 2.6,
    follow: 260 + index * 22,
    driftX: (seededRandom(index + 121) - 0.5) * 9,
    driftY: (seededRandom(index + 151) - 0.5) * 11,
    influence: 110 + seededRandom(index + 171) * 85,
  }));

export default function MagicProjectCard({
  as: Component = "article",
  children,
  className = "",
  style = {},
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = 10,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = true,
  enableMagnetism = true,
  clickEffect = true,
  glowColor = DEFAULT_GLOW_COLOR,
  ...rest
}) {
  const cardRef = useRef(null);
  const starRefs = useRef([]);
  const rippleTimeoutsRef = useRef([]);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [ripples, setRipples] = useState([]);

  const stars = useMemo(() => buildStarField(particleCount), [particleCount]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;

    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 768px)");

    const updateInteractiveState = () => {
      setIsInteractive(
        !disableAnimations &&
          hoverQuery.matches &&
          desktopQuery.matches &&
          !reducedMotionQuery.matches,
      );
    };

    updateInteractiveState();

    const bindListener = (query, handler) => {
      if (query.addEventListener) {
        query.addEventListener("change", handler);
        return () => query.removeEventListener("change", handler);
      }

      query.addListener(handler);
      return () => query.removeListener(handler);
    };

    const removeHover = bindListener(hoverQuery, updateInteractiveState);
    const removeDesktop = bindListener(desktopQuery, updateInteractiveState);
    const removeReduced = bindListener(reducedMotionQuery, updateInteractiveState);

    return () => {
      removeHover();
      removeDesktop();
      removeReduced();
    };
  }, [disableAnimations]);

  useEffect(() => {
    return () => {
      rippleTimeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const setCardVariable = (name, value) => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty(name, value);
  };

  const resetStarAttraction = () => {
    starRefs.current.forEach((star) => {
      if (!star) return;
      star.style.setProperty("--magic-star-pull-x", "0px");
      star.style.setProperty("--magic-star-pull-y", "0px");
      star.style.setProperty("--magic-star-brightness", "0");
    });
  };

  const updateStarAttraction = (mouseX, mouseY, width, height) => {
    if (!enableStars) return;

    stars.forEach((star, index) => {
      const starElement = starRefs.current[index];
      if (!starElement) return;

      const baseX = (star.x / 100) * width;
      const baseY = (star.y / 100) * height;
      const dx = mouseX - baseX;
      const dy = mouseY - baseY;
      const distance = Math.hypot(dx, dy);
      const influence = Math.min(Math.max(star.influence, 90), Math.max(width, height) * 0.48);
      const proximity = Math.max(0, 1 - distance / influence);
      const eased = proximity * proximity * (3 - 2 * proximity);
      const magneticStrength = 0.18 + star.size * 0.012;
      const pullX = dx * eased * magneticStrength;
      const pullY = dy * eased * magneticStrength;

      starElement.style.setProperty("--magic-star-pull-x", `${pullX.toFixed(2)}px`);
      starElement.style.setProperty("--magic-star-pull-y", `${pullY.toFixed(2)}px`);
      starElement.style.setProperty("--magic-star-brightness", eased.toFixed(3));
    });
  };

  const resetEffects = () => {
    setCardVariable("--magic-x", "50%");
    setCardVariable("--magic-y", "50%");
    setCardVariable("--magic-rotate-x", "0deg");
    setCardVariable("--magic-rotate-y", "0deg");
    setCardVariable("--magic-shift-x", "0px");
    setCardVariable("--magic-shift-y", "0px");
    setCardVariable("--magic-spotlight-opacity", "0");
    setCardVariable("--magic-glow-opacity", "0");
    resetStarAttraction();
  };

  const handlePointerEnter = (event) => {
    if (!isInteractive) return;
    setIsActive(true);
    setCardVariable("--magic-spotlight-opacity", enableSpotlight ? "1" : "0");
    setCardVariable("--magic-glow-opacity", enableBorderGlow ? "1" : "0");
    handlePointerMove(event);
  };

  const handlePointerMove = (event) => {
    if (!isInteractive || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    const xPercent = (offsetX / rect.width) * 100;
    const yPercent = (offsetY / rect.height) * 100;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setCardVariable("--magic-x", `${xPercent}%`);
    setCardVariable("--magic-y", `${yPercent}%`);

    if (enableTilt) {
      const rotateX = ((offsetY - centerY) / centerY) * -7;
      const rotateY = ((offsetX - centerX) / centerX) * 7;
      setCardVariable("--magic-rotate-x", `${rotateX.toFixed(2)}deg`);
      setCardVariable("--magic-rotate-y", `${rotateY.toFixed(2)}deg`);
    }

    if (enableMagnetism) {
      const shiftX = (offsetX - centerX) * 0.028;
      const shiftY = (offsetY - centerY) * 0.028;
      setCardVariable("--magic-shift-x", `${shiftX.toFixed(2)}px`);
      setCardVariable("--magic-shift-y", `${shiftY.toFixed(2)}px`);
    }

    updateStarAttraction(offsetX, offsetY, rect.width, rect.height);
  };

  const handlePointerLeave = () => {
    setIsActive(false);
    resetEffects();
  };

  const handleClick = (event) => {
    if (!clickEffect || !isInteractive || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const size =
      Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height),
      ) * 2;

    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setRipples((current) => [...current, { id, x, y, size }]);

    const timeoutId = window.setTimeout(() => {
      setRipples((current) => current.filter((ripple) => ripple.id !== id));
    }, 780);

    rippleTimeoutsRef.current.push(timeoutId);
  };

  return (
    <Component
      ref={cardRef}
      className={`magic-project-card ${className}`.trim()}
      data-magic-active={isActive ? "true" : "false"}
      style={{
        "--magic-glow-color": glowColor,
        "--magic-spotlight-radius": `${spotlightRadius}px`,
        ...style,
      }}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      {...rest}
    >
      {enableSpotlight && isInteractive ? (
        <div className="magic-project-card__spotlight" aria-hidden="true" />
      ) : null}
      {enableBorderGlow && isInteractive ? (
        <div className="magic-project-card__border" aria-hidden="true" />
      ) : null}

      {enableStars && isInteractive ? (
        <div className="magic-project-card__stars" aria-hidden="true">
          {stars.map((star, index) => (
            <span
              key={star.id}
              className="magic-project-card__star"
              ref={(node) => {
                starRefs.current[index] = node;
              }}
              style={{
                "--magic-star-base-x": `${star.x}%`,
                "--magic-star-base-y": `${star.y}%`,
                "--magic-star-size": `${star.size}px`,
                "--magic-star-delay": `${star.delay}s`,
                "--magic-star-duration": `${star.duration}s`,
                "--magic-star-follow": `${star.follow}ms`,
                "--magic-star-drift-x": `${star.driftX.toFixed(2)}px`,
                "--magic-star-drift-y": `${star.driftY.toFixed(2)}px`,
              }}
            />
          ))}
        </div>
      ) : null}

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="magic-project-card__ripple"
          aria-hidden="true"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: `${ripple.size}px`,
            height: `${ripple.size}px`,
          }}
        />
      ))}

      <div className="magic-project-card__inner">{children}</div>
    </Component>
  );
}
