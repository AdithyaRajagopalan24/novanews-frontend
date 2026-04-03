"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { runResearch } from "../api";

export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "error">("idle");

  
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-lg font-medium text-gray-500">
          Initializing NovaNews...
        </div>
      </div>
    );
  }

  const handleRunResearch = async () => {
    if (!topic || !user) return;

    setLoading(true);
    setReport("");
    setStatus("idle");

    try {
      
      const data = await runResearch(topic, user.id);

      
      if (data.status === "processing") {
        setStatus("processing");
        setReport(
          "🚀 AI Agents Dispatched! \n\nYour research is being generated in the background. This usually takes 30-60 seconds. You can check your Library shortly to see the final report."
        );
      } else {
        setReport(data.message || "Request sent successfully.");
      }
    } catch (e) {
      console.error("Research Error:", e);
      setStatus("error");
      setReport("Failed to connect to the research backend. Please check if the backend is running and CORS is configured.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto py-20 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-3">Agentic Intelligence</h2>
        <p className="text-gray-500">
          Autonomous AI agents researching the web for you.
        </p>
      </div>

      {!isSignedIn ? (
        <div className="bg-gray-50 p-10 rounded-xl text-center border border-dashed border-gray-300">
          <p className="text-gray-600 mb-4 font-medium">
            Please sign in to start using the research agents.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              className="flex-1 border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black transition-all"
              placeholder="Enter research topic (e.g., 'Future of Solar Energy')"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRunResearch()}
            />
            <button
              onClick={handleRunResearch}
              disabled={loading || !topic}
              className="bg-black text-white px-8 py-3 rounded-lg font-semibold disabled:bg-gray-400 hover:bg-gray-800 transition-colors"
            >
              {loading ? "Dispatching..." : "Run Research"}
            </button>
          </div>

          {report && (
            <div 
              className={`p-6 border rounded-xl shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 ${
                status === "error" ? "bg-red-50 border-red-200" : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {status === "processing" && (
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                )}
                <h3 className="font-bold text-gray-900">
                  {status === "processing" ? "Status: Researching" : "System Update"}
                </h3>
              </div>
              <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {report}
              </p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}