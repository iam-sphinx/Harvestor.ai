document.addEventListener("DOMContentLoaded", function () {
  var actionButton = document.getElementById("scrapeButton");
  actionButton.addEventListener("click", function () {
    console.log("asked to run scarper");
    const response = chrome.runtime.sendMessage({ action: "runScraper" });
    console.log(response);
  });
});
