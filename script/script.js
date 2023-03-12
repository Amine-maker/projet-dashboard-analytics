const API_URL = 'http://localhost:5000/api'
const mainEl = document.querySelector('#dadasha')

const clientTimestamp = Date.now()
let eventsQueue = []
let eventMetadata = {}

const clientIdDataAttribute = mainEl.dataset.clientId
const siteIdDataAttribute = mainEl.dataset.siteId

function generateSelector (context) {
  let pathSelector

  if (context === 'null') throw new Error('not an dom reference')
  // call getIndex function
  const index = getIndex(context)
  while (context.tagName) {
    // selector path
    const classList = Array.from(context.classList)
      .map((cls) => '.' + cls)
      .join('')
    // dataset = getDataSet(context);
    pathSelector =
      context.localName +
      (classList || '') +
      // (dataset ? dataset : "") +
      (pathSelector ? '>' + pathSelector : '')
    context = context.parentNode
  }
  // selector path for nth of type
  pathSelector = pathSelector + `:nth-of-type(${index})`
  return pathSelector
}

function debounce (func, wait) {
  let timeout
  return function () {
    const context = this
    const args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}

// get index for nth of type element
const getIndex = (node) => {
  let i = 1
  const tagName = node.tagName

  while (node.previousSibling) {
    node = node.previousSibling
    if (
      node.nodeType === 1 &&
      tagName.toLowerCase() === node.tagName.toLowerCase()
    ) {
      i++
    }
  }
  return i
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    // selector output
    const output = generateSelector(e.target)

    const element = document.querySelector(output)

    const elementPayload = {
      innerText: element.innerText.slice(0, 100),
      cssSelector: output
    }
    eventsQueue.push({ type: 'click', ...elementPayload }

    )
  })

  // resize
  const resizeObserver = new ResizeObserver(debounce(entries => {
    for (const entry of entries) {
      const cr = entry.contentRect
      const { width, height } = cr
      console.log(width, height)
      eventsQueue.push({ type: 'resize', ...{ width, height } })
    }
  }, 250))

  resizeObserver.observe(document.querySelector('html'))
})

const sendEventBatch = () => {
  const eventsToSend = [...eventsQueue]
  eventsQueue = []
  console.log({ events: eventsToSend, ...eventMetadata });
  (async () => {
    if (eventsToSend.length === 0) {
      console.log('vide')
      return
    }
    const response = await sendEventToApi(eventsToSend)
    console.log(response)
  })()
}

const InitDadasha = (option) => {
  eventMetadata = { clientId: option.clientId, siteId: option.siteId, clientTimestamp }
  setInterval(() => sendEventBatch(), 5000)
}

const sendEventToApi = async (eventsToSend) => {
  const res = await fetch(`${API_URL}/event`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ events: eventsToSend, ...eventMetadata }),
    parameters: {
      siteId: eventMetadata.siteId, clientId: eventMetadata.clientId
    }
  })
  return await res.text()
}

const sendCustomMessage = (option) => {
  return eventsQueue.push({ type: 'custom', label: option.label })
}

console.log(clientIdDataAttribute && siteIdDataAttribute)

if (clientIdDataAttribute && siteIdDataAttribute) {
  InitDadasha({ siteId: siteIdDataAttribute, clientId: clientIdDataAttribute })
}

export { InitDadasha as default, sendCustomMessage }
