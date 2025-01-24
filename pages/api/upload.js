import pdfParse from "pdf-parse";

export const config = {
  api: {
    bodyParser: false, // Disable default body parser
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk); // Collect all the file data
    }

    const buffer = Buffer.concat(chunks);

    // Determine the file type
    const contentType = req.headers["content-type"];
    let text = "";

    if (contentType === "application/pdf") {
      const pdfData = await pdfParse(buffer);
      text = pdfData.text; // Extract text from PDF
    } else if (contentType === "text/plain") {
      text = buffer.toString("utf8"); // Handle plain text
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    res.status(200).json({ text });
  } catch (error) {
    console.error("File upload error:", error);
    res.status(500).json({ error: "Failed to process file" });
  }
}
