const API_URL = 'http://localhost:5000/api'
const mainEl = document.querySelector('#dadasha')
// const sendCustomMessage = (option) => {
//   return {
//     ...option,
//   };
// };


const clientTimestamp = Date.now()
let eventsQueue = []
let eventMetadata = {}


const clientIdDataAttribute = mainEl.getAttribute('data-clientId')
const siteIdDataAttribute = mainEl.getAttribute('data-siteId')


if(clientIdDataAttribute && siteIdDataAttribute) {
  InitDadasha({ siteIdDataAttribute, clientIdDataAttribute})
}


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

    // element that you select
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

const sendEventBatch = ({ clientId, siteId }) => {
  const eventsToSend = [...eventsQueue]
  eventsQueue = []
  eventMetadata = { clientId, siteId, clientTimestamp }
  console.log({ events: eventsToSend, ...eventMetadata });
  (async () => {
    if(eventsToSend.length === 0){
      console.log("vide");
      return 
    }
    const response = await fetch(`${API_URL}/event`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ events: eventsToSend, ...eventMetadata }),
      parameters: {
        siteId, clientId
      }
    })

    const content = await response.text()
    console.log(content)
  })()
}

export const InitDadasha = (option) => {
  console.log(option)
  // verfification du clientId et du siteId s'ils existent
  // lancement d'un interval de x secondes qui envoie les requetes au serveur

  const eventInterval = setInterval(() => sendEventBatch(option), 5000)

  // si pas bon
  // clearInterval(eventInterval)
  // eventInterval = null

  // ensuite on lance l'event si tout est bon
}

