import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import BrandWordmark from "./brand/BrandWordmark";
import JPLogo from "./brand/JPLogo";

// Navbar flutuante. A seção visível na tela fica "selecionada": uma pílula com
// brilho desliza até o link correspondente e, no celular, um chip mostra a seção atual.
export default function SiteHeader({ navItems, activeSection }) {
  const headerRef = useRef(null);
  const firstRun = useRef(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const activeIndex = Math.max(0, navItems.findIndex((item) => item.id === activeSection));
  const activeItem = navItems[activeIndex];

  const { contextSafe } = useGSAP({ scope: headerRef });

  const moveIndicator = contextSafe((animate) => {
    const link = headerRef.current.querySelector(`.desktop-nav [data-section="${activeItem.id}"]`);
    const indicator = headerRef.current.querySelector(".nav-indicator");
    if (!link || !indicator) return;

    const target = { x: link.offsetLeft, width: link.offsetWidth };
    if (!animate) {
      gsap.set(indicator, { ...target, autoAlpha: 1 });
      return;
    }

    gsap
      .timeline()
      .to(indicator, { ...target, autoAlpha: 1, duration: 0.6, ease: "expo.out" })
      .fromTo(
        ".nav-indicator-sweep",
        { xPercent: -120, autoAlpha: 1 },
        { xPercent: 120, autoAlpha: 0, duration: 0.7, ease: "power2.out" },
        0.05,
      )
      .fromTo(link, { scale: 0.92 }, { scale: 1, duration: 0.5, ease: "back.out(3)" }, 0);
  });

  useGSAP(
    () => {
      moveIndicator(!firstRun.current);
      firstRun.current = false;

      gsap.fromTo(
        ".section-chip-label",
        { yPercent: 110, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" },
      );

      const onResize = () => moveIndicator(false);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    },
    { scope: headerRef, dependencies: [activeSection] },
  );

  const closeMenu = () => setMenuOpen(false);

  return (
    <header ref={headerRef} className="site-header fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-3 pt-3 sm:px-6 sm:pt-4">
        <div className="site-header-bar flex items-center justify-between gap-3 rounded-[1.4rem] px-3 py-2 sm:px-4">
          <a
            href="#inicio"
            className="brand-link flex min-w-0 items-center gap-2.5"
            aria-label="João Pedro - Desenvolvedor de Software, voltar ao início"
            onClick={closeMenu}
          >
            <JPLogo className="brand-logo h-10 w-10 shrink-0 sm:h-11 sm:w-11" />
            <BrandWordmark size="sm" />
          </a>

          <nav className="desktop-nav relative hidden items-center lg:flex" aria-label="Seções">
            <span className="nav-indicator" aria-hidden="true">
              <span className="nav-indicator-sweep" />
            </span>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-section={item.id}
                className={`nav-link ${item.id === activeItem.id ? "is-active" : ""}`}
                aria-current={item.id === activeItem.id ? "true" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span className={`section-chip lg:hidden ${menuOpen ? "max-sm:invisible" : ""}`} aria-live="polite">
              <span className="section-chip-dot" />
              <span className="section-chip-label" key={activeItem.id}>
                <span className="text-cyan-300/80">0{activeIndex + 1}</span> {activeItem.label}
              </span>
            </span>

            <a href="#contato" className="header-cta magnetic hidden lg:inline-flex">
              Falar comigo
            </a>

            <button
              type="button"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition duration-300 hover:border-cyan-400/30 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 lg:hidden"
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="relative h-3.5 w-5">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition duration-500 ${
                    menuOpen ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[12px] h-0.5 w-5 rounded-full bg-current transition duration-500 ${
                    menuOpen ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <div
          id="mobile-navigation"
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
            menuOpen ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <nav className="mobile-menu mt-2 grid gap-1 rounded-[1.4rem] p-2 sm:grid-cols-2" aria-label="Seções">
              {navItems.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={closeMenu}
                  className={`mobile-nav-link ${item.id === activeItem.id ? "is-active" : ""}`}
                  aria-current={item.id === activeItem.id ? "true" : undefined}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  <span className="font-mono text-[0.7rem] text-cyan-400/70">0{index + 1}</span>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
