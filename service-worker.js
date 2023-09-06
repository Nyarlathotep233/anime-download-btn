// import axios from "./node_modules/axios/lib/axios.js";
// console.log("axios: ", axios);

// import _ from "lodash";
// console.log(_.isArray([1, 2, 3])); // true

// Send tip to content script via messaging
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.greeting === "fetch") {
    console.log("fetch: ");
    const rssLink = message.link;
    console.log("rssLink: ", rssLink);
    fetch("http://localhost:3000/qbt/addRssUrl", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        rssUrl: rssLink,
        notContainRule: "720|合集|繁体|JPTC|繁日|d+-d+|BIG5|MKV",
      }),
    })
      .then((response) => response.text())
      .then((text) => sendResponse(text))
      .catch((error) => {
        console.log("error: ", error);
      });
    // chrome.storage.local.get("axios").then(sendResponse);
    return true;
  }
});
