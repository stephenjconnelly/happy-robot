import { useState } from "react";
import FileUpload from "../components/FileUpload";
import axios from "axios";
import styles from '../styles/index.module.css';

export default function Home() {
  const [text, setText] = useState(""); 
  const [summary, setSummary] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [summaryLength, setSummaryLength] = useState("medium");
  const [loading, setLoading] = useState(false);

  const summarizeText = async () => {
    if (!text.trim()) {
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
    <div className={styles.container}>
      <h1 className={styles.title}>AI-Powered Document Summarizer</h1>
      
      <FileUpload setText={setText} />

      <textarea
        className={styles.textArea}
        rows="8"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here or upload a file..."
      ></textarea>

      <div className={styles.summaryLength}>
        <label htmlFor="summaryLength">Select Summary Length:</label>
        <select
          id="summaryLength"
          value={summaryLength}
          onChange={(e) => setSummaryLength(e.target.value)}
        >
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select>
      </div>

      <button
        className={styles.button}
        onClick={summarizeText}
        disabled={loading}
      >
        {loading ? "Summarizing..." : "Summarize Text"}
      </button>

      {summary && (
        <div className={styles.summary}>
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}

      {keyPoints && (
        <div className={styles.keyPoints}>
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