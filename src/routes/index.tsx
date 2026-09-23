import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Heart, Leaf, MessageCircle } from "lucide-react";

/**
 * CONFIGURAÇÃO — troque aqui os dados do(a) profissional
 * WhatsApp: código do país + DDD + número, só dígitos
 */
const PROFESSIONAL_WHATSAPP = "5511900000000";
const PROFESSIONAL_NAME = "Consultório de Saúde Mental";

type Answers = {
  name: string;
  phone: string;
  gender: string;
  birthDate: string;
  maritalStatus: string;
  occupation: string;
  city: string;
  email: string;
  reasons: string[];
  reasonDetails: string;
  duration: string;
  impact: string;
  sleep: string;
  previousCare: string;
  medication: string;
  medicationDetails: string;
  diagnosis: string;
  familyHistory: string;
  substances: string;
  modality: string;
  period: string;
  notes: string;
};

const TOTAL_STEPS = 7;

const GENDER_OPTIONS = ["Mulher", "Homem", "Pessoa não binária", "Outro", "Prefiro não informar"];

const REASONS = [
  "Ansiedade ou preocupação excessiva",
  "Tristeza, desânimo ou falta de energia",
  "Estresse ou esgotamento",
  "Relacionamentos",
  "Questões familiares",
  "Luto ou perdas",
  "Autoestima e autoconhecimento",
  "Traumas ou experiências difíceis",
  "Uso de álcool ou outras substâncias",
  "Outro",
];

const DURATION = ["Menos de 1 mês", "Entre 1 e 6 meses", "Entre 6 meses e 1 ano", "Mais de 1 ano"];

const IMPACT = [
  { label: "Pouco", desc: "Consigo manter minha rotina normalmente." },
  { label: "Moderado", desc: "Alguns dias são leves, outros bem pesados." },
  { label: "Muito", desc: "Afeta trabalho, estudos ou relações com frequência." },
  { label: "Intenso", desc: "Está difícil seguir a rotina como antes." },
];

const SLEEP = [
  "Durmo bem",
  "Tenho dificuldade para pegar no sono",
  "Acordo várias vezes durante a noite",
  "Tenho dormido demais",
];

const PREVIOUS_CARE = [
  "Sim, psicoterapia",
  "Sim, acompanhamento psiquiátrico",
  "Sim, os dois",
  "Nunca, esta é a primeira vez",
];

const YES_NO = ["Sim", "Não", "Prefiro não responder"];

const YES_NO_UNSURE = ["Sim", "Não", "Não sei"];

const SUBSTANCES = [
  "Não faço uso",
  "Uso ocasionalmente",
  "Uso com frequência",
  "Prefiro não responder",
];

const MODALITY = ["Online", "Presencial", "Tanto faz"];

const PERIOD = ["Manhã", "Tarde", "Noite", "Qualquer horário"];

const inputClass =
  "w-full rounded-2xl border border-border bg-background px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anamnese inicial | Agende seu primeiro atendimento" },
      {
        name: "description",
        content:
          "Responda a algumas perguntas sobre o seu momento atual e fale direto no WhatsApp com o consultório para agendar seu primeiro atendimento.",
      },
      { property: "og:title", content: "Anamnese inicial | Agende seu primeiro atendimento" },
      {
        property: "og:description",
        content:
          "Um formulário acolhedor que prepara seu primeiro atendimento em psicologia, psiquiatria ou psicanálise.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>({
    name: "",
    phone: "",
    gender: "",
    birthDate: "",
    maritalStatus: "",
    occupation: "",
    city: "",
    email: "",
    reasons: [],
    reasonDetails: "",
    duration: "",
    impact: "",
    sleep: "",
    previousCare: "",
    medication: "",
    medicationDetails: "",
    diagnosis: "",
    familyHistory: "",
    substances: "",
    modality: "",
    period: "",
    notes: "",
  });

  const set = (patch: Partial<Answers>) => setA((prev) => ({ ...prev, ...patch }));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const secondQuestionRef = useRef<HTMLDivElement>(null);
  const scrollToSecondQuestion = () => {
    secondQuestionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const message = [
    "Olá! Respondi à anamnese inicial.",
    "",
    "*Identificação*",
    `- Nome: ${a.name.trim()}`,
    `- WhatsApp: ${a.phone.trim()}`,
    `- Gênero: ${a.gender}`,
    `- Data de nascimento: ${formatDate(a.birthDate)}`,
    `- Estado civil: ${a.maritalStatus.trim() || "—"}`,
    `- Profissão/ocupação: ${a.occupation.trim() || "—"}`,
    `- Cidade/bairro: ${a.city.trim() || "—"}`,
    `- E-mail: ${a.email.trim() || "—"}`,
    "",
    "*Queixa principal*",
    `- Motivos: ${a.reasons.join(", ")}`,
    `- Em suas palavras: ${a.reasonDetails.trim() || "—"}`,
    `- Há quanto tempo: ${a.duration}`,
    `- Impacto na rotina: ${a.impact}`,
    `- Sono: ${a.sleep}`,
    "",
    "*Histórico*",
    `- Acompanhamento anterior: ${a.previousCare}`,
    `- Medicação psiquiátrica: ${a.medication}${
      a.medication === "Sim" && a.medicationDetails.trim() ? ` (${a.medicationDetails.trim()})` : ""
    }`,
    `- Diagnósticos/condições de saúde: ${a.diagnosis.trim() || "—"}`,
    `- Transtornos mentais na família: ${a.familyHistory}`,
    `- Álcool/substâncias: ${a.substances}`,
    "",
    "*Preferências*",
    `- Modalidade: ${a.modality}`,
    `- Período: ${a.period}`,
    `- Observações: ${a.notes.trim() || "—"}`,
  ].join("\n");

  const waLink = `https://wa.me/${PROFESSIONAL_WHATSAPP}?text=${encodeURIComponent(message)}`;

  return (
    <main className="surface-calm min-h-screen px-5 py-10">
      <div className="mx-auto w-full max-w-xl">
        <header className="mb-8 flex items-center justify-center gap-2 text-primary">
          <Leaf className="h-5 w-5" aria-hidden="true" />
          <span className="text-sm tracking-[0.2em] uppercase">{PROFESSIONAL_NAME}</span>
        </header>

        {step > 0 && step <= TOTAL_STEPS && (
          <div className="mb-6">
            <div className="mb-2 flex justify-between text-xs text-muted-foreground">
              <span>{`Passo ${step} de ${TOTAL_STEPS}`}</span>
              <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
              />
            </div>
          </div>
        )}

        <section
          key={step}
          className="animate-in fade-in slide-in-from-bottom-3 shadow-soft rounded-3xl border border-border/60 bg-card p-7 duration-500 sm:p-9"
        >
          {step === 0 && <Welcome a={a} set={set} onStart={() => setStep(1)} />}

          {step === 1 && (
            <Question
              title="Como você se identifica?"
              hint="Selecione a opção que melhor te representa."
            >
              <Options
                options={GENDER_OPTIONS.map((o) => ({ label: o }))}
                value={a.gender}
                onSelect={(v) => {
                  set({ gender: v });
                  setStep(2);
                }}
              />
            </Question>
          )}

          {step === 2 && (
            <Question
              title="Um pouco mais sobre você"
              hint="Essas informações ajudam a montar seu histórico."
            >
              <div className="space-y-4">
                <Field label="Data de nascimento" required>
                  <input
                    type="date"
                    value={a.birthDate}
                    onChange={(e) => set({ birthDate: e.target.value })}
                    className={inputClass}
                  />
                </Field>
                <Field label="Estado civil" required>
                  <input
                    value={a.maritalStatus}
                    onChange={(e) => set({ maritalStatus: e.target.value })}
                    placeholder="Solteiro(a), casado(a), união estável..."
                    className={inputClass}
                  />
                </Field>
                <Field label="Profissão ou ocupação" required>
                  <input
                    value={a.occupation}
                    onChange={(e) => set({ occupation: e.target.value })}
                    placeholder="Ex.: professora, estudante, autônomo..."
                    className={inputClass}
                  />
                </Field>
                <Field label="Cidade e bairro" required>
                  <input
                    value={a.city}
                    onChange={(e) => set({ city: e.target.value })}
                    placeholder="Onde você mora"
                    className={inputClass}
                  />
                </Field>
                <Field label="E-mail" hint="opcional">
                  <input
                    type="email"
                    value={a.email}
                    onChange={(e) => set({ email: e.target.value })}
                    placeholder="seuemail@exemplo.com"
                    className={inputClass}
                  />
                </Field>
              </div>
              <Next
                disabled={
                  !a.birthDate || !a.maritalStatus.trim() || !a.occupation.trim() || !a.city.trim()
                }
                onClick={() => setStep(3)}
                className="mt-5"
              />
            </Question>
          )}

          {step === 3 && (
            <Question
              title="O que te traz aqui"
              hint="Queremos entender o que você tem vivido ultimamente."
            >
              <div className="space-y-8">
                <Segment
                  title="O que te motivou a buscar atendimento agora?"
                  hint="Pode marcar mais de uma opção."
                >
                  <MultiOptions
                    options={REASONS}
                    value={a.reasons}
                    onChange={(v) => set({ reasons: v })}
                  />
                  <textarea
                    value={a.reasonDetails}
                    onChange={(e) => set({ reasonDetails: e.target.value })}
                    rows={3}
                    placeholder="Se quiser, conte com suas palavras (opcional)..."
                    className={`${inputClass} mt-4 resize-none`}
                  />
                </Segment>
                <Divider />
                <Segment title="Há quanto tempo você se sente assim?">
                  <Options
                    options={DURATION.map((d) => ({ label: d }))}
                    value={a.duration}
                    onSelect={(v) => set({ duration: v })}
                  />
                </Segment>
              </div>
              <Next disabled={a.reasons.length === 0 || !a.duration} onClick={() => setStep(4)} />
            </Question>
          )}

          {step === 4 && (
            <Question title="Seu dia a dia" hint="Não existe resposta certa — só a sua.">
              <div className="space-y-8">
                <Segment
                  title="Quanto isso tem afetado sua rotina?"
                  hint="Pense em trabalho, estudos, relações e lazer."
                >
                  <Options
                    options={IMPACT.map((i) => ({ label: i.label, desc: i.desc }))}
                    value={a.impact}
                    onSelect={(v) => {
                      set({ impact: v });
                      scrollToSecondQuestion();
                    }}
                  />
                </Segment>
                <Divider />
                <div ref={secondQuestionRef}>
                  <Segment title="Como está o seu sono nas últimas semanas?">
                    <Options
                      options={SLEEP.map((s) => ({ label: s }))}
                      value={a.sleep}
                      onSelect={(v) => set({ sleep: v })}
                    />
                  </Segment>
                </div>
              </div>
              <Next disabled={!a.impact || !a.sleep} onClick={() => setStep(5)} />
            </Question>
          )}

          {step === 5 && (
            <Question
              title="Seu histórico de cuidado"
              hint="Isso me ajuda a preparar nosso encontro."
            >
              <div className="space-y-8">
                <Segment title="Você já fez acompanhamento psicológico ou psiquiátrico?">
                  <Options
                    options={PREVIOUS_CARE.map((p) => ({ label: p }))}
                    value={a.previousCare}
                    onSelect={(v) => {
                      set({ previousCare: v });
                      scrollToSecondQuestion();
                    }}
                  />
                </Segment>
                <Divider />
                <div ref={secondQuestionRef} className="space-y-8">
                  <Segment title="Faz uso de alguma medicação psiquiátrica atualmente?">
                    <Options
                      options={YES_NO.map((o) => ({ label: o }))}
                      value={a.medication}
                      onSelect={(v) => set({ medication: v })}
                    />
                    {a.medication === "Sim" && (
                      <input
                        value={a.medicationDetails}
                        onChange={(e) => set({ medicationDetails: e.target.value })}
                        placeholder="Quais? (nome e dose, se souber)"
                        className={`${inputClass} mt-4`}
                      />
                    )}
                  </Segment>
                  <Segment
                    title="Possui algum diagnóstico ou condição de saúde relevante?"
                    hint="Opcional. Pode ser de saúde mental ou física."
                  >
                    <input
                      value={a.diagnosis}
                      onChange={(e) => set({ diagnosis: e.target.value })}
                      placeholder="Ex.: TDAH, hipotireoidismo, nenhum..."
                      className={inputClass}
                    />
                  </Segment>
                </div>
              </div>
              <Next disabled={!a.previousCare || !a.medication} onClick={() => setStep(6)} />
            </Question>
          )}

          {step === 6 && (
            <Question title="Contexto de vida" hint="Suas respostas são tratadas com sigilo.">
              <div className="space-y-8">
                <Segment
                  title="Há histórico de transtornos mentais na sua família?"
                  hint="Como depressão, ansiedade, bipolaridade, dependência química..."
                >
                  <Options
                    options={YES_NO_UNSURE.map((o) => ({ label: o }))}
                    value={a.familyHistory}
                    onSelect={(v) => {
                      set({ familyHistory: v });
                      scrollToSecondQuestion();
                    }}
                  />
                </Segment>
                <Divider />
                <div ref={secondQuestionRef}>
                  <Segment title="Você faz uso de álcool, cigarro ou outras substâncias?">
                    <Options
                      options={SUBSTANCES.map((s) => ({ label: s }))}
                      value={a.substances}
                      onSelect={(v) => set({ substances: v })}
                    />
                  </Segment>
                </div>
              </div>
              <Next disabled={!a.familyHistory || !a.substances} onClick={() => setStep(7)} />
            </Question>
          )}

          {step === 7 && (
            <Question title="Últimos detalhes" hint="Estamos quase terminando.">
              <div className="space-y-8">
                <Segment title="Como você prefere ser atendido(a)?">
                  <Options
                    options={MODALITY.map((m) => ({ label: m }))}
                    value={a.modality}
                    onSelect={(v) => {
                      set({ modality: v });
                      scrollToSecondQuestion();
                    }}
                  />
                </Segment>
                <Divider />
                <div ref={secondQuestionRef} className="space-y-8">
                  <Segment title="Qual o melhor período para você?">
                    <Options
                      options={PERIOD.map((p) => ({ label: p }))}
                      value={a.period}
                      onSelect={(v) => set({ period: v })}
                    />
                  </Segment>
                  <Segment
                    title="Há algo que você gostaria que eu soubesse antes do nosso primeiro atendimento?"
                    hint="Opcional. Escreva no seu ritmo."
                  >
                    <textarea
                      value={a.notes}
                      onChange={(e) => set({ notes: e.target.value })}
                      rows={4}
                      placeholder="Pode escrever livremente..."
                      className={`${inputClass} resize-none`}
                    />
                  </Segment>
                </div>
              </div>
              <Next
                label="Concluir"
                disabled={!a.modality || !a.period}
                onClick={() => setStep(8)}
              />
            </Question>
          )}

          {step === 8 && <Done name={a.name} waLink={waLink} />}

          {step > 0 && step <= TOTAL_STEPS && (
            <button
              onClick={() => setStep(step - 1)}
              className="mt-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar
            </button>
          )}
        </section>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Suas respostas são enviadas somente para o consultório, pelo WhatsApp.
        </p>
      </div>
    </main>
  );
}

function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function formatDate(iso: string) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function Welcome({
  a,
  set,
  onStart,
}: {
  a: Answers;
  set: (p: Partial<Answers>) => void;
  onStart: () => void;
}) {
  const valid = a.name.trim().length > 2 && a.phone.replace(/\D/g, "").length === 11;

  return (
    <div>
      <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
        <Heart className="h-3.5 w-3.5" aria-hidden="true" /> Anamnese inicial
      </span>
      <h1 className="mt-4 text-3xl leading-tight sm:text-4xl">Que bom que você deu esse passo.</h1>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        Antes do nosso primeiro atendimento, conte um pouco sobre o seu momento atual. Assim consigo
        me preparar para te receber melhor. Leva cerca de 5 minutos.
      </p>

      <div className="mt-7 space-y-4">
        <Field label="Nome completo" required>
          <input
            value={a.name}
            onChange={(e) => set({ name: e.target.value })}
            placeholder="Como posso te chamar?"
            className={inputClass}
          />
        </Field>
        <Field label="WhatsApp com DDD" required>
          <input
            value={a.phone}
            inputMode="tel"
            onChange={(e) => set({ phone: formatPhone(e.target.value) })}
            placeholder="(85) 90000-0000"
            className={inputClass}
          />
        </Field>
      </div>

      <Next label="Iniciar" disabled={!valid} onClick={onStart} />
    </div>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-muted-foreground">
        {label}
        {required && <span className="text-primary"> *</span>}
        {hint && <span className="text-muted-foreground"> ({hint})</span>}
      </span>
      {children}
    </label>
  );
}

function Question({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-2xl leading-snug">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{hint}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Segment({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-lg font-medium leading-snug">{title}</h3>
      {hint && <p className="mt-1 text-sm text-muted-foreground">{hint}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Divider() {
  return <div className="border-t border-border/60" />;
}

function Next({
  label = "Continuar",
  disabled,
  onClick,
  className = "mt-7",
}: {
  label?: string;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${className} inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40`}
    >
      {label} <ArrowRight className="h-4 w-4" />
    </button>
  );
}

function Options({
  options,
  value,
  onSelect,
}: {
  options: { label: string; desc?: string }[];
  value: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="grid gap-3">
      {options.map((o) => {
        const active = value === o.label;
        return (
          <button
            key={o.label}
            onClick={() => onSelect(o.label)}
            className={`rounded-2xl border px-5 py-4 text-left transition ${
              active
                ? "border-primary bg-secondary"
                : "border-border bg-background hover:border-primary/60 hover:bg-secondary/50"
            }`}
          >
            <span className="block text-base font-medium">{o.label}</span>
            {o.desc && <span className="mt-1 block text-sm text-muted-foreground">{o.desc}</span>}
          </button>
        );
      })}
    </div>
  );
}

function MultiOptions({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (o: string) =>
    onChange(value.includes(o) ? value.filter((v) => v !== o) : [...value, o]);

  return (
    <div className="grid gap-3">
      {options.map((o) => {
        const active = value.includes(o);
        return (
          <button
            key={o}
            onClick={() => toggle(o)}
            aria-pressed={active}
            className={`flex items-center gap-3 rounded-2xl border px-5 py-4 text-left transition ${
              active
                ? "border-primary bg-secondary"
                : "border-border bg-background hover:border-primary/60 hover:bg-secondary/50"
            }`}
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                active ? "border-primary bg-primary text-primary-foreground" : "border-border"
              }`}
            >
              {active && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
            </span>
            <span className="text-base font-medium">{o}</span>
          </button>
        );
      })}
    </div>
  );
}

function Done({ name, waLink }: { name: string; waLink: string }) {
  const first = name.trim().split(" ")[0];
  return (
    <div className="text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary">
        <Heart className="h-6 w-6" aria-hidden="true" />
      </div>
      <h2 className="mt-5 text-2xl">Tudo pronto, {first}.</h2>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        Buscar ajuda exige coragem, e você acabou de fazer isso. Envie suas respostas e vamos
        combinar o melhor horário para o nosso primeiro atendimento.
      </p>
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-medium text-primary-foreground transition hover:opacity-90"
      >
        <MessageCircle className="h-5 w-5" /> Enviar respostas e falar no WhatsApp
      </a>
    </div>
  );
}
