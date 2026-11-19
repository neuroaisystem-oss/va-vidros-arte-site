import { ArrowRight, MapPin, Ruler, ShieldCheck } from "lucide-react";

const TRUST = [
  { icon: Ruler, label: "Medição técnica" },
  { icon: ShieldCheck, label: "Instalação especializada" },
  { icon: MapPin, label: "Marília-SP e região" },
] as const;

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate -mt-[68px] overflow-hidden sm:-mt-[76px]">
      <img
        src="/img/projeto-1.jpg"
        alt=""
        className="absolute inset-0 -z-20 size-full animate-[slowzoom_30s_ease-in-out_infinite_alternate] object-cover motion-reduce:animate-none"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#002b66]/85 via-[#07142c]/90 to-night" />

      <div className="mx-auto grid max-w-[1224px] justify-items-center gap-5 px-4 pb-24 pt-44 text-center sm:px-8 sm:pt-52">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Vidraçaria em Marília - SP</p>
        <h1 id="hero-title" className="text-balance text-5xl font-extrabold tracking-tight text-blue-50 sm:text-7xl">
          VA Vidros Arte
        </h1>
        <p className="max-w-[58ch] text-base text-slate-300 sm:text-lg">
          Atendimento em Marília e região: esquadrias de alumínio, vidro temperado, box, vidro comum, espelhos, guarda-corpo, sacadas e fachadas sob medida.
        </p>
        <div className="mt-1.5 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a href="#orcamento" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-bold text-accent-ink transition hover:-translate-y-px hover:brightness-110">
            Solicitar orçamento grátis <ArrowRight size={18} />
          </a>
          <a href="#catalogo" className="inline-flex min-h-12 items-center justify-center rounded-full border border-line-strong bg-white/5 px-6 font-bold backdrop-blur transition hover:-translate-y-px hover:bg-white/10">
            Ver projetos
          </a>
        </div>
        <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2.5 text-sm font-semibold text-slate-300">
          {TRUST.map(({ icon: Icon, label }) => (
            <li key={label} className="inline-flex items-center gap-2">
              <Icon size={18} className="text-accent" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
