import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import config from "./config.js";

const app = express().use(cors()).use(bodyParser.json());

const GPT_API_KEY = "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";
const GPT_API_URL =
  "https://api.openai.com/v1/engines/text-davinci-003/completions";

async function makeGPTApiCall(prompt) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${GPT_API_KEY}`,
  };

  const requestBody = {
    prompt: prompt,
    max_tokens: 500,
  };

  const response = await fetch(GPT_API_URL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`API request failed with status: ${response.status}`);
  }

  return response.json();
}
app.post("/generateContent", async (req, res) => {
  try {
    console.log(`----------\n${req.body.message}\n----------`);
    const message = req.body.message;
    const tone = req.body.tone;
    const outputLanguage = req.body.outputLanguage;
    const webPageContent = req.body.webPageContent;
    let prompt = "";
    let rules = configure(config);
    let scrappedWebPage = `First, go through the following content and answer accordingly. Content - ${webPageContent}`;
    let task = "Task : Write a mail based on following summary - ";
    prompt += rules;
    prompt+=scrappedWebPage;
    prompt += task;
    prompt += message;
    prompt += `Keep the Tone :${tone}.`;
    prompt += `Output Language :${outputLanguage}.`;
    console.log(prompt);
    console.log(`--------------------`);
    let reply = await makeGPTApiCall(prompt);
    reply = reply.choices[0].text;
    console.log(`----------\n${reply}\n----------`);
    res.json({ reply });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

async function start() {
  try {
    app.listen(3000, () => {
      console.log(`Server is listening on port 3000`);
      console.log(`You may now use AI`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

// Configuration of model using plugin
function configure({ plugins }) {
  let rules = ["Please Follow these Rules to generate the response for task."];
  // Collect rules from all plugins
  for (const plugin of plugins) {
    if (plugin.rules) {
      rules = rules.concat(plugin.rules);
    }
  }
  return rules;
}

start();
