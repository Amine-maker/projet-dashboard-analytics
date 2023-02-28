const API_URL = "http://localhost:8080/api";

// const sendCustomMessage = (option) => {
//   return {
//     ...option,
//   };
// };

const appId = 1;
const clientId = 2;
const clientTimestamp = Date.now();

const sendResizeEvent = (resizePayload) => {
  return {
    parameters: resizePayload,
  };
};

const sendClickEvent = (clickPayload) => {
  return {
    parameters: clickPayload,
  };
};

const body = {
  appId,
  clientId,
  clientTimestamp,
};

function generateSelector(context) {
  let index, pathSelector;

  if (context === "null") throw new Error("not an dom reference");
  // call getIndex function
  index = getIndex(context);
  while (context.tagName) {
    // selector path
    let classList = Array.from(context.classList)
      .map((cls) => "." + cls)
      .join("");
    //dataset = getDataSet(context);
    pathSelector =
      context.localName +
      (classList ? classList : "") +
      //(dataset ? dataset : "") +
      (pathSelector ? ">" + pathSelector : "");
    context = context.parentNode;
  }
  // selector path for nth of type
  pathSelector = pathSelector + `:nth-of-type(${index})`;
  return pathSelector;
}

// get index for nth of type element
const getIndex = (node) => {
  let i = 1;
  let tagName = node.tagName;

  while (node.previousSibling) {
    node = node.previousSibling;
    if (
      node.nodeType === 1 &&
      tagName.toLowerCase() === node.tagName.toLowerCase()
    ) {
      i++;
    }
  }
  return i;
};

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    // selector output
    let output = generateSelector(e.target);

    console.log(output);
    // element that you select
    let element = document.querySelector(output);

    const elementPayload = {
      innerText: element.innerText.slice(0, 100),
      cssSelector: output,
    };
    sendClickEvent({ elementPayload });
    console.log(elementPayload);
  });

  // resize
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const cr = entry.contentRect;
      const { width, height } = cr;
      console.log(width, height);
      sendResizeEvent({ width, height });
    }
  });

  resizeObserver.observe(document.querySelector("html"));
});

// gestion de pile a envoyer

//setInterval(() => {
(async () => {
  const response = await fetch(`${API_URL}/sendMessage`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });

  const content = await response.text();
  console.log(content);
})();
//}, 2000);
