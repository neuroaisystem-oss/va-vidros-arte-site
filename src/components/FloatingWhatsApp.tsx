import { waLink } from "../lib/whatsapp";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

/** Botão flutuante com pulso. Respeita prefers-reduced-motion e a área segura do celular. */
export function FloatingWhatsApp() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-[calc(env(safe-area-inset-bottom,0px)+16px)] right-[max(16px,calc(env(safe-area-inset-right,0px)+16px))] z-40 grid size-[58px] place-items-center rounded-full bg-wa text-wa-ink shadow-[0_10px_28px_rgba(0,0,0,0.45)] transition-transform hover:scale-105"
    >
      <span aria-hidden="true" className="absolute inset-0 rounded-full border-2 border-wa motion-safe:animate-[pulse-soft_2.6s_ease-out_infinite]" />
      <WhatsAppIcon className="size-[30px] motion-safe:animate-[breathe_2.6s_ease-in-out_infinite]" />
    </a>
  );
}
