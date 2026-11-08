// "JOÃO PEDRO / DESENVOLVEDOR DE SOFTWARE" da identidade visual, em texto real
// (nítido em qualquer tela, indexável e animável letra a letra).
export default function BrandWordmark({ className = "", size = "md" }) {
  const sizes = {
    sm: { name: "text-[0.95rem] sm:text-base", tagline: "text-[0.42rem] sm:text-[0.5rem] tracking-[0.32em]" },
    md: { name: "text-2xl", tagline: "text-[0.62rem] tracking-[0.38em]" },
    lg: { name: "text-[2.1rem] sm:text-5xl", tagline: "text-[0.6rem] sm:text-[0.8rem] tracking-[0.42em]" },
  }[size];

  return (
    <span className={`brand-wordmark inline-flex flex-col leading-none ${className}`}>
      <span className={`brand-wordmark-name font-extrabold tracking-tight ${sizes.name}`}>
        <span className="mr-[0.26em] text-white">JOÃO</span>
        <span className="brand-gradient-text">PEDRO</span>
      </span>
      <span className={`brand-wordmark-tagline mt-1.5 whitespace-nowrap font-semibold uppercase text-slate-300 ${sizes.tagline}`}>
        Desenvolvedor de Software
      </span>
    </span>
  );
}
