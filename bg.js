/*
 * bg.js -- a ManifestV3 service_worker that installs a context menu
 *          plus minimal framework for messaging between here and
 *          a content script.
 */
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "searchAndOpen",
    title: "Search on HouseSigma",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tabs) => {
  console.log("context menu clicked");
  console.log(info);
  console.log(tabs);
  fetch("https://housesigma.com/bkv2/api/search/address/suggestV2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: "Bearer 20210719lt9ldv2vfneqre4k9e3fubvc2j",
    },
    body: JSON.stringify({
      search_term: info.selectionText,
      lang: "en_US",
      province: "ON",
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      try {
        const listingId = data.data.house_list[0].id_listing;
        console.log("MLS Listing found, id: " + listingId);
        chrome.tabs.create({
          url: "https://housesigma.com/web/en/house/" + listingId,
        });
      } catch {
        console.log("Selected MLS invalid or not found on HouseSigma");
      }
    });
  //   chrome.tabs.create({
  //     url: "https://housesigma.com",
  //   });
  //   chrome.tabs.sendMessage(tabs.id, "request-object", (rsp) => {
  //     console.log("content script replies:");
  //     console.log(rsp);
  //   });
});
