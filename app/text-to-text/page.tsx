"use client";

import { useState } from "react";

export default function TextToText() {
  const [prompt, setPrompt] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [loading, setLoading] = useState(false);

  const extractIngredients = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIngredients("");

    try {
      const response = await fetch("/api/text-to-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.text) {
        setIngredients(data.text);
      } else {
        alert("Failed to extract ingredients");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to extract ingredients");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Food Ingredient Extractor</h1>

      <form onSubmit={extractIngredients} className="w-full max-w-2xl">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a food description (e.g., A delicious pasta carbonara made with spaghetti, eggs, parmesan cheese, pancetta, and black pepper)"
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 text-lg min-h-32 resize-y"
        />

        <button
          type="submit"
          disabled={loading || !prompt}
          className="w-full bg-blue-500 text-white p-4 rounded-lg text-lg font-semibold hover:bg-blue-600 disabled:bg-gray-300"
        >
          {loading ? "Extracting..." : "Extract Ingredients"}
        </button>
      </form>

      {ingredients && (
        <div className="mt-8 w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">Extracted Ingredients:</h2>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <p className="text-lg whitespace-pre-wrap">{ingredients}</p>
          </div>
        </div>
      )}
    </div>
  );
}
