const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv")
require('events').EventEmitter.prototype._maxListeners = 100;

dotenv.config()
//initial setup -  refer (https://ai.google.dev/gemini-api/docs/get-started/tutorial?lang=node)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = "when will i die"

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();