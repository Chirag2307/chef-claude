import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post("/recipe", async (req, res) => {
    const { ingredients } = req.body;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful cooking assistant. Create delicious recipes based on the ingredients provided. Format your response in markdown with clear sections for ingredients, instructions, and cooking tips."
                },
                {
                    role: "user",
                    content: `I have these ingredients: ${ingredients.join(", ")}. Please suggest a tasty recipe I can make with some or all of these ingredients. You can suggest additional ingredients if needed.`
                }
            ],
            max_tokens: 1024,
            temperature: 0.7,
        });

        res.json({ recipe: response.choices[0].message.content });
    } catch (err) {
        console.error("Error calling OpenAI:", err.message);
        res.status(500).json({ error: "Failed to get recipe" });
    }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(port, () => {
    console.log(`✅ Backend running on port ${port}`);
});
