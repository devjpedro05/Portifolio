import { useEffect, useRef, useState } from "react";
import "./TiltedCard.css";

export default function TiltedCard({
  children,
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.06,
  rotateAmplitude = 10,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  className = "",
  style = {},
  ...rest
}) {
  const ref = useRef(null);
  const captionRef = useRef(null);
  const [lastY, setLastY] = useState(0);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;

    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateInteractiveState = () => {
      setIsInteractive(hoverQuery.matches && !reducedMotionQuery.matches);
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
    const removeReduced = bindListener(reducedMotionQuery, updateInteractiveState);

    return () => {
      removeHover();
      removeReduced();
    };
  }, []);

  const updateTransform = (rotateX, rotateY, scale) => {
    if (!ref.current) return;

    ref.current.style.setProperty("--tilted-card-rotate-x", `${rotateX}deg`);
    ref.current.style.setProperty("--tilted-card-rotate-y", `${rotateY}deg`);
    ref.current.style.setProperty("--tilted-card-scale", scale);
  };

  const handleMouseMove = (event) => {
    if (!isInteractive || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    updateTransform(rotationX, rotationY, scaleOnHover);

    if (captionRef.current && showTooltip) {
      captionRef.current.style.left = `${event.clientX - rect.left}px`;
      captionRef.current.style.top = `${event.clientY - rect.top}px`;
      captionRef.current.style.opacity = "1";

      const velocityY = offsetY - lastY;
      captionRef.current.style.transform = `translate3d(0, 0, 0) rotate(${-velocityY * 0.35}deg)`;
      setLastY(offsetY);
    }
  };

  const handleMouseEnter = () => {
    if (!isInteractive) return;
    updateTransform(0, 0, scaleOnHover);
  };

  const handleMouseLeave = () => {
    updateTransform(0, 0, 1);

    if (captionRef.current) {
      captionRef.current.style.opacity = "0";
      captionRef.current.style.transform = "translate3d(0, 0, 0) rotate(0deg)";
    }
  };

  return (
    <figure
      ref={ref}
      className={`tilted-card-figure ${className}`.trim()}
      style={{
        height: containerHeight,
        width: containerWidth,
        ...style,
      }}
      {...rest}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning ? (
        <div className="tilted-card-mobile-alert">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      ) : null}

      <div
        className="tilted-card-inner"
        style={{
          width: imageWidth,
          height: imageHeight,
        }}
      >
        {children ? (
          <div className="tilted-card-content">{children}</div>
        ) : (
          <img
            src={imageSrc}
            alt={altText}
            className="tilted-card-img"
            style={{
              width: imageWidth,
              height: imageHeight,
            }}
          />
        )}

        {displayOverlayContent && overlayContent ? (
          <div className="tilted-card-overlay">{overlayContent}</div>
        ) : null}
      </div>

      {showTooltip && captionText ? (
        <figcaption ref={captionRef} className="tilted-card-caption">
          {captionText}
        </figcaption>
      ) : null}
    </figure>
  );
}
