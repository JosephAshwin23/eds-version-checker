function injectScript(file_path: string, tag: string) {
    const node = document.getElementsByTagName(tag)[0];
    const script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", file_path);
    node.appendChild(script);
  }
  injectScript(chrome.runtime.getURL("contentScript.js"), "body");
  
  chrome.runtime.onMessage.addListener((message) => {
    const { data } = message;
    document.dispatchEvent(new CustomEvent("onUrlChange", { detail: data }));
});
  
