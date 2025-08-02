import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { HfInference } from "@huggingface/inference";
import { InferenceClient } from "@huggingface/inference";

dotenv.config();
const app = express();
const port = 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
const hf = new HfInference(process.env.HF_ACCESS_TOKEN);
// const hf = new HfInference(process.env.VITE_HF_ACCESS_TOKEN);
const client = new InferenceClient(process.env.HF_TOKEN);

app.post("/recipe", async (req, res) => {
    const { ingredients } = req.body;
    console.log("Received ingredients:", ingredients);

    try {
        const prompt = `Suggest a tasty recipe using: ${ingredients.join(", ")}.`;

        // const response = await hf.textGeneration({
        //     model: "mistralai/Mixtral-8x7B-v0.1",
        //     inputs: prompt,
        //     parameters: {
        //         max_new_tokens: 200,
        //         temperature: 0.7,
        //     },
        // });
const chatCompletion = await client.chatCompletion({
  model: "deepseek-ai/DeepSeek-V3-0324",
  messages: [
    {
      role: "system",
      content: "You are a helpful cooking assistant. Create delicious recipes based on the ingredients provided. Format your response in markdown with clear sections for ingredients, instructions, and cooking tips."
    },
    {
      role: "user",
      content: `I have these ingredients: ${ingredients.join(", ")}. Please suggest a tasty recipe I can make with some or all of these ingredients. You can suggest additional ingredients if needed.`,
    },
  ],
  max_tokens: 1024,
  temperature: 0.7,
});
        console.log("HF Response:", chatCompletion);

        res.json({ recipe: chatCompletion.choices[0].message.content });
    } catch (err) {
        console.error("Error calling Hugging Face:", err);
        res.status(500).json({ error: "Failed to get recipe" });
    }
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

app.listen(port, () => {
    console.log(`✅ Backend running on port ${port}`);
});
