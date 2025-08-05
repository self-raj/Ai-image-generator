import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
   if (!prompt.trim()) {
  alert("Please enter a valid prompt.");
  return;
}
    setLoading(true);
    try {
      const res = await axios.post("https://ai-image-backend-1-l08u.onrender.com/api/generate-image", {
        prompt,
      });
      console.log(res,"Response from server:");
      

      setImageUrl(res.data.imageUrl);
      setPrompt(""); // Clear the input field after generation
    } catch (err) {
      console.error("Error generating image:", err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
           Image Generator with AI
        </h1>

        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt..."
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />

        <button
          onClick={handleGenerate}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>

        {imageUrl && (
          <div className="mt-6">
            <img
              src={imageUrl}
              alt="Generated"
              className="w-full rounded-lg shadow-lg mb-3"
            />
            <p className="text-sm text-gray-600 break-all text-center">
              <strong>Image Url:</strong><br />
              <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {imageUrl}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
