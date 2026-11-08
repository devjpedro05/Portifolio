import { useId } from "react";

// Monograma JP recriado em vetor a partir da identidade visual.
// Cada parte tem uma classe para ser animada separadamente pelo GSAP:
// .jp-line (traços do circuito), .jp-node (nós), .jp-letter (J e P), .jp-code (</>).
export default function JPLogo({ className = "", title }) {
  const id = useId().replace(/:/g, "");
  const fillId = `jp-fill-${id}`;
  const lineId = `jp-line-${id}`;

  return (
    <svg
      viewBox="462 36 552 590"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id={fillId} x1="480" y1="180" x2="960" y2="500" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#00F0FF" />
          <stop offset="1" stopColor="#0057FF" />
        </linearGradient>
        <linearGradient id={lineId} x1="480" y1="60" x2="990" y2="600" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#00E5FF" />
          <stop offset="1" stopColor="#0A5BFF" />
        </linearGradient>
      </defs>

      <g stroke={`url(#${lineId})`} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
        <path className="jp-line" d="M486 362V190L559 149" />
        <path className="jp-line" d="M585 134L731 52L893 144" />
        <path className="jp-line" d="M981 328V424" />
        <path className="jp-line" d="M979 452L975 486L746 591" />
        <path className="jp-line" d="M719 592L572 536" />
        <circle className="jp-node" cx="572" cy="141" r="14" />
        <circle className="jp-node" cx="981" cy="438" r="14" />
        <circle className="jp-node" cx="733" cy="598" r="14" />
      </g>

      <g fill={`url(#${fillId})`}>
        <path
          className="jp-letter"
          d="M607 236L668 172H742V400C742 462 694 505 628 505H562C516 505 478 472 478 432L558 386V436H622C646 436 662 420 662 396V236Z"
        />
        <path
          className="jp-letter"
          d="M748 172H860C918 172 960 224 960 288C960 352 918 405 860 405H798V492L748 520V340H878C900 340 905 314 905 288C905 262 900 236 878 236H748Z"
        />
      </g>

      <g stroke={`url(#${fillId})`} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
        <path className="jp-code" d="M778 270L762 288L778 306" />
        <path className="jp-code" d="M821 262L803 316" />
        <path className="jp-code" d="M838 270L854 288L838 306" />
      </g>
    </svg>
  );
}
