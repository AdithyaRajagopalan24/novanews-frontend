// api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function runResearch(topic: string, userId: string) {
  const res = await fetch(`${API_URL}/api/research`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      topic,
      user_id: userId,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to start research");
  }

  return res.json();
}