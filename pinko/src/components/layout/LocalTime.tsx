"use client";

import { useEffect, useState } from "react";

/**
 * The small human line the reference keeps in its header.
 *
 * Rendered empty on the server and filled in the browser: the greeting
 * depends on the visitor's own clock, and a server-rendered one would be
 * wrong for anyone in another timezone — and would make the page
 * non-cacheable for the sake of a pleasantry.
 */
export function LocalTime() {
  const [line, setLine] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hour = now.getHours();
      const part =
        hour < 5
          ? "Kasno je"
          : hour < 11
            ? "Dobro jutro"
            : hour < 17
              ? "Lijep dan"
              : hour < 22
                ? "Dobra večer"
                : "Kasno je";
      const clock = now.toLocaleTimeString("hr-HR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setLine(`${part} · ${clock}`);
    };
    update();
    const timer = setInterval(update, 30_000);
    return () => clearInterval(timer);
  }, []);

  if (!line) return null;

  return (
    <p className="mono-label hidden text-ink-soft lg:block" suppressHydrationWarning>
      {line}
    </p>
  );
}
