chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("setmore.com")) {
      const urlPath = tab.url.split(".com/")[1];
      const mfeName = urlPath.split("/")[0];
      let data = [];
      data.push(mfeName);
  
      if (mfeName === "settings") {
        const settingsMfe = urlPath.split("/");
        data = [settingsMfe[0]];
        if (settingsMfe.length > 1) data.push(settingsMfe[1]);
      }
  
      chrome.tabs.sendMessage(tabId, {
        data,
      });
    }
});
  