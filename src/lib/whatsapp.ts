import { SITE } from "../config/site";
import type { QuoteFields } from "./validation";

/** Link do WhatsApp com mensagem pré-preenchida. */
export const waLink = (message: string = SITE.defaultMessage): string =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const mapsSearchUrl = (): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`;

/** URL pública de embed do Google Maps para o iframe (sem chave de API). */
export const mapsEmbedUrl = (): string =>
  `https://maps.google.com/maps?q=${encodeURIComponent("Rua Joao Martins Coelho, 2771, Marilia - SP")}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

export const mapsRouteUrl = (): string =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SITE.mapsQuery)}`;

/** Mensagem enviada ao WhatsApp a partir do formulário. Campos opcionais só entram se preenchidos. */
export function buildQuoteMessage(f: QuoteFields): string {
  const lines = [
    SITE.defaultMessage,
    "",
    `*Nome:* ${f.name.trim()}`,
    `*Telefone:* ${f.phone.trim()}`,
    `*Serviço:* ${f.service.trim()}`,
  ];
  if (f.place.trim()) lines.push(`*Local:* ${f.place.trim()}`);
  if (f.size.trim()) lines.push(`*Medidas:* ${f.size.trim()}`);
  if (f.details.trim()) lines.push(`*Detalhes:* ${f.details.trim()}`);
  return lines.join("\n");
}
