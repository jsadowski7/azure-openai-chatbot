import * as readline from "node:readline";
import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

console.log("Loaded API version:", process.env.AZURE_OPENAI_API_VERSION);

// Ensure required environment variables are set
const endpoint = process.env.AZURE_OPENAI_ENDPOINT!;
const modelName = process.env.AZURE_OPENAI_MODEL!;
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT!;
const apiVersion = process.env.AZURE_OPENAI_API_VERSION!;

const rl = readline.createInterface({ // Use readline to handle user input
  input: process.stdin, 
  output: process.stdout, 
  prompt: "Ask the chatbot (type 'exit' to quit): " // Prompt for user input
});

// Initialize chat history with a system message
const chatHistory: { role: "system" | "user" | "assistant"; content: string }[] = [
  { role: "system", content: "You are a helpful assistant." }
];

async function main() { // Main function to run the chatbot
  const credential = new DefaultAzureCredential(); 
  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(credential, scope);
  const client = new AzureOpenAI({ endpoint, azureADTokenProvider, deployment, apiVersion });

  rl.prompt(); // Display the prompt for user input

  rl.on("line", async (userInput) => {
    if (userInput.trim().toLowerCase() === "exit") {
      rl.close();
      return;
    }

    chatHistory.push({ role: "user", content: userInput });

    try {
      const response = await client.chat.completions.create({
        messages: chatHistory,
        max_tokens: 4096,
        temperature: 1,
        top_p: 1,
        model: modelName
      });

      const reply = response.choices[0].message.content;
      console.log("\nChatbot:", reply);
      chatHistory.push({ role: "assistant", content: reply ?? "" });
    } catch (err) {
      console.error("The sample encountered an error:", err);
    }

    rl.prompt();
  });

  rl.on("close", () => {
    console.log("Chat session ended.");
    process.exit(0);
  });
}

main();
