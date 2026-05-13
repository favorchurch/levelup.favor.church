"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

export default function ReflectionCard({
  day,
  prompt,
  initialText,
}: {
  day: number;
  prompt: string;
  initialText: string;
}) {
  const [text, setText] = useState(initialText);
  const [saving, setSaving] = useState<"idle" | "saving" | "saved">("idle");
  const timer = useRef<number | null>(null);
  const last = useRef(initialText);

  useEffect(() => {
    if (text === last.current) return;
    if (timer.current) window.clearTimeout(timer.current);
    setSaving("saving");
    timer.current = window.setTimeout(async () => {
      try {
        await fetch("/api/reflection", {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ day, text }),
        });
        last.current = text;
        setSaving("saved");
      } catch {
        setSaving("idle");
      }
    }, 800);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [text, day]);

  return (
    <section className="bg-surface-container-high rounded-xl p-md flex flex-col gap-sm border border-surface-variant">
      <div className="flex items-center gap-3 mb-xs">
        <div className="w-10 h-10 rounded-lg bg-tertiary-container/20 flex items-center justify-center">
          <Icon name="psychology" className="text-tertiary-container" />
        </div>
        <h3 className="font-title-md text-title-md text-on-surface">Reflection</h3>
        <span
          className={
            "ml-auto text-label-sm font-label-bold " +
            (saving === "saved"
              ? "text-tertiary"
              : saving === "saving"
              ? "text-on-surface-variant"
              : "text-on-surface-variant/50")
          }
        >
          {saving === "saving" ? "Saving…" : saving === "saved" ? "Saved" : ""}
        </span>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant">{prompt}</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your thoughts..."
        className="w-full bg-surface-container-lowest border-none rounded-lg mt-md p-md text-on-surface focus:ring-2 focus:ring-primary-container h-32 resize-none"
      />
    </section>
  );
}
