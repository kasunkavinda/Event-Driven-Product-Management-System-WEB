import { Product } from "./types/types";

const API = process.env.NEXT_PUBLIC_API!;
const seller = process.env.SELLER_ID || "demo";

export async function listProducts() {
  const res = await fetch(`${API}/products`, {
    headers: { "x-seller-id": seller },
  });
  return res.json();
}
export async function createProduct(body: Partial<Product>) {
  const res = await fetch(`${API}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-seller-id": seller },
    body: JSON.stringify(body),
  });
  return res.json();
}
export async function updateProduct(id: number, body: Partial<Product>) {
  const res = await fetch(`${API}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "x-seller-id": seller },
    body: JSON.stringify(body),
  });
  return res.json();
}
export async function deleteProduct(id: number) {
  await fetch(`${API}/products/${id}`, {
    method: "DELETE",
    headers: { "x-seller-id": seller },
  });
}
