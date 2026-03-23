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

function SocialIconLink({ nome, href, Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Abrir ${nome} em nova aba`}
      className="group inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800/80 bg-slate-900/75 text-slate-300 shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:scale-105 hover:border-cyan-400/40 hover:text-cyan-300"
    >
      <Icon className="text-xl transition duration-300 group-hover:scale-110" />
    </a>
  );
}

export default function PortfolioJoaoPedro() {
  const [fotoComErro, setFotoComErro] = useState(false);

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
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.15),transparent_30%),radial-gradient(circle_at_left,rgba(59,130,246,0.12),transparent_25%)]" />
        <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-[1.4fr_0.9fr]">
          <div>
            <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-300">
              Portfólio Profissional
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
              João Pedro Barros
            </h1>
            <p className="mt-4 text-xl text-slate-300 md:text-2xl">
              Desenvolvedor Full Stack & Desktop
            </p>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
              Desenvolvedor com 1,5 anos de experiência em aplicações web e desktop,
              atuando com Node.js, React, Vue.js e .NET. Experiência com sistemas reais,
              integrações, banco de dados, arquitetura de software e construção de soluções
              para operação em campo.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#projetos"
                className="rounded-2xl bg-cyan-400 px-6 py-3 font-medium text-slate-950 shadow-lg shadow-cyan-500/20 transition duration-300 hover:-translate-y-0.5"
              >
                Ver projetos
              </a>
              <a
                href="#habilidades"
                className="rounded-2xl border border-slate-700 px-6 py-3 font-medium text-slate-100 transition duration-300 hover:border-cyan-400 hover:text-cyan-300"
              >
                Habilidades
              </a>
              <a
                href="#contato"
                className="rounded-2xl border border-slate-700 px-6 py-3 font-medium text-slate-100 transition duration-300 hover:border-cyan-400 hover:text-cyan-300"
              >
                Contato
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative aspect-square w-full max-w-[18rem] sm:max-w-[20rem] lg:max-w-[22rem]">
              <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-cyan-400/20 via-sky-400/10 to-transparent blur-3xl" />
              <div className="group relative h-full w-full overflow-hidden rounded-full border border-slate-800/90 bg-slate-900/70 p-3 shadow-2xl shadow-black/30 transition duration-300 hover:-translate-y-1">
                <div className="relative h-full w-full overflow-hidden rounded-full border border-slate-800 bg-slate-950">
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
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent_45%,rgba(2,6,23,0.18)),linear-gradient(180deg,rgba(2,6,23,0.04),rgba(2,6,23,0.28))]" />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16" id="habilidades">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold text-white">Habilidades</h2>
            <p className="mt-3 text-slate-400">
              Tecnologias e áreas que fazem parte da minha atuação prática no
              desenvolvimento web, desktop e fundamentos de software.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(habilidades).map(([categoria, itens]) => (
            <div
              key={categoria}
              className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
            >
              <h3 className="text-lg font-semibold text-cyan-300">{categoria}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {itens.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16" id="projetos">
        <div>
          <h2 className="text-3xl font-semibold text-white">Projetos em destaque</h2>
          <p className="mt-3 max-w-3xl text-slate-400">
            Projetos que demonstram experiência com sistemas reais, arquitetura,
            integração com serviços externos, operação desktop e fundamentos
            avançados de computação.
          </p>
        </div>

        <div className="mt-10 grid gap-6">
          {projetos.map((p) => (
            <article
              key={p.titulo}
              className="rounded-[2rem] border border-slate-800 bg-slate-900/60 p-7 shadow-2xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <h3 className="text-2xl font-semibold text-white">{p.titulo}</h3>
                  <p className="mt-4 leading-7 text-slate-400">{p.descricao}</p>

                  <ul className="mt-5 space-y-2 text-sm leading-6 text-slate-400">
                    {p.detalhes.map((d) => (
                      <li key={d} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-cyan-400" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:max-w-xs">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                    Stack
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tecnologias.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16" id="contato">
        <div className="rounded-[2rem] border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl shadow-black/20">
          <h2 className="text-3xl font-semibold text-white">Contato</h2>
          <p className="mt-4 max-w-2xl text-slate-400">
            Aberto a oportunidades para desenvolvimento web, desktop e projetos
            com foco em produto, arquitetura e sistemas aplicados.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 p-5">
              <p className="text-sm text-slate-500">Email</p>
              <a
                href={contactInfo.emailHref}
                className="mt-2 inline-flex text-slate-200 transition duration-300 hover:text-cyan-300"
              >
                {contactInfo.email}
              </a>
            </div>
            <div className="rounded-2xl border border-slate-800 p-5">
              <p className="text-sm text-slate-500">Número / WhatsApp</p>
              <a
                href={contactInfo.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex text-slate-200 transition duration-300 hover:text-cyan-300"
              >
                {contactInfo.whatsapp}
              </a>
            </div>
            <div className="rounded-2xl border border-slate-800 p-5">
              <p className="text-sm text-slate-500">Localização</p>
              <p className="mt-2 text-slate-200">{contactInfo.location}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800/80 bg-slate-950/90 py-10 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 text-center md:flex-row md:text-left">
          <div>
            <p className="text-lg font-medium tracking-tight text-slate-100">
              João Pedro Barros
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Desenvolvedor Full Stack & Desktop
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-full border border-slate-800/80 bg-slate-900/60 px-4 py-3 shadow-xl shadow-black/10">
            {socialItems.map(({ nome, href, Icon }) => (
              <SocialIconLink key={nome} nome={nome} href={href} Icon={Icon} />
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
