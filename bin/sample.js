"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("node:readline"));
const openai_1 = require("openai");
const identity_1 = require("@azure/identity");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
console.log("Loaded API version:", process.env.AZURE_OPENAI_API_VERSION);
// Ensure required environment variables are set
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const modelName = process.env.AZURE_OPENAI_MODEL;
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
const apiVersion = process.env.AZURE_OPENAI_API_VERSION;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Ask the chatbot (type 'exit' to quit): " // Prompt for user input
});
// Initialize chat history with a system message
const chatHistory = [
    { role: "system", content: "You are a helpful assistant." }
];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const credential = new identity_1.DefaultAzureCredential();
        const scope = "https://cognitiveservices.azure.com/.default";
        const azureADTokenProvider = (0, identity_1.getBearerTokenProvider)(credential, scope);
        const client = new openai_1.AzureOpenAI({ endpoint, azureADTokenProvider, deployment, apiVersion });
        rl.prompt(); // Display the prompt for user input
        rl.on("line", (userInput) => __awaiter(this, void 0, void 0, function* () {
            if (userInput.trim().toLowerCase() === "exit") {
                rl.close();
                return;
            }
            chatHistory.push({ role: "user", content: userInput });
            try {
                const response = yield client.chat.completions.create({
                    messages: chatHistory,
                    max_tokens: 4096,
                    temperature: 1,
                    top_p: 1,
                    model: modelName
                });
                const reply = response.choices[0].message.content;
                console.log("\nChatbot:", reply);
                chatHistory.push({ role: "assistant", content: reply !== null && reply !== void 0 ? reply : "" });
            }
            catch (err) {
                console.error("The sample encountered an error:", err);
            }
            rl.prompt();
        }));
        rl.on("close", () => {
            console.log("Chat session ended.");
            process.exit(0);
        });
    });
}
main();
