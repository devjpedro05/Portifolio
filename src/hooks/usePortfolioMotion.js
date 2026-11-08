import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, SplitText, motionQueries, SCRAMBLE_CHARS } from "@/lib/gsap";

const revealOffset = (element, distance) => {
  const direction = element.dataset.reveal;
  if (direction === "left") return { x: distance, y: distance * 0.4 };
  if (direction === "right") return { x: -distance, y: distance * 0.4 };
  if (direction === "soft") return { y: distance * 0.5 };
  return { y: distance };
};

// Entrada do herói, pausada até a intro liberar a tela.
const buildHeroTimeline = ({ isMobile }) => {
  const title = new SplitText(".hero-title", { type: "chars,words", charsClass: "hero-char" });
  const copy = new SplitText(".hero-copy", { type: "lines", mask: "lines" });
  const terminalEntries = gsap.utils.toArray(".terminal-entry");

  const tl = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });

  tl.fromTo(".hero-kicker", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 })
    .fromTo(".hero-title", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, 0.1)
    .fromTo(
      title.chars,
      { autoAlpha: 0, yPercent: 115, rotateX: isMobile ? 0 : -85, transformOrigin: "50% 100%" },
      { autoAlpha: 1, yPercent: 0, rotateX: 0, duration: 1, stagger: 0.03 },
      0.1,
    )
    .fromTo(".hero-role", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, 0.5)
    .to(".hero-role", { duration: 1.1, scrambleText: { text: "{original}", chars: SCRAMBLE_CHARS, speed: 0.5 } }, 0.5)
    .fromTo(".hero-copy", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, 0.65)
    .fromTo(
      copy.lines,
      { yPercent: 100 },
      // as linhas são medidas antes da fonte web carregar; desfaz a divisão no fim
      { yPercent: 0, duration: 0.9, stagger: 0.08, onComplete: () => copy.revert() },
      0.65,
    )
    .fromTo(
      ".hero-cta > *",
      { autoAlpha: 0, y: 24, scale: 0.94 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: "back.out(2)", clearProps: "transform" },
      0.9,
    )
    .fromTo(
      ".hero-visual",
      { autoAlpha: 0, scale: 0.9, y: isMobile ? 20 : 0 },
      { autoAlpha: 1, scale: 1, y: 0, duration: 1.2, ease: "expo.out", clearProps: "transform" },
      0.15,
    )
    .fromTo(".hero-orbit .jp-line", { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.3, stagger: 0.12, ease: "power2.inOut" }, 0.35)
    .fromTo(
      ".hero-orbit .jp-node",
      { scale: 0, transformOrigin: "50% 50%" },
      { scale: 1, duration: 0.5, stagger: 0.12, ease: "back.out(3)" },
      1.1,
    )
    .fromTo(
      ".hero-hex-photo",
      { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)" },
      {
        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        duration: 1.1,
        ease: "expo.inOut",
      },
      0.45,
    )
    .fromTo(".hero-terminal", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.7, clearProps: "transform" }, 1.05)
    .fromTo(".hero-marquee", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8, clearProps: "transform" }, 1.2);

  // terminal "digitando" os comandos, um por vez
  let cursor = 1.35;
  terminalEntries.forEach((entry) => {
    const command = entry.querySelector(".terminal-type");
    const output = entry.querySelector(".terminal-output");
    const text = command.textContent;
    tl.fromTo(command, { text: "" }, { text, duration: text.length * 0.035, ease: "none" }, cursor);
    cursor += text.length * 0.035 + 0.1;
    tl.fromTo(output, { autoAlpha: 0, x: -6 }, { autoAlpha: 1, x: 0, duration: 0.3, ease: "power2.out" }, cursor);
    cursor += 0.25;
  });

  return tl;
};

const setupReveals = ({ distance }) => {
  const items = gsap.utils.toArray("[data-reveal]").filter((element) => !element.closest("#inicio"));
  items.forEach((element) => gsap.set(element, { autoAlpha: 0, ...revealOffset(element, distance) }));

  ScrollTrigger.batch(items, {
    start: "top 90%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { autoAlpha: 1, x: 0, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", clearProps: "transform" }),
  });
};

const setupHeadings = ({ isMobile }) => {
  gsap.utils.toArray(".section-heading").forEach((heading) => {
    const title = heading.querySelector(".section-title");
    const kicker = heading.querySelector(".section-kicker");
    const split = new SplitText(title, { type: "lines,words", mask: "lines" });

    gsap
      .timeline({ scrollTrigger: { trigger: heading, start: "top 86%", once: true } })
      .fromTo(kicker, { autoAlpha: 0, x: -14 }, { autoAlpha: 1, x: 0, duration: 0.5, clearProps: "transform" })
      .fromTo(title, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, 0)
      .fromTo(
        split.words,
        { yPercent: 115, rotate: isMobile ? 0 : 5 },
        { yPercent: 0, rotate: 0, duration: 0.95, stagger: 0.035, ease: "power4.out", onComplete: () => split.revert() },
        0.05,
      )
      .to(
        kicker.querySelector(".section-kicker-index"),
        { duration: 0.6, scrambleText: { text: "{original}", chars: "0123456789" } },
        0,
      );
  });
};

const setupCounters = () => {
  gsap.utils.toArray(".count-up").forEach((element) => {
    const value = Number(element.dataset.value);
    const decimals = Number(element.dataset.decimals || 0);
    const counter = { value: 0 };
    const format = (number) => number.toFixed(decimals).replace(".", ",");

    element.textContent = format(0);
    gsap.to(counter, {
      value,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: { trigger: element, start: "top 88%", once: true },
      onUpdate: () => {
        element.textContent = format(counter.value);
      },
    });
  });
};

const setupSolutions = () => {
  gsap.utils.toArray(".solution-row").forEach((row) => {
    gsap
      .timeline({ scrollTrigger: { trigger: row, start: "top 88%", once: true } })
      .fromTo(row.querySelector(".solution-line"), { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "expo.out" })
      .fromTo(
        row.querySelector(".solution-index"),
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.6, scrambleText: { text: "{original}", chars: "0123456789" } },
        0.1,
      )
      .fromTo(
        row.querySelector(".solution-icon"),
        { scale: 0, rotate: -90 },
        { scale: 1, rotate: 0, duration: 0.7, ease: "back.out(2.2)", clearProps: "transform" },
        0.2,
      );
  });

  gsap.fromTo(
    ".diff-chip",
    { autoAlpha: 0, y: 12 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.45,
      stagger: 0.05,
      ease: "back.out(2)",
      clearProps: "transform",
      scrollTrigger: { trigger: ".diff-strip", start: "top 88%", once: true },
    },
  );
};

const setupChips = (containerSelector, chipSelector) => {
  gsap.utils.toArray(containerSelector).forEach((container) => {
    gsap.fromTo(
      container.querySelectorAll(chipSelector),
      { autoAlpha: 0, scale: 0.6 },
      {
        autoAlpha: 1,
        scale: 1,
        duration: 0.45,
        stagger: 0.04,
        ease: "back.out(2.4)",
        clearProps: "transform",
        scrollTrigger: { trigger: container, start: "top 86%", once: true },
      },
    );
  });
};

const setupProjects = ({ isDesktop, isMobile }) => {
  const items = gsap.utils.toArray(".project-stack-item");

  items.forEach((item, index) => {
    const card = item.querySelector(".project-card");
    const indexElement = item.querySelector(".project-index");
    const indexLabel = indexElement.textContent;

    gsap
      .timeline({ scrollTrigger: { trigger: item, start: "top 85%", once: true } })
      .fromTo(
        card,
        { autoAlpha: 0, y: isMobile ? 30 : 70, rotateX: isMobile ? 0 : 12, transformPerspective: 1200, transformOrigin: "50% 0%" },
        { autoAlpha: 1, y: 0, rotateX: 0, duration: 1, ease: "power3.out", clearProps: "transform" },
      )
      .to(indexElement, { duration: 0.8, scrambleText: { text: indexLabel, chars: "0123456789" } }, 0.1)
      .fromTo(
        item.querySelectorAll(".project-detail-item"),
        { autoAlpha: 0, x: isMobile ? -10 : -22 },
        { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.06, clearProps: "transform" },
        0.35,
      );

    // desktop: os cards ficam "grudados" e cada um recua quando o próximo chega por cima
    const next = items[index + 1];
    if (isDesktop && next) {
      gsap
        .timeline({
          scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true },
        })
        .to(item, { scale: 0.93, ease: "none" }, 0)
        .to(item.querySelector(".project-card-shade"), { autoAlpha: 0.65, ease: "none" }, 0);
    }
  });
};

const setupScrollSpy = (onSectionChange) => {
  gsap.utils.toArray("main section[id]").forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top 45%",
      end: "bottom 45%",
      onToggle: (self) => {
        if (self.isActive) onSectionChange.current?.(section.id);
      },
    });
  });
};

const setupHeader = () => {
  ScrollTrigger.create({
    start: 40,
    end: "max",
    toggleClass: { targets: ".site-header", className: "is-scrolled" },
  });
};

const setupMagnetic = () => {
  const removers = gsap.utils.toArray(".magnetic").map((element) => {
    const xTo = gsap.quickTo(element, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(element, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (event) => {
      const rect = element.getBoundingClientRect();
      xTo((event.clientX - rect.left - rect.width / 2) * 0.3);
      yTo((event.clientY - rect.top - rect.height / 2) * 0.4);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("pointermove", onMove);
    element.addEventListener("pointerleave", onLeave);
    return () => {
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
    };
  });

  return () => removers.forEach((remove) => remove());
};

const setupCursorGlow = (scope) => {
  const glow = scope.current?.querySelector(".cursor-glow");
  if (!glow) return () => {};

  gsap.set(glow, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
  const xTo = gsap.quickTo(glow, "x", { duration: 0.7, ease: "power3.out" });
  const yTo = gsap.quickTo(glow, "y", { duration: 0.7, ease: "power3.out" });

  const onMove = (event) => {
    gsap.to(glow, { autoAlpha: 1, duration: 0.4, overwrite: "auto" });
    xTo(event.clientX);
    yTo(event.clientY);
  };

  window.addEventListener("pointermove", onMove);
  return () => window.removeEventListener("pointermove", onMove);
};

const setupParallax = () => {
  const scrub = { trigger: "#inicio", start: "top top", end: "bottom top", scrub: true };
  gsap.to(".hero-hex", { yPercent: -10, ease: "none", scrollTrigger: scrub });
  gsap.to(".hero-orbit", { rotate: 14, ease: "none", scrollTrigger: { ...scrub } });
  gsap.to(".hero-terminal", { yPercent: -35, ease: "none", scrollTrigger: { ...scrub } });
  // ao rolar, a pessoa "avança" e o fundo do hexágono recua
  gsap.to(".hero-person", { scale: 1.08, transformOrigin: "50% 100%", ease: "none", scrollTrigger: { ...scrub } });
  gsap.to(".hex-depth", { scale: 0.9, ease: "none", scrollTrigger: { ...scrub } });
};

// Profundidade atrás da foto: anéis hexagonais vindo do fundo em direção à tela,
// piso em perspectiva andando, partículas se aproximando e, no desktop,
// parallax por camadas seguindo o mouse (o fundo vai para um lado, a pessoa para o outro).
const setupHexDepth = ({ isMobile, finePointer, scope }) => {
  const hex = scope.current?.querySelector(".hero-hex");
  if (!hex) return () => {};

  const ambient = gsap.timeline();
  const ringDuration = 7.5;
  const rings = gsap.utils.toArray(".depth-ring", hex);

  ambient.fromTo(
    rings,
    { scale: 0.15, opacity: 0 },
    {
      keyframes: { scale: [0.15, 0.7, 1.7], opacity: [0, 0.45, 0], easeEach: "none" },
      ease: "power1.in",
      duration: ringDuration,
      stagger: { each: ringDuration / rings.length, repeat: -1 },
    },
    0,
  );

  ambient.to(".hex-depth-floor", { backgroundPosition: "0px 32px, 0px 0px", duration: 3.2, ease: "none", repeat: -1 }, 0);
  ambient.to(".hex-depth-halo", { scale: 1.1, opacity: 0.75, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1 }, 0);

  // pausa o loop quando o herói sai da tela
  ScrollTrigger.create({
    trigger: hex,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => (self.isActive ? ambient.play() : ambient.pause()),
  });

  if (!finePointer) return () => {};

  const depthLayers = [
    [".hex-depth-floor-wrap", -10],
    [".hex-depth-tunnel", -14],
    [".hex-depth-halo", -8],
    [".hero-person", 8],
  ].map(([selector, strength]) => {
    const element = hex.querySelector(selector);
    return {
      strength,
      xTo: gsap.quickTo(element, "x", { duration: 0.9, ease: "power3.out" }),
      yTo: gsap.quickTo(element, "y", { duration: 0.9, ease: "power3.out" }),
    };
  });
  const tiltX = gsap.quickTo(hex, "rotationX", { duration: 1, ease: "power3.out" });
  const tiltY = gsap.quickTo(hex, "rotationY", { duration: 1, ease: "power3.out" });
  gsap.set(hex, { transformPerspective: 1100 });

  const moveLayers = (nx, ny) => {
    depthLayers.forEach(({ strength, xTo, yTo }) => {
      xTo(nx * strength);
      yTo(ny * strength);
    });
    tiltY(nx * 5);
    tiltX(-ny * 4);
  };

  const onMove = (event) => {
    const rect = hex.getBoundingClientRect();
    const nx = gsap.utils.clamp(-1, 1, (event.clientX - rect.left - rect.width / 2) / (rect.width / 2));
    const ny = gsap.utils.clamp(-1, 1, (event.clientY - rect.top - rect.height / 2) / (rect.height / 2));
    moveLayers(nx, ny);
  };
  const onLeave = () => moveLayers(0, 0);

  const hero = scope.current.querySelector("#inicio") ?? hex;
  hero.addEventListener("pointermove", onMove);
  hero.addEventListener("pointerleave", onLeave);
  return () => {
    hero.removeEventListener("pointermove", onMove);
    hero.removeEventListener("pointerleave", onLeave);
  };
};

const showEverything = () => {
  gsap.set(
    "[data-reveal], .hero-kicker, .hero-title, .hero-role, .hero-copy, .hero-cta > *, .hero-visual, .hero-terminal, .hero-marquee, .section-title, .section-kicker",
    { autoAlpha: 1, clearProps: "transform" },
  );
};

// Orquestra as animações do portfólio, com uma versão por tamanho de tela:
// desktop completo, tablet intermediário, celular leve e nenhuma para quem pede menos movimento.
export default function usePortfolioMotion(scope, { onSectionChange } = {}) {
  const heroTimeline = useRef(null);
  const heroReleased = useRef(false);
  const sectionCallback = useRef(onSectionChange);
  sectionCallback.current = onSectionChange;

  useGSAP(
    () => {
      setupScrollSpy(sectionCallback);
      setupHeader();

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: motionQueries.desktop,
          isTablet: motionQueries.tablet,
          isMobile: motionQueries.mobile,
          reduceMotion: motionQueries.reduced,
        },
        (context) => {
          const { isDesktop, isTablet, isMobile, reduceMotion } = context.conditions;

          if (reduceMotion) {
            showEverything();
            return undefined;
          }

          const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
          const distance = isMobile ? 22 : isTablet ? 34 : 48;

          const hero = buildHeroTimeline({ isMobile });
          heroTimeline.current = hero;
          if (heroReleased.current) hero.progress(1);

          setupReveals({ distance });
          setupHeadings({ isMobile });
          setupCounters();
          setupSolutions();
          setupChips(".skill-card", ".skill-chip");
          setupChips(".project-stack-panel", ".project-chip");
          setupProjects({ isDesktop, isMobile });

          const removeDepth = setupHexDepth({ isMobile, finePointer: isDesktop && finePointer, scope });
          let removeCursor = () => {};
          let removeMagnetic = () => {};
          if (isDesktop) {
            setupParallax();
            if (finePointer) {
              removeMagnetic = setupMagnetic();
              removeCursor = setupCursorGlow(scope);
            }
          }

          return () => {
            removeDepth();
            removeCursor();
            removeMagnetic();
            heroTimeline.current = null;
          };
        },
      );
    },
    { scope },
  );

  const releaseHero = () => {
    heroReleased.current = true;
    heroTimeline.current?.play();
  };

  return { releaseHero };
}
