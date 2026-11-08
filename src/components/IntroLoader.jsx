import { useRef } from "react";
import { gsap, useGSAP, SCRAMBLE_CHARS } from "@/lib/gsap";
import JPLogo from "./brand/JPLogo";
import BrandWordmark from "./brand/BrandWordmark";

const SEEN_KEY = "jp-intro-seen";

const readSeen = () => {
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
};

const markSeen = () => {
  try {
    window.sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    // armazenamento indisponível (aba privada): a intro só volta a tocar inteira
  }
};

// Abertura: o circuito do logotipo é desenhado, os nós acendem, o JP se monta
// e o terminal "carrega" o portfólio. Na segunda visita da sessão toca em 2x.
export default function IntroLoader({ onReveal, onDone }) {
  const root = useRef(null);
  const timeline = useRef(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      html.classList.add("intro-lock");

      const counter = { value: 0 };
      const percent = root.current.querySelector(".intro-percent");

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          html.classList.remove("intro-lock");
          markSeen();
          onDone?.();
        },
      });
      timeline.current = tl;

      tl.set(".jp-line", { drawSVG: "0%" })
        .set(".jp-code", { drawSVG: "50% 50%" })
        .set(".jp-node", { scale: 0, transformOrigin: "50% 50%" })
        .set(".jp-letter", { autoAlpha: 0, y: 26 })
        .set(".brand-wordmark-tagline", { autoAlpha: 0, letterSpacing: "0.9em" })
        .to(".intro-grid", { autoAlpha: 1, duration: 0.6 }, 0)
        .to(".jp-line", { drawSVG: "100%", duration: 0.7, stagger: 0.1, ease: "power2.inOut" }, 0.1)
        .to(".jp-node", { scale: 1, duration: 0.45, stagger: 0.08, ease: "back.out(3)" }, 0.55)
        .to(".jp-letter", { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.12 }, 0.6)
        .to(".jp-code", { drawSVG: "0% 100%", duration: 0.45, stagger: 0.06 }, 1.0)
        .to(".intro-logo", { filter: "drop-shadow(0 0 28px rgba(34,211,238,0.55))", duration: 0.5 }, 1.05)
        .to(
          ".brand-wordmark-name > span",
          {
            duration: 0.8,
            stagger: 0.12,
            scrambleText: { text: "{original}", chars: SCRAMBLE_CHARS, speed: 0.6 },
          },
          0.9,
        )
        .to(".brand-wordmark-tagline", { autoAlpha: 1, letterSpacing: "0.42em", duration: 0.8 }, 1.15)
        .to(
          counter,
          {
            value: 100,
            duration: 1.5,
            ease: "power1.inOut",
            onUpdate: () => {
              percent.textContent = `${Math.round(counter.value)}%`;
            },
          },
          0.2,
        )
        .to(".intro-bar-fill", { scaleX: 1, duration: 1.5, ease: "power1.inOut" }, 0.2)
        .addLabel("exit", 1.95)
        .call(() => onReveal?.(), null, "exit")
        .to(".intro-content", { scale: 0.92, autoAlpha: 0, duration: 0.5, ease: "power2.in" }, "exit")
        .to(root.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.8, ease: "expo.inOut" }, "exit+=0.2");

      if (readSeen()) tl.timeScale(2);
    },
    { scope: root },
  );

  const skip = () => {
    const tl = timeline.current;
    if (tl && tl.time() < tl.labels.exit) tl.seek("exit");
  };

  return (
    <div
      ref={root}
      className="intro-loader"
      role="presentation"
      onClick={skip}
      onKeyDown={skip}
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div className="intro-grid" aria-hidden="true" />
      <div className="intro-content">
        <JPLogo className="intro-logo" />
        <BrandWordmark size="lg" className="mt-7 items-center text-center" />
        <div className="intro-terminal" aria-hidden="true">
          <span className="text-cyan-300">&gt;</span> inicializando portfólio
          <span className="intro-percent ml-2 text-cyan-200">0%</span>
          <span className="intro-bar">
            <span className="intro-bar-fill" />
          </span>
        </div>
      </div>
      <button type="button" className="intro-skip" onClick={skip}>
        Pular
      </button>
    </div>
  );
}
