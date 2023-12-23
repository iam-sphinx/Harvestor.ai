var lastActiveElement = null;

const initialValue = (bottomContent) => {
  bottomContent.innerHTML = "";
  const suggestionDiv = document.createElement("div");
  suggestionDiv.classList.add("suggestion-div");
  const prompt = [
    "Request for Leave to HR.",
    "Job Application Follow-Up to Hiring Manager.",
    "Thank You Email After Interview.",
    "Project Update to Team.",
    "Client Follow-Up for Sales.",
  ];

  const promptDiv = document.createElement("div");
  promptDiv.classList.add("prompt-div");
  prompt.forEach((element) => {
    const prompt = document.createElement("div");
    prompt.classList.add("prompt-text");
    prompt.innerText = element;
    prompt.addEventListener("click", () => {
      console.log(element);
    });
    promptDiv.appendChild(prompt);
  });
  suggestionDiv.appendChild(promptDiv);
  bottomContent.appendChild(suggestionDiv);
};

let selectedTone = "";
let selectedOutputLanguage = "";
const getAllEditable = () => {
  return document.querySelectorAll("div[contenteditable=true]");
};

// Inserting Text in Active Textarea
const insertText = (text) => {
  const divElement = document.querySelector(".Am.Al.editable");
  divElement.textContent = text;
};

const createButton = async () => {
  // Create button
  const button = document.createElement("button");
  button.id = "generate-button";
  button.classList.add("generate-button");

  //thunder icon
  const thunderIconCode =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-lightning-fill" viewBox="0 0 16 16">' +
    '<path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5z"/>' +
    "</svg>";
  const thunderDiv = document.createElement("div");
  thunderDiv.classList.add("thunderDiv");
  thunderDiv.id = "thunderDiv";
  thunderDiv.innerHTML = thunderIconCode;

  thunderDiv.addEventListener("click", () => {
    const thunderMenu = document.createElement("div");
    thunderMenu.classList.add("thunderMenu");
    thunderMenu.id = "thunderMenu";

    //top bar
    const topBar = document.createElement("div");
    topBar.classList.add("topBar");
    topBar.id = "topBar";
    thunderMenu.appendChild(topBar);

    //bottom content
    const bottomContent = document.createElement("div");
    bottomContent.classList.add("bottomContent");
    bottomContent.id = "bottomContent";
    initialValue(bottomContent);
    thunderMenu.appendChild(bottomContent);

    // TopBar menu
    const toneButton = document.createElement("div");
    toneButton.innerText = "Tone";
    toneButton.classList.add("basic-btn");
    toneButton.addEventListener("click", () => {
      bottomContent.innerHTML = "";
      const toneArray = [
        { value: "Professional", content: "👨‍💻 Professional" },
        { value: "Formal", content: "👨‍💼 Formal" },
        { value: "Casual", content: "😀 Casual" },
        { value: "Apologetic", content: "🙇‍♂️ Apologetic" },
        { value: "Persuasive", content: "😇 Persuasive" },
        { value: "Congratulatory", content: "🥳 Congratulatory" },
        { value: "Encouraging", content: "⭐ Encouraging" },
        { value: "Sympathetic", content: "🥲 Sympathetic" },
        { value: "Appreciative", content: "😍 Appreciative" },
        { value: "Confident", content: "😎 Confident" },
        { value: "Assertive", content: "🤔 Assertive" },
        { value: "Thankful", content: "🙏 Thankful" },
        { value: "Empathetic", content: "🙂 Empathetic" },
      ];

      const toneDropDown = document.createElement("div");
      toneDropDown.classList.add("dropdown");

      const toneInputBox = document.createElement("input");
      toneInputBox.classList.add("inputBox");
      toneInputBox.placeholder = "Search Tones...";
      toneDropDown.appendChild(toneInputBox);

      const toneUnorderedList = document.createElement("ul");
      toneUnorderedList.classList.add("language-list");

      toneArray.forEach((element) => {
        const listItem = document.createElement("li");
        listItem.classList.add("listItem");
        listItem.innerText = element.content;
        listItem.addEventListener("click", () => {
          // Handle the click event on a list item
          toneInputBox.value = element.value;
          selectedTone = element.value;
          console.log("Selected:", element.value);
          // You can add further actions here
        });
        toneUnorderedList.appendChild(listItem);
      });

      toneInputBox.addEventListener("input", function () {
        const searchTerm = toneInputBox.value.toLowerCase();

        const listItems = toneUnorderedList.querySelectorAll("li");
        listItems.forEach((listItem) => {
          const text = listItem.innerText.toLowerCase();
          if (text.includes(searchTerm)) {
            listItem.style.display = "block";
          } else {
            listItem.style.display = "none";
          }
        });
      });

      // Append the toneUnorderedList to the toneDropDown before adding the toneDropDown to the bottomContent
      toneDropDown.appendChild(toneUnorderedList);

      bottomContent.appendChild(toneDropDown);
    });

    const languageButton = document.createElement("div");
    languageButton.innerText = "Languages";
    languageButton.classList.add("basic-btn");

    languageButton.addEventListener("click", () => {
      bottomContent.innerHTML = "";
      const languages = [
        "Czech",
        "Danish",
        "German",
        "Greek",
        "English (British)",
        "English (American)",
        "Spanish",
        "Estonian",
        "Finnish",
        "French",
        "Hungarian",
        "Indonesian",
        "Italian",
        "Japanese",
        "Lithuanian",
        "Latvian",
        "Dutch",
        "Polish",
        "Portuguese (all Portuguese varieties excluding Brazilian)",
        "Portuguese (Brazilian)",
        "Romanian",
        "Russian",
        "Slovak",
        "Slovenian",
        "Swedish",
        "Turkish",
        "Ukrainian",
        "Chinese",
        "Korean",
        "Norwegian (Bokmål)",
      ];

      const dropDown = document.createElement("div");
      dropDown.classList.add("dropdown");

      const inputBox = document.createElement("input");
      inputBox.classList.add("inputBox");
      inputBox.placeholder = "Search languages...";
      dropDown.appendChild(inputBox);

      const unorderedList = document.createElement("ul");
      unorderedList.classList.add("language-list");

      // Populate the initial list of languages
      languages.forEach((element) => {
        const listItem = document.createElement("li");
        listItem.classList.add("listItem");
        listItem.innerText = element;
        listItem.addEventListener("click", () => {
          inputBox.value = element;
          // Handle the click event on a list item
          selectedOutputLanguage = element;
          console.log("Selected:", element);
          // You can add further actions here
        });
        unorderedList.appendChild(listItem);
      });

      // Filter and display languages based on search input
      inputBox.addEventListener("input", function () {
        const searchTerm = inputBox.value.toLowerCase();

        const listItems = unorderedList.querySelectorAll("li");
        listItems.forEach((listItem) => {
          const text = listItem.innerText.toLowerCase();
          if (text.includes(searchTerm)) {
            listItem.style.display = "block";
          } else {
            listItem.style.display = "none";
          }
        });
      });
      dropDown.appendChild(unorderedList);
      bottomContent.appendChild(dropDown);
    });

    const suggestionButton = document.createElement("div");
    suggestionButton.innerText = "Suggestions";
    suggestionButton.classList.add("basic-btn");
    suggestionButton.addEventListener("click", () => {
      initialValue(bottomContent);
    });

    topBar.appendChild(suggestionButton);
    topBar.appendChild(languageButton);
    topBar.appendChild(toneButton);

    if (document.getElementById("thunderMenu") == null) {
      thunderDiv.appendChild(thunderMenu);
    }
  });

  // Add image inside button
  const img = document.createElement("img");
  // img.src = chrome.runtime.getURL("resources/icons/circlelogo.png");
  img.style.pointerEvents = "none";
  button.appendChild(img);

  // Add onclick event
  button.addEventListener("click", () => {
    var buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("buttonWrapper");
    buttonWrapper.id = "buttonWrapper";
    var settingIcon = document.createElement("div");
    settingIcon.classList.add("settingIcon");
    var settingSvgIcon =
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">' +
      '<path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>' +
      "</svg>";
    settingIcon.innerHTML = settingSvgIcon;

    const container = document.createElement("div");
    container.id = "prompt-Container";
    const closeButton = document.createElement("div");
    closeButton.classList.add("cross-btn");
    const closeSvgCode =
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">' +
      '<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>' +
      "</svg>";
    closeButton.innerHTML = closeSvgCode;

    closeButton.addEventListener("click", () => {
      if (document.getElementById("output-container") != null)
        document.getElementById("output-container").remove();
      container.remove();
      document.getElementById("wrapper").remove();
      wrapper.remove();
    });

    buttonWrapper.appendChild(closeButton);

    container.appendChild(thunderDiv);
    container.appendChild(buttonWrapper);
    // Create the input element
    const inputBox = document.createElement("input");
    inputBox.type = "text";
    inputBox.id = "first-input";
    inputBox.classList.add("first-input");
    inputBox.placeholder = "Enter Your Email Summary";
    container.appendChild(inputBox);
    // Create the button element
    const action = document.createElement("button");
    action.textContent = "Generate";
    action.classList.add("use-klevere-btn");
    action.addEventListener("click", () => {
      // sending input data to the server
      const text = document.getElementById("first-input").value;
      setButtonLoading();
      // UI TESTING CHANGES
      console.log(text);
      chrome.runtime.sendMessage({
        type: "mail",
        tone: selectedTone,
        OutputLanguage: selectedOutputLanguage,
        text,
      }); // uncomment
      // insertTextArea("TESTING"); // Remove
    });
    container.appendChild(action);
    if (document.getElementById("prompt-Container") == null) {
      lastActiveElement.appendChild(container);
    }
  });

  lastActiveElement.appendChild(button);
};

const deleteButton = () => {
  const button = document.getElementById("generate-button");
  if (button != null) button.remove();
};

const setButtonLoading = () => {
  const button = document.getElementById("generate-button");
  button.innerHTML = "<div class='spinner'></div>";

  // Remove all classes
  button.classList.remove("generate-button-error");

  // add loading class to button
  button.classList.add("generate-button-loading");
};

const setButtonError = (err) => {
  const button = document.getElementById("generate-button");
  console.log(err);
  button.innerHTML = err;

  // Remove all classes
  button.classList.remove("generate-button-loading");

  // Add error class to button
  button.classList.add("generate-button-error");
};

const setButtonLoaded = () => {
  const button = document.getElementById("generate-button");

  // Remove all classes
  button.classList.remove("generate-button-loading");
  button.classList.remove("generate-button-error");

  // Add image inside button
  const img = document.createElement("img");
  img.src = chrome.runtime.getURL("resources/icons/circlelogo.png");
  button.innerHTML = "";
  button.appendChild(img);
};

// const handleClick = (e) => {
//   // If element is GPT-3 button, do nothing
//   if (e.target.id == "generate-button") {
//     return;
//   }

//   // If element is in editable parent, create button
//   const editableDivs = getAllEditable();
//   for (const div of editableDivs) {
//     console.log(editableDivs);
//     if (div.contains(e.target)) {
//       deleteButton();
//       const tempElement = document.querySelector(
//         'div[aria-label="New Message"]'
//       );

//       lastActiveElement = tempElement;
//       createButton();
//       break;
//     }
//   }
// };

// Add event listeners
document.body.addEventListener("click", handleClick);
document.body.addEventListener("resize", deleteButton);
document.body.addEventListener("scroll", deleteButton);

function insertTextArea(text) {
  if (!document.getElementById("output-container")) {
    var container = document.createElement("div");
    container.id = "output-container";

    var textarea = document.createElement("textarea");
    textarea.id = "output-textarea";
    textarea.setAttribute("rows", "20");
    textarea.setAttribute("cols", "180");

    container.appendChild(textarea);

    var buttonsDiv = document.createElement("div");
    buttonsDiv.id = "buttons-container";

    // copy button
    var copy = document.createElement("button");
    copy.classList.add("copy-btn");
    // Create the SVG element
    var copySvgCode =
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">' +
      '<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>' +
      '<path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>' +
      "</svg>";
    copy.innerHTML = copySvgCode;
    buttonsDiv.appendChild(copy);
    copy.addEventListener("click", function () {
      textarea.select();
      document.execCommand("copy");
      console.log("copy mate");
    });
    // put button
    var put = document.createElement("button");
    put.classList.add("copy-btn");
    // Store the SVG code inside a variable
    var svgCode =
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-up" viewBox="0 0 16 16">' +
      '<path fill-rule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"/>' +
      "</svg>";
    put.innerHTML = svgCode;
    buttonsDiv.appendChild(put);
    put.addEventListener("click", function () {
      console.log("put mate");
      insertText(document.getElementById("output-textarea").value);
    });

    // regenerate button
    var regenerate = document.createElement("button");
    regenerate.classList.add("copy-btn");
    var regenerateSvgCode =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z"/></svg>';
    regenerate.innerHTML = regenerateSvgCode;
    buttonsDiv.appendChild(regenerate);
    regenerate.addEventListener("click", function () {
      chrome.runtime.sendMessage({
        type: "mail",
        tone: selectedTone,
        OutputLanguage: selectedOutputLanguage,
        text,
      });
      console.log("regenerate");
    });
    // Cross button for removal
    var removeButton = document.createElement("button");
    removeButton.textContent = "×";
    removeButton.classList.add("remove-btn");

    container.appendChild(removeButton);
    removeButton.addEventListener("click", function () {
      container.remove();
    });

    container.appendChild(buttonsDiv);
    var parentElement = document.getElementById("prompt-Container");
    console.log(parentElement);
    if (document.getElementById("output-container") == null) {
      lastActiveElement.appendChild(container);
    }
  }
  textarea.textContent = text;
}

function extractTextContent() { 
  const paragraphs = document.querySelectorAll("p");
  let content = "";

  paragraphs.forEach(function (paragraph) {
    content += paragraph.textContent + "\n";
  });

  return content;
}

chrome.runtime.onMessage.addListener((request) => {
  // error handling is left
  if (request.generate) {
    console.log(request.generate);
    insertTextArea(request.generate);
    setButtonLoaded();
  } else {
    console.log("error occured in gmail script");
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "runScraper") {
    console.log("hererere");
    // Your scraping logic here
    let scrapedContent = extractTextContent();
    // Send the scraped content back to the extension
    chrome.runtime.sendMessage({
      action: "scrapedContent",
      content: scrapedContent,
    });
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "scrapingComplete") {
    // inject button at bottom of dom
  }
});