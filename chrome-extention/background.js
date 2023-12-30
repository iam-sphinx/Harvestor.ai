const queryAiServer = async (
  prompt,
  webPageContent,
  tone,
  outputLanguage
) => {
  return fetch("http://localhost:3000/generateContent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: prompt,
      webPageContent: webPageContent,
      tone: tone,
      outputLanguage: outputLanguage,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const reply = data.reply;
      return reply;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// Recieves "generate-Content" message from createContent script
// Calls generateContent

chrome.runtime.onMessage.addListener(async (request) => {
  if (request.text != null) {
    console.log("hai mai hi hu mail mote");
    // Communicate with content script to get the current text
    const prompt = request.text;
    const tone = request.tone;
    const outputLanguage = request.OutputLanguage;
    const webPageContent = request.webPageContent;
    console.log(prompt);
    console.log(webPageContent);
    const serverContentOutput = await queryAiServer(
      prompt,
      webPageContent,
      tone,
      outputLanguage
    );
    // Communicate with content script to update the text
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        callerId: "ContextContent",
        generate: serverContentOutput,
      });
    });
  }
});

console.log("Background Script Injected");
