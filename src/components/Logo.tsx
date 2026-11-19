interface LogoProps {
  className?: string;
}

/** Logo VA Vidro Arte em SVG: sem fundo retangular, o texto herda a cor do contexto (currentColor). */
export function Logo({ className = "h-14 w-auto" }: LogoProps) {
  return (
    <svg viewBox="0 0 92 116" className={className} role="img" aria-label="VA Vidro Arte">
      <circle cx="46" cy="42" r="40" fill="#1b4fc4" />
      <circle cx="46" cy="42" r="40" fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="1.5" />
      <text x="46" y="56" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="40" fill="#fff">VA</text>
      <text x="46" y="106" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="20" fill="currentColor">Vidro Arte</text>
    </svg>
  );
}
