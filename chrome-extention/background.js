function mailgenerateContent(prompt, tone, outputLanguage) {
  return fetch("http://localhost:3000/mailgenerateContent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: prompt,
      tone: tone,
      outputLanguage: outputLanguage,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Extract the reply from the response data
      const reply = data.reply;
      // Return the reply text
      return reply;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Recieves "generate-Content" message from createContent script
// Calls generateContent

chrome.runtime.onMessage.addListener(async (request) => {
  if (request.type == "mail" && request.text != null) {
    console.log("hai mai hi hu mail mote");
    // Communicate with content script to get the current text
    const prompt = request.text;
    const tone = request.tone;
    const outputLanguage = request.OutputLanguage;
    console.log(prompt);
    const nextTokens = await mailgenerateContent(prompt, tone, outputLanguage);
    // Communicate with content script to update the text
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        callerId: "ContextContent",
        generate: nextTokens,
      });
    });
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "scrapedContent") {
    // Open a prompt box or perform any other action with the scraped content
    alert(request.content);
  }
});

console.log("Background Script Injected");

