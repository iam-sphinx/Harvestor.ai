
document.addEventListener("DOMContentLoaded", function () {
  var actionButton = document.getElementById("actionButton");
  actionButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { action: "runScraper" });
    });
  });
});