const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

app.post("/search", async (req, res) => {
  const { query } = req.body;

  try {
    const prompt = `Give the 5 best current products for "${query}" as a JSON array. Each item must include: name, short description, price estimate, image URL, and a product link. Keep response clean and structured.`;

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const responseText = completion.data.choices[0].message.content;

    // Attempt to parse JSON from GPT response
    const json = JSON.parse(responseText);
    res.json(json);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Something went wrong with OpenAI request." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));