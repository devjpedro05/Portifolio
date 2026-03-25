import { Suspense, lazy, useEffect, useState } from "react";
import {
  FaGithub,
  FaInstagram,
  FaLaptopCode,
  FaLayerGroup,
  FaLinkedin,
  FaRocket,
  FaWhatsapp,
} from "react-icons/fa";
import {
  SiDocker,
  SiDotnet,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiSqlite,
  SiSupabase,
  SiVuedotjs,
} from "react-icons/si";
import BorderGlow from "./BorderGlow";
import LogoLoop from "./LogoLoop";
import MagicProjectCard from "./MagicProjectCard";
import SpotlightCard from "./SpotlightCard";
import TiltedCard from "./TiltedCard";

const LiquidEther = lazy(() => import("./LiquidEther"));

const fotoPerfil = "/assets/images/profile/foto-perfil-transparent.png";
const fotoPerfilFallback = "/assets/images/profile/foto-perfil-tech.png";
const fotoPerfilSrc = fotoPerfil.startsWith("/")
  ? `${import.meta.env.BASE_URL}${fotoPerfil.slice(1)}`
  : fotoPerfil;
const fotoPerfilFallbackSrc = fotoPerfilFallback.startsWith("/")
  ? `${import.meta.env.BASE_URL}${fotoPerfilFallback.slice(1)}`
  : fotoPerfilFallback;
const brandIcon = "/assets/images/branding/navbar-logo.png";
const brandIconSrc = brandIcon.startsWith("/")
  ? `${import.meta.env.BASE_URL}${brandIcon.slice(1)}`
  : brandIcon;

const socialLinks = {
  instagram: "https://www.instagram.com/dev.jpedro/",
  linkedin: "https://www.linkedin.com/in/devjpedro05/",
  github: "https://github.com/devjpedro05",
  whatsapp: "https://wa.me/559193557595",
};

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Projetos", href: "#projetos" },
  { label: "Contato", href: "#contato" },
];

const socialItems = [
  { nome: "Instagram", href: socialLinks.instagram, Icon: FaInstagram },
  { nome: "LinkedIn", href: socialLinks.linkedin, Icon: FaLinkedin },
  { nome: "GitHub", href: socialLinks.github, Icon: FaGithub },
  { nome: "WhatsApp", href: socialLinks.whatsapp, Icon: FaWhatsapp },
];

const contactInfo = {
  email: "bjoaopedro123@gmail.com",
  emailHref: "mailto:bjoaopedro123@gmail.com",
  whatsapp: "91 9 9355-7595",
  whatsappHref: socialLinks.whatsapp,
  location: "Goiânia, Goiás, Brasil",
};

const heroHighlights = [
  "Sistemas web e desktop com foco em produto e operação.",
  "Integrações, mapas, banco de dados e arquitetura aplicada.",
  "Entrega de soluções reais com leitura forte de contexto técnico.",
];

const serviceItems = [
  {
    title: "Landing Pages",
    description:
      "Páginas modernas, rápidas e estratégicas para apresentação de serviços, captação de clientes e fortalecimento da presença digital.",
    Icon: FaRocket,
  },
  {
    title: "Sistemas Web para Gestão",
    description:
      "Sistemas personalizados para controle, organização e automação de processos internos, com foco em eficiência e praticidade.",
    Icon: FaLaptopCode,
  },
  {
    title: "Soluções Sob Medida",
    description:
      "Desenvolvimento de funcionalidades e aplicações específicas conforme a necessidade do cliente, com foco em desempenho, usabilidade e escalabilidade.",
    Icon: FaLayerGroup,
  },
];

const serviceHighlights = [
  "Layout moderno",
  "Responsivo",
  "Integração com APIs",
  "Banco de dados",
  "Deploy profissional",
  "Foco em performance",
  "Interface intuitiva",
];

const liquidEtherColors = ["#22D3EE", "#38BDF8", "#8B5CF6"];
const technologyLoopItems = [
  {
    node: (
      <span className="inline-flex items-center gap-3">
        <SiReact className="text-[1em] text-cyan-200" />
        <span className="text-[0.76rem] font-medium uppercase tracking-[0.22em] text-slate-300">
          React
        </span>
      </span>
    ),
    title: "React",
    href: "https://react.dev",
  },
  {
    node: (
      <span className="inline-flex items-center gap-3">
        <SiVuedotjs className="text-[1em] text-emerald-300" />
        <span className="text-[0.76rem] font-medium uppercase tracking-[0.22em] text-slate-300">
          Vue.js
        </span>
      </span>
    ),
    title: "Vue.js",
    href: "https://vuejs.org",
  },
  {
    node: (
      <span className="inline-flex items-center gap-3">
        <SiNodedotjs className="text-[1em] text-lime-300" />
        <span className="text-[0.76rem] font-medium uppercase tracking-[0.22em] text-slate-300">
          Node.js
        </span>
      </span>
    ),
    title: "Node.js",
    href: "https://nodejs.org",
  },
  {
    node: (
      <span className="inline-flex items-center gap-3">
        <SiDotnet className="text-[1em] text-violet-300" />
        <span className="text-[0.76rem] font-medium uppercase tracking-[0.22em] text-slate-300">
          .NET
        </span>
      </span>
    ),
    title: ".NET",
    href: "https://dotnet.microsoft.com",
  },
  {
    node: (
      <span className="inline-flex items-center gap-3">
        <SiPostgresql className="text-[1em] text-sky-300" />
        <span className="text-[0.76rem] font-medium uppercase tracking-[0.22em] text-slate-300">
          PostgreSQL
        </span>
      </span>
    ),
    title: "PostgreSQL",
    href: "https://www.postgresql.org",
  },
  {
    node: (
      <span className="inline-flex items-center gap-3">
        <SiSupabase className="text-[1em] text-emerald-300" />
        <span className="text-[0.76rem] font-medium uppercase tracking-[0.22em] text-slate-300">
          Supabase
        </span>
      </span>
    ),
    title: "Supabase",
    href: "https://supabase.com",
  },
  {
    node: (
      <span className="inline-flex items-center gap-3">
        <SiSqlite className="text-[1em] text-cyan-100" />
        <span className="text-[0.76rem] font-medium uppercase tracking-[0.22em] text-slate-300">
          SQLite
        </span>
      </span>
    ),
    title: "SQLite",
    href: "https://www.sqlite.org",
  },
  {
    node: (
      <span className="inline-flex items-center gap-3">
        <SiDocker className="text-[1em] text-sky-300" />
        <span className="text-[0.76rem] font-medium uppercase tracking-[0.22em] text-slate-300">
          Docker
        </span>
      </span>
    ),
    title: "Docker",
    href: "https://www.docker.com",
  },
];
const getRevealStyle = (delay = 0) => ({ "--reveal-delay": `${delay}ms` });

function SectionHeading({ kicker, title, description }) {
  return (
    <div className="max-w-3xl">
      <span className="section-kicker reveal-item" data-reveal="soft" style={getRevealStyle(0)}>
        {kicker}
      </span>
      <h2
        className="reveal-item mt-5 text-3xl font-semibold tracking-tight text-white md:text-4xl"
        data-reveal="up"
        style={getRevealStyle(90)}
      >
        {title}
      </h2>
      <p
        className="reveal-item mt-4 text-base leading-7 text-slate-400 md:text-lg"
        data-reveal="up"
        style={getRevealStyle(170)}
      >
        {description}
      </p>
    </div>
  );
}

function SocialIconLink({ nome, href, Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Abrir ${nome} em nova aba`}
      className="group inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300 transition duration-300 hover:-translate-y-1 hover:scale-105 hover:border-cyan-400/40 hover:text-cyan-200"
    >
      <Icon className="text-xl transition duration-300 group-hover:scale-110" />
    </a>
  );
}

function BrandMark() {
  return (
    <span className="brand-mark-shell inline-flex h-[3.35rem] w-[3.35rem] items-center justify-center sm:h-12 sm:w-12">
      <img
        src={brandIconSrc}
        alt=""
        aria-hidden="true"
        className="brand-mark-image h-[2.9rem] w-[2.9rem] object-contain sm:h-11 sm:w-11"
      />
    </span>
  );
}

export default function PortfolioJoaoPedro() {
  const [fotoComErro, setFotoComErro] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLiquidEther, setShowLiquidEther] = useState(false);

  const projetos = [
    {
      titulo: "Apolo Vídeo Inspeção - Sistema Web",
      descricao:
        "Sistema web completo para gestão de inspeções por vídeo, permitindo monitoramento geoespacial e geração de relatórios em tempo real.",
      detalhes: [
        "Problema: dificuldade na visualização e gestão de inspeções distribuídas geograficamente.",
        "Solução: plataforma web integrada ao Google Maps para centralização e análise dos dados operacionais.",
        "Desenvolvimento do frontend com Vue.js 3 + Vite.",
        "Backend com Supabase (PostgreSQL, autenticação e storage).",
        "Integração com Google Maps API e APIs REST.",
        "Deploy em Netlify e infraestrutura complementar com Docker para APIs KML.",
        "Fluxo: Inspeção -> Captura -> Armazenamento -> Mapa -> Relatórios.",
      ],
      tecnologias: [
        "Vue.js 3",
        "Vite",
        "Supabase",
        "PostgreSQL",
        "Google Maps API",
        "API REST",
        "Netlify",
        "Docker",
      ],
    },
    {
      titulo: "Apolo Vídeo Inspeção - Sistema Desktop",
      descricao:
        "Sistema desktop para coleta e gestão de dados de inspeção em campo, com operação local e arquitetura organizada para uso offline.",
      detalhes: [
        "Desenvolvido em C# com WPF para operação em ambiente desktop.",
        "Persistência local com SQLite e Entity Framework Core.",
        "Captura de evidências, telemetria local e organização das sessões de inspeção.",
        "Geração de relatórios estruturados com foco no fluxo real do operador.",
        "Arquitetura pensada para operação offline e expansão futura.",
        "Fluxo: Inspeção -> Captura -> Evidência -> Relatório.",
      ],
      tecnologias: ["C#", "WPF", "EF Core", "SQLite", ".NET", "Arquitetura de Software"],
    },
    {
      titulo: "Simulador de CPU x86-64",
      descricao:
        "Projeto acadêmico de alto nível técnico para simulação de CPU x86-64, demonstrando domínio de arquitetura e programação de baixo nível.",
      detalhes: [
        "Implementado em Assembly (NASM) e C.",
        "Simulação de registradores, memória e instruções.",
        "Execução de operações aritméticas, lógicas e controle de fluxo.",
        "Integração entre baixo nível e linguagem de apoio.",
        "Aplicação prática de conceitos de arquitetura e organização de computadores.",
      ],
      tecnologias: ["Assembly (NASM)", "C", "Arquitetura de Computadores", "Baixo Nível"],
    },
  ];

  const habilidades = {
    Linguagens: ["C", "C++", "C#", "JavaScript"],
    Frameworks: ["React", "Vue.js", ".NET", "WPF", "WinForms", "EF Core"],
    "Banco de Dados": ["PostgreSQL", "Supabase", "SQLite"],
    "Web & Backend": ["Node.js", "APIs REST", "Deploy", "DNS", "SSL"],
    Conceitos: ["POO", "Estruturas de Dados", "Algoritmos", "Arquitetura de Software"],
  };

  const fotoPerfilAtiva = fotoComErro ? fotoPerfilFallbackSrc : fotoPerfilSrc;
  const exibirFallbackFoto = !fotoPerfilAtiva;

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;

    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateLiquidEther = () => {
      setShowLiquidEther(desktopQuery.matches && !reducedMotionQuery.matches);
    };

    updateLiquidEther();

    const addListener = (query, handler) => {
      if (query.addEventListener) {
        query.addEventListener("change", handler);
        return () => query.removeEventListener("change", handler);
      }

      query.addListener(handler);
      return () => query.removeListener(handler);
    };

    const removeDesktop = addListener(desktopQuery, updateLiquidEther);
    const removeReduced = addListener(reducedMotionQuery, updateLiquidEther);

    return () => {
      removeDesktop();
      removeReduced();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;

    const revealElements = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!revealElements.length) return undefined;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const showAll = () => {
      revealElements.forEach((element) => element.classList.add("is-visible"));
    };

    if (reducedMotionQuery.matches) {
      showAll();
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="background-tech" aria-hidden="true" />
      {showLiquidEther ? (
        <div className="background-ether" aria-hidden="true">
          <Suspense fallback={null}>
            <LiquidEther
              colors={liquidEtherColors}
              mouseForce={19}
              cursorSize={128}
              isViscous
              viscous={38}
              iterationsViscous={36}
              iterationsPoisson={24}
              resolution={0.32}
              isBounce={false}
              autoDemo
              autoSpeed={0.18}
              autoIntensity={0.9}
              autoResumeDelay={2600}
              autoRampDuration={0.7}
            />
          </Suspense>
        </div>
      ) : null}

      <header className="sticky top-0 z-50 pt-3 sm:pt-4">
        <div className="mx-auto max-w-6xl px-3 sm:px-6">
          <div className="flex items-center justify-between gap-2 py-2.5 sm:gap-4 sm:py-4">
          <a
            href="#inicio"
            className="flex items-center gap-2.5 text-[0.9rem] font-semibold uppercase tracking-[0.18em] text-slate-100 transition duration-300 hover:text-cyan-200 sm:gap-3 sm:text-sm sm:tracking-[0.3em]"
            aria-label="DEV JPEDRO"
          >
            <BrandMark />
            <span className="typing-brand-shell" aria-hidden="true">
              <span className="typing-brand">DEV JPEDRO</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 sm:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contato"
            className="hidden rounded-full border border-cyan-400/25 bg-cyan-400/12 px-5 py-2.5 text-sm font-medium text-cyan-100 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-cyan-400/18 sm:inline-flex"
          >
            Falar comigo
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-200 transition duration-300 hover:border-cyan-400/30 hover:bg-white/[0.08] hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 sm:hidden"
            aria-controls="mobile-navigation"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span className="relative h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu ${
                  mobileMenuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu ${
                  mobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
          </div>

          <div
            id="mobile-navigation"
            className={`grid overflow-hidden transition-[grid-template-rows,opacity,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:hidden ${
              mobileMenuOpen
                ? "visible grid-rows-[1fr] pb-3 pt-3 opacity-100 pointer-events-auto"
                : "invisible grid-rows-[0fr] opacity-0 pointer-events-none"
            }`}
          >
            <div className="overflow-hidden">
              <div
                className={`rounded-[1.75rem] border border-white/10 bg-slate-950/75 p-3 shadow-[0_25px_60px_-40px_rgba(2,6,23,0.95)] backdrop-blur-md transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:backdrop-blur-xl ${
                  mobileMenuOpen
                    ? "translate-y-0 scale-100 opacity-100"
                    : "-translate-y-2 scale-[0.98] opacity-0"
                }`}
              >
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="rounded-2xl px-4 py-3 text-sm text-slate-300 transition duration-300 hover:bg-white/[0.05] hover:text-cyan-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <a
                  href="#contato"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/12 px-4 py-3 text-sm font-medium text-cyan-100 transition duration-300 hover:border-cyan-300/40 hover:bg-cyan-400/18"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Falar comigo
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="inicio" className="section-shell scroll-mt-28 pt-14 md:pt-20">
          <div className="grid items-center gap-14 md:grid-cols-[1.15fr_0.85fr]">
            <div className="relative z-10">
              <span
                className="section-kicker reveal-item"
                data-reveal="soft"
                style={getRevealStyle(0)}
              >
                Portfólio Profissional
              </span>

              <div className="mt-7 max-w-3xl">
                <h1
                  className="reveal-item text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
                  data-reveal="up"
                  style={getRevealStyle(90)}
                >
                  João Pedro Barros
                </h1>
                <p
                  className="reveal-item mt-4 text-lg text-cyan-100/85 md:text-2xl"
                  data-reveal="up"
                  style={getRevealStyle(160)}
                >
                  Desenvolvedor Full Stack & Desktop
                </p>
                <p
                  className="reveal-item mt-7 max-w-2xl text-base leading-8 text-slate-400 md:text-lg"
                  data-reveal="up"
                  style={getRevealStyle(230)}
                >
                  Desenvolvedor com 1,5 anos de experiência em aplicações web e
                  desktop, atuando com Node.js, React, Vue.js e .NET. Experiência com
                  sistemas reais, integrações, banco de dados, arquitetura de software
                  e construção de soluções para operação em campo.
                </p>
              </div>

              <div
                className="reveal-item mt-9 flex flex-wrap gap-4"
                data-reveal="up"
                style={getRevealStyle(300)}
              >
                <a
                  href="#projetos"
                  className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-medium text-slate-950 shadow-[0_20px_60px_-20px_rgba(34,211,238,0.7)] transition duration-300 hover:-translate-y-1 hover:bg-cyan-300"
                >
                  Ver projetos
                </a>
                <a
                  href="#contato"
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 text-sm font-medium text-slate-100 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:text-cyan-100"
                >
                  Falar comigo
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {heroHighlights.map((item, index) => (
                  <div
                    key={item}
                    className="reveal-item"
                    data-reveal="up"
                    style={getRevealStyle(380 + index * 80)}
                  >
                    <SpotlightCard
                      className="rounded-[1.5rem] p-4"
                      spotlightColor="rgba(34, 211, 238, 0.14)"
                    >
                      <span className="relative z-10 text-xs uppercase tracking-[0.24em] text-cyan-200/80">
                        Destaque
                      </span>
                      <p className="relative z-10 mt-3 text-sm leading-6 text-slate-300">
                        {item}
                      </p>
                    </SpotlightCard>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="reveal-item relative z-10 flex justify-center md:justify-end"
              data-reveal="left"
              style={getRevealStyle(240)}
            >
              <div className="relative w-full max-w-[24rem]">
                  <div className="absolute -inset-6 rounded-[2.75rem] bg-gradient-to-br from-cyan-400/16 via-sky-400/8 to-transparent blur-2xl md:blur-3xl" />
                <TiltedCard
                  containerHeight="auto"
                  containerWidth="100%"
                  imageHeight="auto"
                  imageWidth="100%"
                  rotateAmplitude={5}
                  scaleOnHover={1.018}
                  showMobileWarning={false}
                  showTooltip={false}
                  className="w-full"
                >
                  <div className="surface-panel relative overflow-hidden rounded-[2.4rem] p-5 sm:p-6">
                  <div className="mb-5 flex items-center justify-between gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5">
                    <span className="text-[0.65rem] uppercase tracking-[0.32em] text-slate-400">
                      Perfil Profissional
                    </span>
                    <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-cyan-100">
                      Em atividade
                    </span>
                  </div>

                  <div className="hero-avatar-shell relative aspect-square overflow-hidden rounded-full border border-white/10 bg-slate-950 shadow-[0_30px_80px_-40px_rgba(2,6,23,0.95)]">
                    <div className="hero-avatar-field" aria-hidden="true" />
                    <div className="hero-avatar-ring" aria-hidden="true" />
                    <div className="hero-avatar-scan" aria-hidden="true" />

                    {exibirFallbackFoto ? (
                      <div className="relative z-10 h-full w-full rounded-full">
                        <div className="absolute -right-10 top-10 h-32 w-32 rounded-full bg-cyan-400/10 blur-2xl md:blur-3xl" />
                        <div className="absolute inset-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm md:backdrop-blur-md" />
                        <div className="absolute inset-[28%] rounded-full border border-cyan-400/15 bg-slate-950/60" />
                      </div>
                    ) : (
                      
                        <img
                          src={fotoPerfilAtiva}
                          alt="Foto profissional de João Pedro Barros"
                          className="hero-avatar-image"
                          onError={() => {
                            if (!fotoComErro) {
                              setFotoComErro(true);
                            }
                          }}
                        />
                      
                    )}

                    <div
                      className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_18%,transparent_34%,rgba(2,6,23,0.08)_58%,rgba(2,6,23,0.42)_100%),linear-gradient(180deg,rgba(2,6,23,0.02),rgba(2,6,23,0.18))]"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-4 py-4">
                    <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
                      Atuação
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      Soluções web e desktop com foco em produto, arquitetura e
                      execução técnica consistente.
                    </p>
                  </div>
                  </div>
                </TiltedCard>
              </div>
            </div>
          </div>
        </section>

        <section id="solucoes" className="section-shell scroll-mt-28 pt-8">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.16fr)_minmax(19rem,0.84fr)] xl:items-start">
            <div>
              <SectionHeading
                kicker="Soluções"
                title="Soluções para o seu negócio"
                description="Desenvolvimento de páginas e sistemas web sob medida para fortalecer sua presença digital, organizar processos e entregar experiências modernas com foco em resultado."
              />

              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {serviceItems.map(({ title, description, Icon }, index) => (
                  <article
                    key={title}
                    className="surface-panel reveal-item group relative overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/25"
                    data-reveal="up"
                    style={getRevealStyle(120 + index * 90)}
                  >
                    <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-100 shadow-[0_20px_40px_-28px_rgba(34,211,238,0.65)] transition duration-300 group-hover:scale-105 group-hover:border-cyan-300/35 group-hover:bg-cyan-400/14">
                      <Icon className="text-2xl" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold tracking-tight text-white">
                      {title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-slate-400">
                      {description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <TiltedCard
              data-reveal="right"
              containerHeight="auto"
              containerWidth="100%"
              imageHeight="auto"
              imageWidth="100%"
              rotateAmplitude={4}
              scaleOnHover={1.014}
              showMobileWarning={false}
              showTooltip={false}
              className="reveal-item w-full"
              style={getRevealStyle(180)}
            >
            <aside className="surface-panel relative overflow-hidden p-7 md:p-8">
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent" />
              <span className="section-kicker">Diferenciais</span>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">
                Estrutura pensada para gerar presença, clareza e eficiência.
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                Cada projeto é desenvolvido com foco em experiência do usuário,
                performance e uma entrega visual coerente com o posicionamento do
                seu negócio.
              </p>

              <div className="mt-8 flex flex-wrap gap-2.5">
                {serviceHighlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-slate-300 transition duration-300 hover:border-cyan-400/25 hover:text-cyan-100"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-slate-950/55 p-5">
                <p className="text-sm font-medium text-white">
                  Precisa de uma landing page ou sistema para o seu negócio?
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Posso estruturar uma solução sob medida para sua operação, desde
                  a interface até integrações e publicação profissional.
                </p>
                <a
                  href="#contato"
                  className="mt-5 inline-flex items-center justify-center rounded-full border border-cyan-400/25 bg-cyan-400/12 px-5 py-3 text-sm font-medium text-cyan-100 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-cyan-400/18"
                >
                  Solicitar projeto
                </a>
              </div>
            </aside>
            </TiltedCard>
          </div>
        </section>

        <section id="habilidades" className="section-shell scroll-mt-28 pt-8">
          <SectionHeading
            kicker="Habilidades"
            title="Base técnica organizada para construir produtos robustos."
            description="Tecnologias e áreas que fazem parte da minha atuação prática no desenvolvimento web, desktop e fundamentos de software."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Object.entries(habilidades).map(([categoria, itens], index) => (
              <div
                key={categoria}
                className="reveal-item"
                data-reveal="up"
                style={getRevealStyle(120 + index * 70)}
              >
                <BorderGlow
                  className="group h-full transition duration-300 hover:-translate-y-1"
                  edgeSensitivity={28}
                  glowColor="191 92 64"
                  backgroundColor="rgba(15, 23, 42, 0.78)"
                  borderRadius={32}
                  glowRadius={34}
                  glowIntensity={0.72}
                  coneSpread={24}
                  animated={false}
                  colors={["#22D3EE", "#38BDF8", "#8B5CF6"]}
                  fillOpacity={0.28}
                >
                  <div className="relative overflow-hidden p-6">
                    <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />
                    <h3 className="text-lg font-semibold text-white">{categoria}</h3>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {itens.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-slate-300 transition duration-300 group-hover:border-white/15 hover:border-cyan-400/30 hover:text-cyan-100"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </BorderGlow>
              </div>
            ))}
          </div>
        </section>

        <section id="projetos" className="section-shell scroll-mt-28 pt-8">
          <SectionHeading
            kicker="Projetos"
            title="Experiência aplicada em sistemas reais, web e desktop."
            description="Projetos que demonstram experiência com sistemas reais, arquitetura, integração com serviços externos, operação desktop e fundamentos avançados de computação."
          />

          <div className="mt-12 grid gap-6">
            {projetos.map((projeto, index) => (
              <MagicProjectCard
                key={projeto.titulo}
                as="article"
                className="surface-panel reveal-item group p-7 md:p-8"
                data-reveal="up"
                style={getRevealStyle(110 + index * 100)}
                enableStars
                enableSpotlight
                enableBorderGlow
                enableTilt
                enableMagnetism
                clickEffect
                spotlightRadius={190}
                particleCount={14}
                glowColor="34, 211, 238"
              >
                <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-cyan-300/40 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
                  <div className="max-w-3xl">
                    <h3 className="text-2xl font-semibold tracking-tight text-white">
                      {projeto.titulo}
                    </h3>
                    <p className="mt-4 text-base leading-8 text-slate-400">
                      {projeto.descricao}
                    </p>

                    <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-400">
                      {projeto.detalhes.map((detalhe) => (
                        <li key={detalhe} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-cyan-300" />
                          <span>{detalhe}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <aside className="w-full rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 lg:w-[15rem] lg:self-start">
                    <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
                      Stack
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {projeto.tecnologias.map((tecnologia) => (
                        <span
                          key={tecnologia}
                          className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1.5 text-xs text-slate-300"
                        >
                          {tecnologia}
                        </span>
                      ))}
                    </div>
                  </aside>
                </div>
              </MagicProjectCard>
            ))}
          </div>
        </section>

        <section id="contato" className="section-shell scroll-mt-28 pt-8">
          <div
            className="surface-panel reveal-item relative overflow-hidden p-8 md:p-10"
            data-reveal="up"
            style={getRevealStyle(80)}
          >
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />

            <SectionHeading
              kicker="Contato"
              title="Aberto a oportunidades, produtos e projetos relevantes."
              description="Disponível para conversar sobre desenvolvimento web, desktop, arquitetura e construção de soluções aplicadas."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div
                className="reveal-item rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20"
                data-reveal="up"
                style={getRevealStyle(180)}
              >
                <p className="text-sm text-slate-500">Email</p>
                <a
                  href={contactInfo.emailHref}
                  className="mt-3 inline-flex text-base text-slate-200 transition duration-300 hover:text-cyan-200"
                >
                  {contactInfo.email}
                </a>
              </div>

              <div
                className="reveal-item rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20"
                data-reveal="up"
                style={getRevealStyle(260)}
              >
                <p className="text-sm text-slate-500">Número / WhatsApp</p>
                <a
                  href={contactInfo.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex text-base text-slate-200 transition duration-300 hover:text-cyan-200"
                >
                  {contactInfo.whatsapp}
                </a>
              </div>

              <div
                className="reveal-item rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20"
                data-reveal="up"
                style={getRevealStyle(340)}
              >
                <p className="text-sm text-slate-500">Localização</p>
                <p className="mt-3 text-base text-slate-200">{contactInfo.location}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell pb-8 pt-0" aria-labelledby="stack-loop-heading">
          <div
            className="surface-panel reveal-item relative overflow-hidden px-0 py-7"
            data-reveal="up"
            style={getRevealStyle(120)}
          >
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/28 to-transparent" />
            <div className="px-6 sm:px-8">
              <span
                className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.3em] text-slate-300"
              >
                Ecossistema
              </span>
              <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <h2
                  id="stack-loop-heading"
                  className="text-2xl font-semibold tracking-tight text-white md:text-[1.85rem]"
                >
                  Tecnologias em operação no meu fluxo de desenvolvimento.
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-slate-400 md:text-right">
                  Ferramentas e plataformas que uso para desenhar, construir, integrar e publicar
                  soluções com consistência técnica.
                </p>
              </div>
            </div>

            <div className="mt-7 h-[5.8rem] overflow-hidden sm:h-[6.4rem]">
              <LogoLoop
                logos={technologyLoopItems}
                speed={34}
                direction="left"
                logoHeight={26}
                gap={18}
                pauseOnHover
                scaleOnHover
                fadeOut
                fadeOutColor="rgba(15, 23, 42, 0.94)"
                ariaLabel="Tecnologias e ferramentas utilizadas"
              />
            </div>
          </div>
        </section>
      </main>

      <a
        href={socialLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="floating-whatsapp sm:hidden"
      >
        <FaWhatsapp className="text-[1.7rem]" />
      </a>

      <footer className="relative py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 text-center md:flex-row md:text-left">
          <div>
            <p className="text-lg font-medium tracking-tight text-slate-100">
              João Pedro Barros
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Desenvolvedor Full Stack & Desktop
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 shadow-[0_20px_60px_-35px_rgba(2,6,23,0.95)]">
            {socialItems.map(({ nome, href, Icon }) => (
              <SocialIconLink key={nome} nome={nome} href={href} Icon={Icon} />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
