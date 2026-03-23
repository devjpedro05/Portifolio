import { useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const fotoPerfil = "/assets/images/profile/foto-perfil.png";
const fotoPerfilSrc = fotoPerfil.startsWith("/")
  ? `${import.meta.env.BASE_URL}${fotoPerfil.slice(1)}`
  : fotoPerfil;

const socialLinks = {
  instagram: "https://www.instagram.com/dev.jpedro/",
  linkedin: "https://www.linkedin.com/in/devjpedro05/",
  github: "https://github.com/devjpedro05",
  whatsapp: "https://wa.me/559193557595",
};

const navItems = [
  { label: "Início", href: "#inicio" },
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

function SectionHeading({ kicker, title, description }) {
  return (
    <div className="max-w-3xl">
      <span className="section-kicker">{kicker}</span>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-400 md:text-lg">{description}</p>
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
    <span className="inline-flex h-12 w-12 items-center justify-center">
      <span className="inline-flex h-10 w-10 items-center justify-center bg-transparent">
        <svg
          viewBox="0 0 48 48"
          aria-hidden="true"
          className="h-8 w-8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
        <defs>
          <linearGradient
            id="brand-mark-gradient"
            x1="8"
            y1="10"
            x2="40"
            y2="38"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2E1065" />
            <stop offset="0.55" stopColor="#6D28D9" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <path
          d="M15 13L6 24L15 35"
          stroke="rgba(30, 58, 138, 0.92)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 11L18 37"
          stroke="rgba(30, 58, 138, 0.92)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M33 13L42 24L33 35"
          stroke="rgba(30, 58, 138, 0.92)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 13L6 24L15 35"
          stroke="url(#brand-mark-gradient)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 11L18 37"
          stroke="url(#brand-mark-gradient)"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path
          d="M33 13L42 24L33 35"
          stroke="url(#brand-mark-gradient)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        </svg>
      </span>
    </span>
  );
}

export default function PortfolioJoaoPedro() {
  const [fotoComErro, setFotoComErro] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const exibirFallbackFoto = !fotoPerfilSrc || fotoComErro;

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="background-tech" aria-hidden="true" />

      <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/72 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <a
            href="#inicio"
            className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-100 transition duration-300 hover:text-cyan-200"
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-200 transition duration-300 hover:border-cyan-400/30 hover:bg-white/[0.08] hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 sm:hidden"
            aria-controls="mobile-navigation"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span className="relative h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition duration-300 ${
                  mobileMenuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition duration-300 ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current transition duration-300 ${
                  mobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>

          <div
            id="mobile-navigation"
            className={`w-full overflow-hidden transition-all duration-300 ease-out sm:hidden ${
              mobileMenuOpen
                ? "visible max-h-96 border-t border-white/5 pt-4 opacity-100 pointer-events-auto"
                : "invisible max-h-0 opacity-0 pointer-events-none"
            }`}
          >
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/75 p-3 shadow-[0_25px_60px_-40px_rgba(2,6,23,0.95)] backdrop-blur-xl">
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
      </header>

      <main>
        <section id="inicio" className="section-shell scroll-mt-28 pt-14 md:pt-20">
          <div className="grid items-center gap-14 md:grid-cols-[1.15fr_0.85fr]">
            <div className="relative z-10">
              <span className="section-kicker">Portfólio Profissional</span>

              <div className="mt-7 max-w-3xl">
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  João Pedro Barros
                </h1>
                <p className="mt-4 text-lg text-cyan-100/85 md:text-2xl">
                  Desenvolvedor Full Stack & Desktop
                </p>
                <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
                  Desenvolvedor com 1,5 anos de experiência em aplicações web e
                  desktop, atuando com Node.js, React, Vue.js e .NET. Experiência com
                  sistemas reais, integrações, banco de dados, arquitetura de software
                  e construção de soluções para operação em campo.
                </p>
              </div>

              <div className="mt-9 flex flex-wrap gap-4">
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
                {heroHighlights.map((item) => (
                  <div key={item} className="surface-panel rounded-[1.5rem] p-4">
                    <span className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">
                      Destaque
                    </span>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 flex justify-center md:justify-end">
              <div className="relative w-full max-w-[24rem]">
                <div className="absolute -inset-6 rounded-[2.75rem] bg-gradient-to-br from-cyan-400/16 via-sky-400/8 to-transparent blur-3xl" />
                <div className="surface-panel relative overflow-hidden rounded-[2.4rem] p-5 sm:p-6">
                  <div className="mb-5 flex items-center justify-between gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5">
                    <span className="text-[0.65rem] uppercase tracking-[0.32em] text-slate-400">
                      Perfil Profissional
                    </span>
                    <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-cyan-100">
                      Disponível
                    </span>
                  </div>

                  <div className="relative aspect-square overflow-hidden rounded-full border border-white/10 bg-slate-950 shadow-[0_30px_80px_-40px_rgba(2,6,23,0.95)]">
                    {exibirFallbackFoto ? (
                      <div className="relative h-full w-full rounded-full bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.14),transparent_30%),linear-gradient(145deg,rgba(15,23,42,0.96),rgba(2,6,23,1))]">
                        <div className="absolute -right-10 top-10 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl" />
                        <div className="absolute inset-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-md" />
                        <div className="absolute inset-[28%] rounded-full border border-cyan-400/15 bg-slate-950/60" />
                      </div>
                    ) : (
                      <>
                        <img
                          src={fotoPerfilSrc}
                          alt="Foto profissional de João Pedro Barros"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                          onError={() => setFotoComErro(true)}
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent_42%,rgba(2,6,23,0.18)),linear-gradient(180deg,rgba(2,6,23,0.02),rgba(2,6,23,0.22))]" />
                      </>
                    )}
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
              </div>
            </div>
          </div>
        </section>

        <section id="habilidades" className="section-shell scroll-mt-28 pt-8">
          <SectionHeading
            kicker="Habilidades"
            title="Base técnica organizada para construir produtos robustos."
            description="Tecnologias e áreas que fazem parte da minha atuação prática no desenvolvimento web, desktop e fundamentos de software."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Object.entries(habilidades).map(([categoria, itens]) => (
              <div
                key={categoria}
                className="surface-panel group relative overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/25"
              >
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
            {projetos.map((projeto) => (
              <article
                key={projeto.titulo}
                className="surface-panel group relative overflow-hidden p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/25 md:p-8"
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
              </article>
            ))}
          </div>
        </section>

        <section id="contato" className="section-shell scroll-mt-28 pt-8">
          <div className="surface-panel relative overflow-hidden p-8 md:p-10">
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />

            <SectionHeading
              kicker="Contato"
              title="Aberto a oportunidades, produtos e projetos relevantes."
              description="Disponível para conversar sobre desenvolvimento web, desktop, arquitetura e construção de soluções aplicadas."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20">
                <p className="text-sm text-slate-500">Email</p>
                <a
                  href={contactInfo.emailHref}
                  className="mt-3 inline-flex text-base text-slate-200 transition duration-300 hover:text-cyan-200"
                >
                  {contactInfo.email}
                </a>
              </div>

              <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20">
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

              <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20">
                <p className="text-sm text-slate-500">Localização</p>
                <p className="mt-3 text-base text-slate-200">{contactInfo.location}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative border-t border-white/5 bg-slate-950/55 py-10 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cyan-400/[0.05] via-slate-950/10 to-transparent" />
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
