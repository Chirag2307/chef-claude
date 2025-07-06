import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { HfInference } from "@huggingface/inference";
import { InferenceClient } from "@huggingface/inference";

dotenv.config();
const app = express();
const port = 5000;

app.use(cors());
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
      role: "user",
      content: "How many 'G's in 'huggingface'?",
    },
  ],
});
        console.log("HF Response:", chatCompletion);

        res.json({ recipe: chatCompletion });
    } catch (err) {
        console.error("Error calling Hugging Face:", err);
        res.status(500).json({ error: "Failed to get recipe" });
    }
});

app.listen(port, () => {
    console.log(`✅ Backend running on port ${port}`);
});
