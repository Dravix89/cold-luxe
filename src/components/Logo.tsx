import { useId } from "react";

type LogoProps = { withWordmark?: boolean; size?: number };

/** Logo COLD - Palette d'or exacte du site (#f3dfae / #d4af6a /#8c6a2e) */
export default function Logo({ withWordmark = true, size = 44 }: LogoProps) {
  const id = useId();
  const moonGradId = `${id}-moon-grad`;
  const goldStrokeId = `${id}-gold-stroke`;
  const goldTextId = `${id}-gold-text`;
  const goldGrainFilterId = `${id}-gold-grain`;
  const moonShadowId = `${id}-moon-shadow`;
  const glowFilterId = `${id}-sun-glow`;

  // Faisceaux de rayons gravés (contours fins comme sur le visuel)
  const rayGroups = [
    { center: -104, count: 6, step: 5.2, length: 48, width: 2.2 }, // Haut gauche
    { center: -60, count: 5, step: 5.2, length: 46, width: 2.2 }, // Haut droite
    { center: -158, count: 5, step: 5.2, length: 46, width: 2.2 }, // Milieu gauche
    { center: 158, count: 5, step: 5.2, length: 46, width: 2.2 }, // Bas gauche
    { center: 112, count: 5, step: 5.2, length: 47, width: 2.2 }, // Bas centre
    { center: 68, count: 5, step: 5.2, length: 46, width: 2.2 }, // Bas droite
  ];

  // Grandes pointes triangulaires intercalaires (haut, gauche, bas, diagonales)
  const spikeAngles = [
    { angle: -90, length: 47, halfWidth: 2.1 }, // Pointe verticale haut
    { angle: 90, length: 47, halfWidth: 2.1 }, // Pointe verticale bas
    { angle: 180, length: 46, halfWidth: 2.1 }, // Pointe horizontale gauche
    { angle: -131, length: 44, halfWidth: 1.9 }, // Diagonale haut-gauche
    { angle: 135, length: 44, halfWidth: 1.9 }, // Diagonale bas-gauche
  ];

  const rays: { angle: number; length: number; halfWidth: number }[] = [];

  rayGroups.forEach((group) => {
    const startAngle = group.center - ((group.count - 1) * group.step) / 2;
    for (let i = 0; i < group.count; i++) {
      const distFromCenter = Math.abs(i - (group.count - 1) / 2);
      rays.push({
        angle: startAngle + i * group.step,
        length: group.length - distFromCenter * 1.6,
        halfWidth: group.width / 2,
      });
    }
  });

  const sunRadius = 18;

  return (
    <svg
      width={withWordmark ? size * 4.2 : size}
      height={size}
      viewBox={withWordmark ? "0 0 504 120" : "0 0 120 120"}
      role="img"
      aria-label="COLD"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* 1. Dégradé métallique multi-reflets pour le croissant de lune */}
        <linearGradient id={moonGradId} x1="15%" y1="5%" x2="85%" y2="95%">
          <stop offset="0%" stopColor="#f3dfae" />
          <stop offset="28%" stopColor="#d4af6a" />
          <stop offset="50%" stopColor="#997d2d" />
          <stop offset="72%" stopColor="#e6c786" />
          <stop offset="90%" stopColor="#f3dfae" />
          <stop offset="100%" stopColor="#997d2d" />
        </linearGradient>

        {/* 2. Dégradé doré lumineux pour les traits gravés et rayons */}
        <linearGradient id={goldStrokeId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f3dfae" />
          <stop offset="50%" stopColor="#d4af6a" />
          <stop offset="100%" stopColor="#997d2d" />
        </linearGradient>

        {/* 3. Dégradé linéaire exact de --gold-gradient pour le texte COLD */}
        <linearGradient id={goldTextId} x1="0%" y1="0%" x2="100%" y2="20%">
          <stop offset="0%" stopColor="#f3dfae" />
          <stop offset="55%" stopColor="#c99b4a" />
          <stop offset="100%" stopColor="#997d2d" />
        </linearGradient>

        {/* 4. Micro-grain métallique brossé */}
        <filter
          id={goldGrainFilterId}
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.8"
            numOctaves="3"
            seed="8"
            result="fineGrain"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.95
                    0 0 0 0 0.87
                    0 0 0 0 0.68
                    0 0 0 0.24 0"
            in="fineGrain"
            result="goldDust"
          />
          <feComposite
            in="goldDust"
            in2="SourceGraphic"
            operator="atop"
            result="texturedGold"
          />
          <feBlend in="SourceGraphic" in2="texturedGold" mode="overlay" />
        </filter>

        {/* 5. Ombre portée réaliste sous le croissant de lune */}
        <filter id={moonShadowId} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow
            dx="-2"
            dy="2.5"
            stdDeviation="2.2"
            floodColor="#000000"
            floodOpacity="0.65"
          />
        </filter>

        {/* 6. Halo ambiant doré subtil */}
        <filter id={glowFilterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* --- EMBLÈME SOLEIL GRAVÉ & CROISSANT D'OR --- */}
      <g transform="translate(54, 60)">
        {/* Halo ambiant discret */}
        <circle
          cx="4"
          cy="0"
          r="25"
          fill="#d4af6a"
          opacity="0.1"
          filter={`url(#${glowFilterId})`}
        />

        {/* Anneau solaire central continu (passe derrière le croissant) */}
        <circle
          cx="0"
          cy="0"
          r={sunRadius}
          fill="none"
          stroke={`url(#${goldStrokeId})`}
          strokeWidth="1.5"
        />

        {/* Rayons gravés en contours fins */}
        <g
          fill="none"
          stroke={`url(#${goldStrokeId})`}
          strokeWidth="0.85"
          strokeLinejoin="round"
        >
          {/* Faisceaux de rayons */}
          {rays.map((ray, index) => (
            <polygon
              key={`ray-${index}`}
              points={`${sunRadius},${-ray.halfWidth} ${ray.length},0 ${sunRadius},${ray.halfWidth}`}
              transform={`rotate(${ray.angle})`}
            />
          ))}

          {/* Pointes triangulaires intercalaires */}
          {spikeAngles.map((spike, index) => (
            <polygon
              key={`spike-${index}`}
              points={`${sunRadius},${-spike.halfWidth} ${spike.length},0 ${sunRadius},${spike.halfWidth}`}
              transform={`rotate(${spike.angle})`}
            />
          ))}
        </g>

        {/* Croissant de lune en relief superposé à droite */}
        <g filter={`url(#${moonShadowId})`}>
          <path
            d="M 39 -14.5 A 19.5 19.5 0 1 0 39 14.5 A 15.6 15.6 0 1 1 39 -14.5 Z"
            fill={`url(#${moonGradId})`}
            filter={`url(#${goldGrainFilterId})`}
            stroke="#f3dfae"
            strokeWidth="0.35"
            strokeOpacity="0.6"
          />
        </g>
      </g>

      {/* --- LETTRAGE COLD --- */}
      {withWordmark && (
        <g>
          <text
            x="132"
            y="76"
            fontFamily="Cormorant Garamond, Georgia, serif"
            fontSize="54"
            fontWeight="500"
            letterSpacing="16"
            fill={`url(#${goldTextId})`}
          >
            COLD
          </text>
          <path
            d="M134 94H460"
            stroke="rgba(212, 175, 106, 0.28)"
            strokeWidth="1"
          />
        </g>
      )}
    </svg>
  );
}
