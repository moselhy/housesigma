/*
 * fg.js -- a content script for a minimal ManifestV3 test extension.
 */

console.log("Activating content script...try context menu!");

chrome.runtime.onMessage.addListener((req, snd, rsp) => {
  console.log(snd.tab ? "another content script says:" : "the extension says:");
  console.log(req);
  rsp("a-response-object");
});
