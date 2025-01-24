import { useState } from "react";
import axios from "axios";
import styles from '../styles/index.module.css';

export default function FileUpload({ setText }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    try {
      const response = await axios.post("/api/upload", file, {
        headers: {
          "Content-Type": file.type,
        },
      });
      setText(response.data.text);
      alert("File processed successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload or process the file.");
    }
  };

  return (
    <div className={styles.fileUpload}>
      <label htmlFor="fileInput" className={styles.label}>Upload a File (PDF or Text):</label>
      <input
        type="file"
        id="fileInput"
        className={styles.input}
        onChange={handleFileChange}
      />
      <button className={styles.button} onClick={handleUpload}>
        Upload
      </button>
      {file && <p className={styles.fileInfo}>File selected: {file.name}</p>}
    </div>
  );
}