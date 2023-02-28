// const API_URL = "";

// const sendCustomMessage = (option) => {
//   return {
//     ...option,
//   };
// };

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

// const getDataSet = (node) => {
//   if (!node.dataset) return;

//   return node.dataset;
// };

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
