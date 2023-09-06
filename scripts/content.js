function insertAfter(newElement, targetElement) {
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}

function btn(rssLink) {
  const resultElement = document.createElement("button");
  resultElement.textContent = `在 qbit 上订阅`;
  resultElement.classList.add("el-button", "el-button--mini");
  resultElement.style.marginLeft = "6px";

  resultElement.addEventListener("click", async () => {
    console.log("click btn:  ");

    const res = await chrome.runtime.sendMessage({
      greeting: "fetch",
      link: rssLink,
    });
    console.log("res: ", res);
  });

  return resultElement;
}

const rssBtnList = document.querySelectorAll(".mikan-rss");
console.log("rssBtnList: ", rssBtnList);

if (rssBtnList.length) {
  // // Support for API reference docs
  // const heading = rssBtn.querySelector("h1");
  // const date = rssBtn.querySelector("time")?.parentNode;
  // (date ?? heading).insertAdjacentElement("afterend", btn());

  rssBtnList.forEach((rssBtn) => {
    const path = rssBtn.getAttribute("href");
    console.log("path: ", path);
    insertAfter(btn("https://mikanani.me" + path), rssBtn);
  });
}
