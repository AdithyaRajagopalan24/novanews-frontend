"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { runResearch } from "../api";

export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState("");

  if (!isLoaded) return <div className="p-10 text-center">Loading...</div>;

  return (
    <main className="max-w-3xl mx-auto py-20 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-3">Agentic Intelligence</h2>
        <p className="text-gray-500">Autonomous AI agents researching the web for you.</p>
      </div>

      {/* Manual Check instead of SignedIn/SignedOut components */}
      {!isSignedIn ? (
        <div className="bg-gray-50 p-10 rounded-xl text-center border border-dashed">
          <p className="text-gray-600 mb-4">Please sign in to start using the research agents.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex gap-3">
            <input
              className="flex-1 border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter research topic..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <button
              onClick={async () => {
                setLoading(true);
                try {
                  const data = await runResearch(topic, user?.id as string);
                  setReport(data.message || "Processing started...");
                } catch (e) {
                  console.error(e);
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading || !topic}
              className="bg-black text-white px-6 py-3 rounded-lg disabled:bg-gray-400"
            >
              {loading ? "Working..." : "Run Research"}
            </button>
          </div>
          
          {report && (
            <div className="p-6 bg-white border rounded-xl shadow-sm">
              <p className="whitespace-pre-wrap">{report}</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}