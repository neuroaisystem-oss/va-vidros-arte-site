import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Check, Copy } from "lucide-react";
import { SITE } from "../config/site";
import { CATEGORIES } from "../data/catalog";
import { formatPhone } from "../lib/phone";
import { EMPTY_QUOTE, validateAll, validateField, type QuoteErrors, type QuoteFields } from "../lib/validation";
import { buildQuoteMessage, waLink } from "../lib/whatsapp";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

const FIELD =
  "min-h-12 w-full rounded-xl border bg-field px-3.5 text-base font-medium text-slate-100 transition placeholder:text-[#6f7c8e] hover:border-[#46536a] focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-accent/30";
const border = (error?: string) => (error ? "border-red-400" : "border-line-strong");

const STEPS = [
  "Você informa nome, telefone e o serviço desejado.",
  "O WhatsApp abre com a mensagem pronta para a nossa equipe.",
  "Combinamos a medição técnica e o orçamento.",
] as const;

type FieldRef = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export function QuoteForm() {
  const [values, setValues] = useState<QuoteFields>(EMPTY_QUOTE);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [message, setMessage] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const refs = useRef<Partial<Record<keyof QuoteFields, FieldRef | null>>>({});
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const setField = (name: keyof QuoteFields, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    // Depois do primeiro erro, revalida enquanto a pessoa corrige.
    if (errors[name]) setErrors((e) => ({ ...e, [name]: validateField(name, value) || undefined }));
  };

  const onChange = (e: ChangeEvent<FieldRef>) => {
    const name = e.target.name as keyof QuoteFields;
    setField(name, name === "phone" ? formatPhone(e.target.value) : e.target.value);
  };

  const onBlur = (name: keyof QuoteFields) => {
    if (values[name] || errors[name]) setErrors((e) => ({ ...e, [name]: validateField(name, values[name]) || undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validateAll(values);
    setErrors(found);
    const firstInvalid = (["name", "phone", "service", "details"] as const).find((k) => found[k]);
    if (firstInvalid) {
      refs.current[firstInvalid]?.focus();
      return;
    }
    const text = buildQuoteMessage(values);
    setMessage(text);
    setFeedback("");
    window.open(waLink(text), "_blank", "noopener,noreferrer");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message ?? "");
      setFeedback("Mensagem copiada.");
    } catch {
      messageRef.current?.select();
      setFeedback("Selecionamos o texto. Copie e cole no WhatsApp.");
    }
  };

  const bind = (name: keyof QuoteFields) => ({
    id: `f-${name}`,
    name,
    value: values[name],
    onChange,
    onBlur: () => onBlur(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `e-${name}` : undefined,
    ref: (el: FieldRef | null) => { refs.current[name] = el; },
  });

  const error = (name: keyof QuoteFields) =>
    errors[name] ? <p id={`e-${name}`} className="text-[0.82rem] font-semibold text-red-300">{errors[name]}</p> : null;

  return (
    <section id="orcamento" aria-labelledby="quote-title" className="scroll-mt-20 bg-night py-16 sm:py-24">
      <div className="mx-auto grid max-w-[1224px] items-start gap-8 px-4 sm:px-8 md:grid-cols-[0.85fr_1.25fr] md:gap-16">
        <div className="grid gap-6">
          <div className="grid gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Orçamento sob medida</p>
            <h2 id="quote-title" className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">Conte o que você precisa</h2>
            <p className="max-w-[60ch] text-muted">
              Preencha o essencial. Se ainda não sabe as medidas, sem problema: a gente confirma na medição técnica.
            </p>
          </div>
          <ol className="grid gap-3.5">
            {STEPS.map((step, i) => (
              <li key={step} className="grid grid-cols-[32px_1fr] items-start gap-3 text-[0.95rem] text-muted">
                <span className="grid size-8 place-items-center rounded-full bg-accent/10 text-sm font-extrabold text-accent">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <div className="grid gap-1 rounded-2xl border border-line bg-surface px-[18px] py-4">
            <strong>Comercial · {SITE.phoneLabel}</strong>
            <span className="text-sm text-muted">Marília-SP e região</span>
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-surface p-5 sm:p-9">
          {message === null ? (
            <form onSubmit={onSubmit} noValidate>
              <div className="grid gap-[18px] sm:grid-cols-2">
                <div className="grid min-w-0 content-start gap-1.5">
                  <label htmlFor="f-name" className="text-sm font-bold">Nome completo</label>
                  <input {...bind("name")} type="text" autoComplete="name" placeholder="Como podemos te chamar?" required className={`${FIELD} ${border(errors.name)}`} />
                  {error("name")}
                </div>
                <div className="grid min-w-0 content-start gap-1.5">
                  <label htmlFor="f-phone" className="text-sm font-bold">Telefone / WhatsApp</label>
                  <input {...bind("phone")} type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(14) 99999-9999" required className={`${FIELD} ${border(errors.phone)}`} />
                  {error("phone")}
                </div>
                <div className="grid min-w-0 content-start gap-1.5">
                  <label htmlFor="f-service" className="text-sm font-bold">Tipo de serviço</label>
                  <select {...bind("service")} required className={`${FIELD} ${border(errors.service)} cursor-pointer`}>
                    <option value="" disabled>Selecione o serviço</option>
                    {CATEGORIES.map((c) => <option key={c.id} value={c.label}>{c.label}</option>)}
                  </select>
                  {error("service")}
                </div>
                <div className="grid min-w-0 content-start gap-1.5">
                  <label htmlFor="f-place" className="text-sm font-bold">Bairro ou cidade <small className="font-medium text-muted">(opcional)</small></label>
                  <input {...bind("place")} type="text" autoComplete="address-level2" maxLength={80} placeholder="Ex.: Marília, Jardim Santa Antonieta" className={`${FIELD} border-line-strong`} />
                </div>
                <div className="grid min-w-0 content-start gap-1.5 sm:col-span-2">
                  <label htmlFor="f-size" className="text-sm font-bold">Medidas ou metragem estimada <small className="font-medium text-muted">(opcional)</small></label>
                  <input {...bind("size")} type="text" maxLength={80} placeholder="Ex.: 12 m² ou 8 metros lineares" aria-describedby="h-size" className={`${FIELD} border-line-strong`} />
                  <p id="h-size" className="text-xs text-muted">Ainda não mediu? Deixe em branco, a medição técnica confirma tudo.</p>
                </div>
                <div className="grid min-w-0 content-start gap-1.5 sm:col-span-2">
                  <label htmlFor="f-details" className="text-sm font-bold">Detalhes do projeto <small className="font-medium text-muted">(opcional)</small></label>
                  <textarea {...bind("details")} maxLength={600} rows={5} placeholder="Cor do alumínio, tipo de vidro, prazo, se a obra está em andamento..." className={`${FIELD} ${border(errors.details)} resize-y py-3`} />
                  {error("details")}
                </div>
              </div>
              <div className="mt-6 grid gap-3">
                <button type="submit" className="inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-wa font-bold text-wa-ink transition hover:-translate-y-px hover:brightness-110">
                  <WhatsAppIcon className="size-[18px]" /> Enviar orçamento e abrir WhatsApp
                </button>
                <p className="text-center text-xs text-muted">Depois de abrir a conversa, você pode enviar fotos do local para agilizar o orçamento.</p>
              </div>
            </form>
          ) : (
            <div className="grid justify-items-start gap-[18px]">
              <span className="grid size-12 place-items-center rounded-full bg-wa/15 text-wa"><Check size={24} aria-hidden="true" /></span>
              <h3 className="text-2xl font-extrabold">Mensagem pronta para enviar</h3>
              <p className="text-muted">Toque no botão para abrir o WhatsApp com os seus dados. Se a conversa não abrir sozinha, use o botão abaixo ou copie o texto.</p>
              <textarea ref={messageRef} readOnly value={message} aria-label="Mensagem do orçamento" className="min-h-48 w-full resize-y rounded-xl border border-line-strong bg-field p-3.5 text-sm" />
              <div className="flex flex-wrap gap-3">
                <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-wa px-5 font-bold text-wa-ink hover:brightness-110">
                  <WhatsAppIcon className="size-[18px]" /> Abrir WhatsApp
                </a>
                <button type="button" onClick={copy} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong bg-white/5 px-5 font-bold hover:bg-white/10">
                  <Copy size={16} aria-hidden="true" /> Copiar mensagem
                </button>
                <button type="button" onClick={() => setMessage(null)} className="inline-flex min-h-12 items-center rounded-full border border-line-strong bg-white/5 px-5 font-bold hover:bg-white/10">
                  Editar dados
                </button>
              </div>
              <p role="status" className="min-h-[1.2em] text-sm font-semibold text-accent">{feedback}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
