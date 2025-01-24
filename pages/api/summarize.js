import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text, summaryLength } = req.body;
  if (!text) {
    return res.status(400).json({ error: "No text provided for summarization" });
  }

  try {
    // Generate Summary
    const summaryResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes text."
        },
        {
          role: "user",
          content: `Summarize this text in ${summaryLength} detail:\n\n${text}`
        }
      ],
      max_tokens: summaryLength === "short" ? 50 : summaryLength === "medium" ? 150 : 300,
    });

    const summary = summaryResponse.choices[0].message.content.trim();

    // Generate Key Points
    const keyPointsResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that extracts key points from text."
        },
        {
          role: "user",
          content: `Extract the key points from the following text:\n\n${text}`
        }
      ],
      max_tokens: 200,
    });

    const keyPoints = keyPointsResponse.choices[0].message.content.trim();

    // Return both results
    res.status(200).json({ summary, keyPoints });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Failed to process text" });
  }
}