import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(
  useGSAP,
  DrawSVGPlugin,
  MotionPathPlugin,
  ScrambleTextPlugin,
  ScrollTrigger,
  SplitText,
  TextPlugin,
);

gsap.defaults({ ease: "power3.out", duration: 0.8 });

export const motionQueries = {
  desktop: "(min-width: 1024px)",
  tablet: "(min-width: 768px) and (max-width: 1023.98px)",
  mobile: "(max-width: 767.98px)",
  reduced: "(prefers-reduced-motion: reduce)",
};

export const SCRAMBLE_CHARS = "01<>/{}[]#$&*+=_";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export { gsap, useGSAP, ScrollTrigger, SplitText };
