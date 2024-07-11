const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function runChatbot() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  let chat = model.startChat({
    history: [
      { role: "user", parts: [{ text: "Hello!" }] },
      { role: "model", parts: [{ text: "Hi there! How can I help you today?" }] },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  while (true) {
    const userPrompt = prompt("You: ");
    if (userPrompt.toLowerCase() === "quit") {
      console.log("Chatbot: Goodbye! Have a nice day.");
      break;
    }

    const result = await chat.sendMessage(userPrompt);
    const response = await result.response;
    const text = response.text();
    console.log("Chatbot:", text);
  }
}

runChatbot();
