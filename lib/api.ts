const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
    const text = await res.text();
    throw new Error(text || "Failed to fetch research");
  }

  return res.json();
}