import { useState } from "react";
import FileUpload from "../components/FileUpload";
import axios from "axios";

export default function Home() {
  const [text, setText] = useState(""); // State for user input or extracted text
  const [summary, setSummary] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [summaryLength, setSummaryLength] = useState("medium"); // Default: Medium
  const [loading, setLoading] = useState(false);

  const summarizeText = async () => {
    if (!text.trim()) { // Ensure the text is not empty
      alert("Please upload a file or paste text to summarize.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/summarize", {
        text,
        summaryLength,
      });

      setSummary(response.data.summary);
      setKeyPoints(response.data.keyPoints);
    } catch (error) {
      console.error("Summarization error:", error);
      alert("Failed to summarize text.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">AI-Powered Document Summarizer</h1>
      
      <FileUpload setText={setText} />

      <div className="form-group mt-4">
        <label htmlFor="textArea">Enter or Edit Text:</label>
        <textarea
          id="textArea"
          className="form-control"
          rows="8"
          value={text}
          onChange={(e) => setText(e.target.value)} // Allow manual editing
          placeholder="Paste your text here or upload a file..."
        ></textarea>
      </div>

      <div className="form-group mt-3">
        <label htmlFor="summaryLength">Select Summary Length:</label>
        <select
          id="summaryLength"
          className="form-control"
          value={summaryLength}
          onChange={(e) => setSummaryLength(e.target.value)}
        >
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select>
      </div>

      <button
        className="btn btn-primary mt-3"
        onClick={summarizeText}
        disabled={loading}
      >
        {loading ? "Summarizing..." : "Summarize Text"}
      </button>

      {summary && (
        <div className="mt-4">
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}

      {keyPoints && (
        <div className="mt-4">
          <h3>Key Points:</h3>
          <ul>
            {keyPoints.split("\n").map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
