import { Building2, ScanLine, Target, type LucideIcon } from "lucide-react";

interface Pillar {
  icon: LucideIcon;
  title: string;
  text: string;
}

const PILLARS: readonly Pillar[] = [
  {
    icon: Building2,
    title: "Sobre a VA Vidros Arte",
    text: "A VA Vidros Arte atende Marília-SP e região com soluções em vidro e esquadrias de alumínio feitas sob medida, da medição à instalação.",
  },
  {
    icon: Target,
    title: "Nossa missão",
    text: "Orientar cada cliente na escolha da melhor solução, com medição técnica e instalação especializada.",
  },
  {
    icon: ScanLine,
    title: "Nosso foco",
    text: "Esquadrias de alumínio, vidro temperado, box, vidro comum, espelhos, guarda-corpo, sacadas e fachadas.",
  },
];

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="scroll-mt-20 bg-night py-16 sm:py-24">
      <div className="mx-auto max-w-[1224px] px-4 sm:px-8">
        <div className="mb-9 grid max-w-3xl gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Vidraçaria em Marília-SP</p>
          <h2 id="sobre-title" className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
            Do projeto à instalação, com medição técnica
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, text }) => (
            <article key={title} className="grid content-start gap-3 rounded-2xl border border-line bg-surface p-7">
              <span className="grid size-11 place-items-center rounded-xl bg-accent/10 text-accent">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="text-[0.95rem] text-muted">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
