"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { runResearch } from "@/lib/api";

export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser();

  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState("");
  const [error, setError] = useState("");

  const handleResearch = async () => {
    if (!user || !topic) return;

    setLoading(true);
    setError("");
    setReport("");

    try {
      const data = await runResearch(topic, user.id);
      setReport(data.output);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <main className="max-w-3xl mx-auto py-20 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-3">
          Agentic Intelligence
        </h2>
        <p className="text-gray-500">
          Autonomous AI agents researching the web for you.
        </p>
      </div>

      {!isSignedIn ? (
        <div className="text-center text-gray-500">
          Please sign in to start researching.
        </div>
      ) : (
        <>
          <div className="flex gap-3 mb-8">
            <input
              className="flex-1 border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter research topic (e.g. Fusion Energy)..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />

            <button
              onClick={handleResearch}
              disabled={loading || !topic}
              className="bg-black text-white px-6 py-3 rounded-lg font-medium disabled:bg-gray-400"
            >
              {loading ? "Agents working..." : "Run Research"}
            </button>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {report && (
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <h3 className="text-xl font-bold mb-4">Findings</h3>
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {report}
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}