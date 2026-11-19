export interface QuoteFields {
  name: string;
  phone: string;
  service: string;
  place: string;
  size: string;
  details: string;
}

export type QuoteErrors = Partial<Record<keyof QuoteFields, string>>;

export const EMPTY_QUOTE: QuoteFields = { name: "", phone: "", service: "", place: "", size: "", details: "" };

const MAX_DETAILS = 600;

/** Retorna a mensagem de erro do campo, ou "" quando está válido. Campos opcionais não geram erro. */
export function validateField(name: keyof QuoteFields, raw: string): string {
  const value = raw.trim();
  switch (name) {
    case "name":
      if (!value) return "Informe seu nome.";
      return value.length < 3 ? "Digite o nome completo." : "";
    case "phone": {
      const d = value.replace(/\D/g, "");
      if (!d) return "Informe seu telefone com DDD.";
      if (d.length < 10) return "Faltam números. Use DDD + telefone.";
      if (Number(d.slice(0, 2)) < 11) return "DDD inválido. Confira os dois primeiros números.";
      if (d.length === 11 && d[2] !== "9") return "Celular com 11 dígitos deve começar com 9 depois do DDD.";
      return "";
    }
    case "service":
      return value ? "" : "Escolha o tipo de serviço.";
    case "details":
      return value.length > MAX_DETAILS ? `Use até ${MAX_DETAILS} caracteres.` : "";
    default:
      return "";
  }
}

export function validateAll(fields: QuoteFields): QuoteErrors {
  const errors: QuoteErrors = {};
  (Object.keys(fields) as Array<keyof QuoteFields>).forEach((key) => {
    const message = validateField(key, fields[key]);
    if (message) errors[key] = message;
  });
  return errors;
}
