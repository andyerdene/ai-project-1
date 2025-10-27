"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setImage("");

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.image) {
        setImage(data.image);
      } else {
        alert("Failed to generate image");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Text to Image Generator</h1>

      <form onSubmit={generateImage} className="w-full max-w-2xl">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt (e.g., a cat on a beach)"
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 text-lg"
        />

        <button
          type="submit"
          disabled={loading || !prompt}
          className="w-full bg-blue-500 text-white p-4 rounded-lg text-lg font-semibold hover:bg-blue-600 disabled:bg-gray-300"
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </form>

      {image && (
        <div className="mt-8 w-full max-w-2xl">
          <img
            src={image}
            alt="Generated"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
}
