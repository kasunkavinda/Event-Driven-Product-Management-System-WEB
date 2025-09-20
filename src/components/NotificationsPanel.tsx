"use client";

import { LowStockWarningEvent } from "@/types/types";
import React from "react";

type Props = {
  items: LowStockWarningEvent[];
};

function formatTs(ts?: string) {
  try {
    return ts ? new Date(ts).toLocaleTimeString() : "";
  } catch {
    return "";
  }
}

export default function NotificationsPanel({ items }: Props) {
  return (
    <aside className="h-full">
      <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto rounded border p-3">
        <h3 className="mb-2 text-sm font-semibold">Notifications</h3>
        {items?.length ? (
          <ul className="space-y-2">
            {items.map((n, i) => {
              const title = n?.type ?? "Notification";

              return (
                <li key={i} className="rounded border p-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{title}</span>
                    <span className="text-xs text-gray-500">
                      {formatTs(n?.ts)}
                    </span>
                  </div>

                  {/* Fallback dump for debugging unknown shapes */}

                  <pre className="mt-1 overflow-x-auto whitespace-pre-wrap break-words text-xs text-gray-500">
                    Product ID: {n.productId} - Current Quantity is{" "}
                    {n.payload.quantity}. But low stock threshold is{" "}
                    {n.payload.threshold}.
                  </pre>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No notifications</p>
        )}
      </div>
    </aside>
  );
}
