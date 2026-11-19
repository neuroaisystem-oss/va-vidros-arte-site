import { useEffect, useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";
import { HOURS_ROWS, SITE } from "../config/site";
import { getStatus } from "../lib/hours";
import { mapsEmbedUrl, mapsRouteUrl, mapsSearchUrl, waLink } from "../lib/whatsapp";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

export function Location() {
  const [status, setStatus] = useState(() => getStatus());

  useEffect(() => {
    const id = window.setInterval(() => setStatus(getStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="localizacao" aria-labelledby="loc-title" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto grid max-w-[1224px] items-center gap-8 px-4 sm:px-8 md:grid-cols-[0.95fr_1.05fr] md:gap-16">
        <div className="grid justify-items-start gap-5">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Atendemos Marília-SP e região</p>
          <h2 id="loc-title" className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">Localização / Showroom</h2>
          <p className="flex items-start gap-3 font-semibold">
            <MapPin size={18} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
            {SITE.address}
          </p>

          <p role="status" className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-2 text-[0.95rem] font-bold">
            <span className={`size-2 rounded-full ${status.open ? "bg-wa shadow-[0_0_0_4px_rgba(37,211,102,0.18)]" : "bg-red-400"}`} />
            {status.text}
          </p>

          <dl className="grid w-full max-w-[340px] gap-2">
            {HOURS_ROWS.map((row) => (
              <div key={row.label} className="flex justify-between gap-4 text-[0.95rem]">
                <dt className="text-muted">{row.label}</dt>
                <dd className="font-semibold">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap gap-3">
            <a href={mapsRouteUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong bg-white/5 px-5 text-[0.95rem] font-bold hover:bg-white/10">
              Como chegar <MapPin size={16} aria-hidden="true" />
            </a>
            <a href={waLink("Olá! Vim pelo site da VA Vidros Arte e gostaria de falar com a equipe.")} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-wa px-5 text-[0.95rem] font-bold text-wa-ink hover:brightness-110">
              <WhatsAppIcon className="size-[18px]" /> WhatsApp
            </a>
          </div>
        </div>

        <div className="grid min-w-0 gap-3">
          {/* Mapa real do Google Maps, carregado ao abrir a página (sem clique, sem chave de API). Zoom e arraste funcionam. */}
          <div className="h-[350px] overflow-hidden rounded-3xl border border-line bg-field md:h-[420px]">
            <iframe
              title={`Mapa: ${SITE.name}, ${SITE.address}`}
              src={mapsEmbedUrl()}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
              className="block size-full"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-1">
            <div>
              <strong className="block text-[0.95rem]">Showroom VA Vidros Arte</strong>
              <span className="text-sm text-muted">{SITE.address}</span>
            </div>
            <a href={mapsSearchUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:underline">
              Abrir no Google Maps <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
