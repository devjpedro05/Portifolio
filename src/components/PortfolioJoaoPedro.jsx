import { useEffect, useRef, useState } from "react";
import {
  FaArrowRight,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLaptopCode,
  FaLayerGroup,
  FaLinkedin,
  FaMapMarkerAlt,
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
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { prefersReducedMotion } from "@/lib/gsap";
import usePortfolioMotion from "@/hooks/usePortfolioMotion";
import BrandWordmark from "./brand/BrandWordmark";
import HexDepthScene from "./HexDepthScene";
import JPLogo from "./brand/JPLogo";
import CircuitBackground from "./CircuitBackground";
import IntroLoader from "./IntroLoader";
import LogoLoop from "./LogoLoop";
import MagicProjectCard from "./MagicProjectCard";
import SiteHeader from "./SiteHeader";
import SpotlightCard from "./SpotlightCard";

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
const fotoPerfilSrc = assetUrl("/assets/images/profile/foto-perfil.webp");
const fotoPerfilFallbackSrc = assetUrl("/assets/images/profile/foto-perfil-transparent.png");

const socialLinks = {
  instagram: "https://www.instagram.com/dev.jpedro/",
  linkedin: "https://www.linkedin.com/in/devjpedro05/",
  github: "https://github.com/devjpedro05",
  whatsapp: "https://wa.me/559193557595",
};

const navItems = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "solucoes", label: "Soluções" },
  { id: "habilidades", label: "Habilidades" },
  { id: "projetos", label: "Projetos" },
  { id: "contato", label: "Contato" },
];

const socialItems = [
  { nome: "LinkedIn", href: socialLinks.linkedin, Icon: FaLinkedin },
  { nome: "GitHub", href: socialLinks.github, Icon: FaGithub },
  { nome: "Instagram", href: socialLinks.instagram, Icon: FaInstagram },
  { nome: "WhatsApp", href: socialLinks.whatsapp, Icon: FaWhatsapp },
];

const contactRows = [
  { label: "Email", value: "bjoaopedro123@gmail.com", href: "mailto:bjoaopedro123@gmail.com", Icon: FaEnvelope },
  { label: "WhatsApp", value: "91 9 9355-7595", href: socialLinks.whatsapp, Icon: FaWhatsapp, external: true },
  { label: "LinkedIn", value: "in/devjpedro05", href: socialLinks.linkedin, Icon: FaLinkedin, external: true },
  { label: "Localização", value: "Goiânia, Goiás, Brasil", Icon: FaMapMarkerAlt },
];

const technologies = [
  { title: "React", href: "https://react.dev", Icon: SiReact, color: "text-cyan-200" },
  { title: "TypeScript", href: "https://www.typescriptlang.org", Icon: SiTypescript, color: "text-sky-300" },
  { title: "Tailwind CSS", href: "https://tailwindcss.com", Icon: SiTailwindcss, color: "text-cyan-300" },
  { title: "Vue.js", href: "https://vuejs.org", Icon: SiVuedotjs, color: "text-emerald-300" },
  { title: "Node.js", href: "https://nodejs.org", Icon: SiNodedotjs, color: "text-lime-300" },
  { title: ".NET", href: "https://dotnet.microsoft.com", Icon: SiDotnet, color: "text-violet-300" },
  { title: "PostgreSQL", href: "https://www.postgresql.org", Icon: SiPostgresql, color: "text-sky-300" },
  { title: "Supabase", href: "https://supabase.com", Icon: SiSupabase, color: "text-emerald-300" },
  { title: "SQLite", href: "https://www.sqlite.org", Icon: SiSqlite, color: "text-cyan-100" },
  { title: "Docker", href: "https://www.docker.com", Icon: SiDocker, color: "text-sky-300" },
];

const technologyLoopItems = technologies.map(({ title, href, Icon, color }) => ({
  node: (
    <span className="inline-flex items-center gap-3">
      <Icon className={`text-[1em] ${color}`} />
      <span className="font-mono text-[0.74rem] uppercase tracking-[0.18em] text-slate-400">{title}</span>
    </span>
  ),
  title,
  href,
}));

const terminalLines = [
  { prompt: "whoami", output: "Desenvolvedor Full Stack & Desktop" },
  { prompt: "stack --principal", output: "React · TypeScript · .NET · PostgreSQL" },
  { prompt: "status", output: "disponível para novos projetos" },
];

const highlights = [
  { title: "Produto e operação", text: "Sistemas web e desktop com foco em produto e operação." },
  { title: "Integrações", text: "Integrações, mapas, banco de dados e arquitetura aplicada." },
  { title: "Contexto técnico", text: "Entrega de soluções reais com leitura forte de contexto técnico." },
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

const projetos = [
  {
    titulo: "Apolo Vídeo Inspeção - Sistema Web",
    tipo: "Web",
    descricao:
      "Site institucional e painel administrativo web do ecossistema ApoloSurvey, com monitoramento geoespacial, gestão de inspeções e relatórios.",
    detalhes: [
      "Problema: dificuldade na visualização e gestão de inspeções distribuídas geograficamente.",
      "Solução: plataforma web integrada ao Google Maps para centralização e análise dos dados operacionais.",
      "Frontend em React + TypeScript com Vite e Tailwind CSS.",
      "Dados com TanStack Query e formulários validados com React Hook Form + Zod.",
      "Backend com Supabase (PostgreSQL, autenticação e storage).",
      "Fluxo: Inspeção -> Captura -> Armazenamento -> Mapa -> Relatórios.",
    ],
    tecnologias: ["React", "TypeScript", "Vite", "Tailwind CSS", "TanStack Query", "Supabase", "PostgreSQL", "Google Maps API"],
  },
  {
    titulo: "Apolo Vídeo Inspeção - Sistema Desktop",
    tipo: "Desktop",
    descricao:
      "Sistema desktop para coleta e gestão de dados de inspeção em campo, com operação local e arquitetura organizada para uso offline.",
    detalhes: [
      "Desenvolvido em C# com WPF para operação em ambiente desktop.",
      "Persistência local com SQLite e Entity Framework Core.",
      "Captura de evidências, telemetria local e organização das sessões de inspeção.",
      "Geração de relatórios estruturados com foco no fluxo real do operador.",
      "Fluxo: Inspeção -> Captura -> Evidência -> Relatório.",
    ],
    tecnologias: ["C#", "WPF", "EF Core", "SQLite", ".NET", "Arquitetura de Software"],
  },
  {
    titulo: "Simulador de CPU x86-64",
    tipo: "Baixo nível",
    descricao:
      "Projeto acadêmico de alto nível técnico para simulação de CPU x86-64, demonstrando domínio de arquitetura e programação de baixo nível.",
    detalhes: [
      "Implementado em Assembly (NASM) e C.",
      "Simulação de registradores, memória e instruções.",
      "Execução de operações aritméticas, lógicas e controle de fluxo.",
      "Aplicação prática de conceitos de arquitetura e organização de computadores.",
    ],
    tecnologias: ["Assembly (NASM)", "C", "Arquitetura de Computadores", "Baixo Nível"],
    link: "https://github.com/devjpedro05/Processador-Assembly",
  },
];

const habilidades = [
  { categoria: "Linguagens", itens: ["C#", "TypeScript", "JavaScript", "Python", "C", "C++"] },
  { categoria: "Frameworks", itens: ["React", "Vue.js", "Tailwind CSS", ".NET", "WPF", "WinForms", "EF Core"] },
  { categoria: "Banco de Dados", itens: ["PostgreSQL", "Supabase", "SQLite"] },
  { categoria: "Web & Backend", itens: ["Node.js", "APIs REST", "Deploy", "DNS", "SSL"] },
  { categoria: "Conceitos", itens: ["POO", "Estruturas de Dados", "Algoritmos", "Arquitetura de Software"] },
];

const pad = (value) => String(value).padStart(2, "0");

function SectionHeading({ index, kicker, title, description, className = "" }) {
  return (
    <div className={`section-heading max-w-3xl ${className}`}>
      <span className="section-kicker">
        <span className="section-kicker-index">{pad(index)}</span>
        {kicker}
      </span>
      <h2 className="section-title mt-5 text-[clamp(1.85rem,4.4vw,3rem)] font-bold leading-[1.08] tracking-tight text-white">
        {title}
      </h2>
      {description ? (
        <p className="reveal-item mt-5 text-base leading-7 text-slate-400 md:text-lg" data-reveal="up">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default function PortfolioJoaoPedro() {
  const rootRef = useRef(null);
  const [fotoComErro, setFotoComErro] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [showIntro, setShowIntro] = useState(() => !prefersReducedMotion());
  const { releaseHero } = usePortfolioMotion(rootRef, { onSectionChange: setActiveSection });

  useEffect(() => {
    if (!showIntro) releaseHero();
    // só na montagem: sem intro (movimento reduzido), o herói aparece direto
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={rootRef} className="relative isolate min-h-screen overflow-x-clip text-slate-100">
      {showIntro ? <IntroLoader onReveal={releaseHero} onDone={() => setShowIntro(false)} /> : null}

      <div className="page-scenery" aria-hidden="true">
        <div className="page-backdrop" />
        <CircuitBackground />
        <div className="page-vignette" />
      </div>
      <div className="cursor-glow" aria-hidden="true" />

      <SiteHeader navItems={navItems} activeSection={activeSection} />

      <main>
        {/* ------------------------------ INÍCIO ------------------------------ */}
        <section id="inicio" className="hero-section relative flex min-h-[100svh] flex-col justify-center pt-28 sm:pt-32">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            <div className="relative z-10 order-2 text-center lg:order-1 lg:text-left">
              <span className="hero-kicker section-kicker">
                <span className="status-dot" />
                Portfólio · 2026
              </span>

              <h1 className="hero-title mt-6 text-[clamp(2rem,7.4vw,4.1rem)] font-bold leading-[1.08] text-white">
                <span className="hero-prompt" aria-hidden="true">&gt;</span>
                João Pedro{" "}
                <span className="whitespace-nowrap">
                  <span className="brand-gradient-text">Barros</span>
                  <span className="hero-caret" aria-hidden="true" />
                </span>
              </h1>

              <p className="hero-role mt-5 font-mono text-[clamp(0.9rem,2.2vw,1.2rem)] text-cyan-100/90">
                &lt;Desenvolvedor de Software /&gt;
              </p>

              <p className="hero-copy mx-auto mt-6 max-w-xl text-base leading-8 text-slate-400 md:text-lg lg:mx-0">
                Desenvolvedor com 2 anos de experiência em aplicações web e desktop, atuando com Node.js, React,
                TypeScript, Vue.js e .NET, de integrações e banco de dados até soluções para operação em campo.
              </p>

              <div className="hero-cta mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
                <a href="#projetos" className="btn-primary magnetic">
                  Ver projetos <FaArrowRight className="text-xs" />
                </a>
                <a href="#contato" className="btn-ghost magnetic">
                  Falar comigo
                </a>
              </div>
            </div>

            <div className="hero-visual relative z-10 order-1 mx-auto w-full max-w-[17rem] sm:max-w-[21rem] lg:order-2 lg:max-w-[24rem]">
              <div className="hero-hex">
                <JPLogo className="hero-orbit" />
                <div className="hero-hex-photo">
                  <HexDepthScene />
                  <img
                    src={fotoComErro ? fotoPerfilFallbackSrc : fotoPerfilSrc}
                    className="hero-person"
                    alt="Foto profissional de João Pedro Barros"
                    width="900"
                    height="900"
                    fetchpriority="high"
                    onError={() => !fotoComErro && setFotoComErro(true)}
                  />
                  <div className="hero-hex-scan" aria-hidden="true" />
                </div>
              </div>

              <div className="hero-terminal" aria-label="Resumo profissional">
                <div className="hero-terminal-bar" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <em>~/joao-pedro</em>
                </div>
                <div className="space-y-2 p-4 font-mono text-[0.7rem] leading-5 sm:text-xs">
                  {terminalLines.map((line) => (
                    <div key={line.prompt} className="terminal-entry">
                      <p className="terminal-prompt text-slate-500">
                        <span className="text-cyan-300">$</span> <span className="terminal-type">{line.prompt}</span>
                      </p>
                      <p className="terminal-output text-slate-200">{line.output}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hero-marquee mx-auto mt-14 w-full max-w-6xl px-5 sm:px-6 lg:mt-16">
            <div className="h-[4.5rem] overflow-hidden border-y border-white/[0.06]">
              <LogoLoop
                logos={technologyLoopItems}
                speed={30}
                direction="left"
                logoHeight={22}
                gap={40}
                pauseOnHover
                scaleOnHover
                fadeOut
                fadeOutColor="#010309"
                ariaLabel="Tecnologias e ferramentas utilizadas"
              />
            </div>
          </div>
        </section>

        {/* ------------------------------ SOBRE ------------------------------ */}
        <section id="sobre" className="section-shell scroll-mt-24">
          <SectionHeading
            index={2}
            kicker="Sobre"
            title="Código pensado para operação real, do campo ao painel."
          />

          <div className="bento mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            <article className="bento-card reveal-item sm:col-span-2 lg:col-span-4 lg:row-span-2" data-reveal="up">
              <JPLogo className="bento-watermark" />
              <p className="bento-label">Atuação</p>
              <p className="mt-4 max-w-xl text-xl font-semibold leading-snug text-white md:text-2xl">
                Soluções web e desktop com foco em produto, arquitetura e execução técnica consistente.
              </p>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 md:text-base">
                Experiência com sistemas reais, integrações, banco de dados, arquitetura de software e construção de
                soluções para operação em campo, com atenção à experiência de quem usa o sistema no dia a dia.
              </p>
            </article>

            <article className="bento-card reveal-item lg:col-span-2" data-reveal="up">
              <p className="bento-label">Experiência</p>
              <p className="mt-3 text-5xl font-extrabold tracking-tight text-white">
                <span className="count-up" data-value="2">
                  2
                </span>
                <span className="ml-2 text-lg font-semibold text-cyan-200">anos</span>
              </p>
              <p className="mt-2 text-sm text-slate-400">em aplicações web e desktop</p>
            </article>

            <article className="bento-card reveal-item lg:col-span-2" data-reveal="up">
              <p className="bento-label">Ferramentas</p>
              <p className="mt-3 text-5xl font-extrabold tracking-tight text-white">
                <span className="count-up" data-value={technologies.length} data-decimals="0">
                  {technologies.length}
                </span>
                <span className="ml-2 text-lg font-semibold text-cyan-200">tecnologias</span>
              </p>
              <p className="mt-2 text-sm text-slate-400">no fluxo de desenvolvimento</p>
            </article>

            {highlights.map((item, index) => (
              <SpotlightCard
                key={item.title}
                className="bento-card reveal-item lg:col-span-2"
                spotlightColor="rgba(34, 211, 238, 0.12)"
                data-reveal="up"
              >
                <p className="bento-label relative z-10">
                  {pad(index + 1)} · {item.title}
                </p>
                <p className="relative z-10 mt-3 text-sm leading-6 text-slate-300">{item.text}</p>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* ------------------------------ SOLUÇÕES ------------------------------ */}
        <section id="solucoes" className="section-shell scroll-mt-24">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              index={3}
              kicker="Soluções"
              title="Soluções para o seu negócio"
              description="Páginas e sistemas web sob medida para fortalecer sua presença digital, organizar processos e entregar experiências modernas com foco em resultado."
            />
            <a href="#contato" className="btn-ghost magnetic reveal-item self-start lg:self-end" data-reveal="soft">
              Solicitar projeto <FaArrowRight className="text-xs" />
            </a>
          </div>

          <ol className="mt-12">
            {serviceItems.map(({ title, description, Icon }, index) => (
              <li key={title} className="solution-row reveal-item" data-reveal="up">
                <span className="solution-line" aria-hidden="true" />
                <span className="solution-index">{pad(index + 1)}</span>
                <span className="solution-icon">
                  <Icon />
                </span>
                <h3 className="solution-title">{title}</h3>
                <p className="solution-text">{description}</p>
              </li>
            ))}
          </ol>

          <div className="diff-strip reveal-item mt-10" data-reveal="up">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-slate-500">Diferenciais</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {serviceHighlights.map((item) => (
                <span key={item} className="chip diff-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------ HABILIDADES ------------------------------ */}
        <section id="habilidades" className="section-shell scroll-mt-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHeading
                index={4}
                kicker="Habilidades"
                title="Base técnica para construir produtos robustos."
                description="Tecnologias e áreas que fazem parte da minha atuação prática no desenvolvimento web, desktop e fundamentos de software."
              />
            </div>

            <div className="skills-list">
              {habilidades.map(({ categoria, itens }, index) => (
                <div key={categoria} className="skill-card reveal-item" data-reveal="up">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-lg font-semibold text-white">{categoria}</h3>
                    <span className="font-mono text-xs text-slate-600">
                      {pad(index + 1)}/{pad(habilidades.length)}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {itens.map((item) => (
                      <span key={item} className="chip skill-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------ PROJETOS ------------------------------ */}
        <section id="projetos" className="section-shell scroll-mt-24">
          <SectionHeading
            index={5}
            kicker="Projetos"
            title="Experiência aplicada em sistemas reais, web e desktop."
            description="Arquitetura, integração com serviços externos, operação desktop e fundamentos avançados de computação."
          />

          <div className="projects-stack mt-12">
            {projetos.map((projeto, index) => (
              <div key={projeto.titulo} className="project-stack-item" style={{ "--stack-index": index }}>
                <MagicProjectCard
                  as="article"
                  className="project-card group"
                  enableStars
                  enableSpotlight
                  enableBorderGlow
                  enableTilt={false}
                  enableMagnetism={false}
                  clickEffect
                  spotlightRadius={220}
                  particleCount={10}
                  glowColor="34, 211, 238"
                >
                  <div className="project-card-grid grid gap-8">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="project-index">{pad(index + 1)}</span>
                        <span className="chip text-[0.7rem]">{projeto.tipo}</span>
                      </div>
                      <h3 className="mt-5 text-[1.5rem] font-bold leading-tight tracking-tight text-white md:text-[1.9rem]">
                        {projeto.titulo}
                      </h3>
                      <p className="mt-4 max-w-2xl text-[0.95rem] leading-7 text-slate-400 md:text-base">
                        {projeto.descricao}
                      </p>
                      <ul className="project-detail-list mt-6 text-sm leading-7 text-slate-400">
                        {projeto.detalhes.map((detalhe) => (
                          <li key={detalhe} className="project-detail-item">
                            <span className="project-detail-dot" />
                            <span>{detalhe}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <aside className="project-stack-panel">
                      <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">Stack</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {projeto.tecnologias.map((tecnologia) => (
                          <span key={tecnologia} className="chip project-chip text-xs">
                            {tecnologia}
                          </span>
                        ))}
                      </div>
                      {projeto.link ? (
                        <a
                          href={projeto.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition-colors hover:text-white"
                        >
                          <FaGithub /> Ver repositório <FaArrowRight className="text-[0.65rem]" />
                        </a>
                      ) : (
                        <p className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-slate-500">
                          Repositório privado
                        </p>
                      )}
                    </aside>
                  </div>
                </MagicProjectCard>
                <div className="project-card-shade" aria-hidden="true" />
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------ CONTATO ------------------------------ */}
        <section id="contato" className="section-shell scroll-mt-24 pb-16">
          <div className="contact-panel reveal-item" data-reveal="up">
            <JPLogo className="contact-watermark" />
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <SectionHeading index={6} kicker="Contato" title="Vamos construir algo juntos?" />
                <p className="reveal-item mt-5 max-w-lg text-base leading-7 text-slate-400 md:text-lg" data-reveal="up">
                  Aberto a oportunidades, produtos e projetos relevantes em desenvolvimento web, desktop e arquitetura.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary magnetic">
                    <FaWhatsapp /> Chamar no WhatsApp
                  </a>
                  <a href="mailto:bjoaopedro123@gmail.com" className="btn-ghost magnetic">
                    <FaEnvelope /> Enviar email
                  </a>
                </div>
              </div>

              <ul className="contact-list">
                {contactRows.map(({ label, value, href, Icon, external }) => {
                  const content = (
                    <>
                      <span className="contact-icon">
                        <Icon />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[0.65rem] uppercase tracking-[0.24em] text-slate-500">
                          {label}
                        </span>
                        <span className="mt-1 block truncate text-sm text-slate-200 sm:text-base">{value}</span>
                      </span>
                      {href ? <FaArrowRight className="contact-arrow" /> : null}
                    </>
                  );
                  return (
                    <li key={label} className="contact-item">
                      {href ? (
                        <a
                          href={href}
                          className="contact-row"
                          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="contact-row">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <a
        href={socialLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="floating-whatsapp md:hidden"
      >
        <FaWhatsapp className="text-[1.6rem]" />
      </a>

      <footer className="relative border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
          <div className="flex items-center gap-3">
            <JPLogo className="h-11 w-11" />
            <BrandWordmark size="sm" className="items-start text-left" />
          </div>
          <div className="flex items-center gap-2">
            {socialItems.map(({ nome, href, Icon }) => (
              <a
                key={nome}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir ${nome} em nova aba`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:text-cyan-200"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
        <p className="pb-8 text-center font-mono text-xs text-slate-600">
          © {new Date().getFullYear()} João Pedro Barros
        </p>
      </footer>
    </div>
  );
}
