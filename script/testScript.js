
import InitDadasha, { sendCustomMessage } from './script.js'

const option = {
  siteId: '640cc765ceb9ab57d11a352f',
  clientId: '6405eeb96b477f3e04f8d86b'
}

InitDadasha(option)

const elCustom = document.querySelector('.test')

elCustom.addEventListener('click', () => {
  console.log('mon click perso')
  sendCustomMessage({
    label: 'mon click perso',
    data: {
      // a voir quoi mettre
    }
  })
})
