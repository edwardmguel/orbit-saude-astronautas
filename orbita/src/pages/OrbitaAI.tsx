import { Fragment, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { BookOpen, ExternalLink, Send, Trash2, WifiOff } from "lucide-react";
import { useApp } from "@/lib/store";
import { answer, SUGGESTIONS } from "@/lib/ai";
import { RISK_BY_ID } from "@/data/risks";
import { OrbitaLogo } from "@/components/OrbitaLogo";
import { Avatar, PageTitle } from "@/components/ui";
import { uid } from "@/lib/util";

/** Renders **bold**, _italic_ and line breaks. */
function Rich({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((l, i) => {
        const parts: ReactNode[] = [];
        const re = /(\*\*[^*]+\*\*|_[^_]+_)/g;
        let last = 0;
        let m: RegExpExecArray | null;
        while ((m = re.exec(l))) {
          if (m.index > last) parts.push(l.slice(last, m.index));
          const tok = m[0];
          parts.push(tok.startsWith("**") ? <strong key={m.index} className="font-semibold text-ink">{tok.slice(2, -2)}</strong> : <em key={m.index} className="text-faint">{tok.slice(1, -1)}</em>);
          last = m.index + tok.length;
        }
        if (last < l.length) parts.push(l.slice(last));
        return (
          <Fragment key={i}>
            {l === "" ? <span className="block h-2" /> : <span className={l.startsWith("•") ? "block pl-1" : "block"}>{parts}</span>}
          </Fragment>
        );
      })}
    </>
  );
}

export default function OrbitaAI() {
  const { state, selected, pushChat, clearChat, photoOf } = useApp();
  const [q, setQ] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const chat = state.data[selected.profile.id]?.chat ?? [];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chat.length, typing]);

  const ask = (text: string) => {
    const t = text.trim();
    if (!t || typing) return;
    const id = selected.profile.id;
    pushChat(id, [{ id: uid(), role: "user", text: t, ts: Date.now() }]);
    setQ("");
    setTyping(true);
    setTimeout(() => {
      const a = answer(t, state, id);
      pushChat(id, [{ id: uid(), role: "ai", text: a.text, ts: Date.now(), refs: a.refs }]);
      setTyping(false);
    }, 650 + Math.random() * 450);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    ask(q);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <PageTitle
        title="ORBITA AI"
        subtitle="Intelligent space health assistant."
        right={
          <span className="flex items-center gap-2 rounded-full border border-st-normal/30 bg-st-normal/10 px-3 py-1.5 text-[11.5px] text-st-normal">
            <WifiOff size={13} /> Working offline · local NASA HRP base
          </span>
        }
      />

      <div className="glass flex h-[calc(100dvh-230px)] min-h-[480px] flex-col overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <OrbitaLogo size={36} />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-navy-2 bg-st-normal" />
            </div>
            <div>
              <div className="font-display text-[13px] font-semibold tracking-[0.14em]">ORBITA AI</div>
              <div className="text-[11.5px] text-mist">Context: Astronaut {selected.profile.code} · {selected.profile.name}</div>
            </div>
          </div>
          {chat.length > 0 && (
            <button onClick={() => clearChat(selected.profile.id)} className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[12px] text-mist hover:bg-white/5 hover:text-ink">
              <Trash2 size={13} /> Clear history
            </button>
          )}
        </div>

        <div className="scroll-thin flex-1 space-y-4 overflow-y-auto px-4 py-5" aria-live="polite">
          {chat.length === 0 && (
            <div className="flex flex-col items-center py-6 text-center animate-fade-up">
              <OrbitaLogo size={56} />
              <p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-mist">
                Hello, {selected.profile.name.split(" ")[0]}. I answer based on your data and the local risk library of the NASA Human Research Program. I do not provide medical diagnoses.
              </p>
            </div>
          )}
          {chat.map((m) =>
            m.role === "user" ? (
              <div key={m.id} className="flex justify-end gap-2.5 animate-fade-up">
                <div className="max-w-[80%] rounded-2xl rounded-tr-md border border-cyan/30 bg-cyan/10 px-4 py-2.5 text-[13.5px]">{m.text}</div>
                <Avatar src={photoOf(selected.profile.id)} alt={selected.profile.name} size={30} />
              </div>
            ) : (
              <div key={m.id} className="flex gap-2.5 animate-fade-up">
                <OrbitaLogo size={30} className="shrink-0" />
                <div className="max-w-[86%]">
                  <div className="rounded-2xl rounded-tl-md border border-line bg-navy/60 px-4 py-3 text-[13.5px] leading-relaxed text-ink/85">
                    <Rich text={m.text} />
                  </div>
                  {m.refs && m.refs.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.refs.map((r) => {
                        const risk = RISK_BY_ID[r];
                        if (!risk) return null;
                        return (
                          <a key={r} href={risk.refUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-md border border-line px-2 py-1 text-[11px] text-mist transition hover:border-cyan/40 hover:text-cyan">
                            <BookOpen size={11} /> {risk.refTitle} <ExternalLink size={10} />
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ),
          )}
          {typing && (
            <div className="flex items-center gap-2.5">
              <OrbitaLogo size={30} />
              <div className="flex gap-1 rounded-2xl border border-line bg-navy/60 px-4 py-3.5">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-1.5 w-1.5 rounded-full bg-cyan" style={{ animation: `typing 1.2s ${i * 0.15}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="border-t border-line p-3">
          <div className="scroll-thin mb-2.5 flex gap-1.5 overflow-x-auto pb-1">
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => ask(s)} disabled={typing} className="shrink-0 rounded-full border border-line px-3 py-1.5 text-[12px] text-mist transition hover:border-cyan/40 hover:text-ink disabled:opacity-40">
                {s}
              </button>
            ))}
          </div>
          <form onSubmit={submit} className="flex gap-2">
            <input className="field" placeholder="Ask about your health, the crew or space risks…" value={q} onChange={(e) => setQ(e.target.value)} maxLength={300} aria-label="Question for ORBITA AI" />
            <button type="submit" className="btn-primary !px-4" disabled={!q.trim() || typing} aria-label="Send question">
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
