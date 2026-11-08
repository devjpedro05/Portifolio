// Cenário minimalista em profundidade atrás da foto (recortada) dentro do hexágono:
// piso em perspectiva bem sutil, poucos hexágonos finos vindo do fundo e um halo suave.
const RING_COUNT = 3;

const HEX_POINTS = "50,1 99,25.5 99,74.5 50,99 1,74.5 1,25.5";

export default function HexDepthScene() {
  return (
    <div className="hex-depth" aria-hidden="true">
      <div className="hex-depth-floor-wrap">
        <div className="hex-depth-floor" />
      </div>
      <svg className="hex-depth-tunnel" viewBox="0 0 100 100" preserveAspectRatio="none">
        {Array.from({ length: RING_COUNT }, (_, index) => (
          <polygon
            key={index}
            className="depth-ring"
            points={HEX_POINTS}
            style={{ "--ring-index": index }}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div className="hex-depth-halo" />
    </div>
  );
}
