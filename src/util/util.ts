export const toNum = (v: unknown, fallback = 0) =>
  v === "" || v == null ? fallback : Number(v);
