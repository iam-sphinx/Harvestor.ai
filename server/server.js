import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { oraPromise } from "ora";
import config from "./config.js";
import fetchLinkedInProfile from "./Scrappers/userLinkedinScrapper.js";

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
app.post("/mailgenerateContent", async (req, res) => {
  try {
    console.log(`----------\n${req.body.message}\n----------`);
    const message = req.body.message;
    const tone = req.body.tone;
    const outputLanguage = req.body.outputLanguage;
    let prompt = "";
    let rules = configure(config);
    let task = "Task : Write a mail based on following summary - ";
    prompt += rules;
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

app.post("/linkedingenerateContent", async (req, res) => {
  try {
    console.log(`----------\n${req.body.message}\n----------`);
    const message = req.body.message;
    const tone = req.body.tone;
    const outputLanguage = req.body.outputLanguage;
    let prompt = "";
    let rules = configure(config);
    let task = "Task : Write a linkedin post based on following summary - ";
    prompt += rules;
    prompt += task;
    prompt += req.body.message;
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

app.post("/twittergenerateContent", async (req, res) => {
  try {
    console.log(`----------\n${req.body.message}\n----------`);
    let prompt = "";
    let rules = configure(config);
    let task =
      "Task : Write a tweet of less than 280 character with hashtags based on following summary :";
    prompt += rules;
    prompt += task;
    prompt += req.body.message;
    let reply = await makeGPTApiCall(prompt);
    reply = reply.choices[0].text;
    console.log(`----------\n${reply}\n----------`);
    res.json({ reply });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

app.post("/instagramgenerateContent", async (req, res) => {
  try {
    console.log(`----------\n${req.body.message}\n----------`);
    let prompt = "";
    let rules = configure(config);
    let task =
      "Task : Write a instagram post caption based on following summary : ";
    prompt += rules;
    prompt += task;
    prompt += req.body.message;
    let reply = await makeGPTApiCall(prompt);
    reply = reply.choices[0].text;
    console.log(`----------\n${reply}\n----------`);
    res.json({ reply });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

app.post("/user-linkedin", async (req, res) => {
  try {
    let prompt =
      "Write a 280 character professional connection request for linkedin based on given userdata json of receiver ";
    const profileURL = req.body.message;
    const userDataJSON = await fetchLinkedInProfile(profileURL);
    console.log(userDataJSON);
    const userDataString = JSON.stringify(userDataJSON);
    prompt += userDataString;
    const rawReply = await oraPromise(conversation.sendMessage(prompt), {
      text: prompt,
    });
    const reply = await Config.parse(rawReply.text);
    console.log(`----------\n${reply}\n----------`);
    res.json({ reply });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

app.post("/company-linkedin", async (req, res) => {
  try {
    const rawReply = await oraPromise(
      conversation.sendMessage(req.body.message),
      {
        text: req.body.message,
      }
    );
    const reply = await Config.parse(rawReply.text);
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
      console.log(`You may now use Klevere AI`);
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
