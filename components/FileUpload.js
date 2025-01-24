import { useState } from "react";
import axios from "axios";

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
    <div className="form-group mt-3">
      <label htmlFor="fileInput">Upload a File (PDF or Text):</label>
      <input
        type="file"
        id="fileInput"
        className="form-control"
        onChange={handleFileChange}
      />
      <button className="btn btn-primary mt-3" onClick={handleUpload}>
        Upload
      </button>
      {file && <p className="mt-2">File selected: {file.name}</p>}
    </div>
  );
}
