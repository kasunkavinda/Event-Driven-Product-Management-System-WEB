import { LowStockWarningEvent } from "@/types/types";
import { useEffect, useState } from "react";

export function useLowStockStream() {
  const sellerId = process.env.SELLER_ID || "demo";
  const [events, setEvents] = useState<LowStockWarningEvent[]>([]);

  useEffect(() => {
    const api = process.env.NEXT_PUBLIC_API!;
    const url = `${api}/events/stream?sellerId=${encodeURIComponent(sellerId)}`;
    const s = new EventSource(url);

    console.log("[SSE] open attempt", url);
    s.onopen = () => console.log("[SSE] open");
    s.onerror = (e) => console.error("[SSE] error", e);
    s.addEventListener("ready", (ev) =>
      console.log("[SSE] ready", (ev as MessageEvent).data)
    );

    s.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        if (data.type === "LowStockWarning") {
          setEvents((prev) => [data, ...prev].slice(0, 50));
        }
      } catch (err) {
        console.warn("Bad SSE payload", err, ev.data);
      }
    };

    return () => s.close();
  }, [sellerId]);

  return events;
}
