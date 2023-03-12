
import InitDadasha, { sendCustomMessage } from './script.js'

const option = {
  siteId: '640e0b8d4321ba098ca63b31',
  clientId: '6405eeb96b477f3e04f8d86b'
}

InitDadasha(option)

const elCustom = document.querySelector('.test')

elCustom.addEventListener('click', () => {
  console.log('mon click perso')
  sendCustomMessage({
    label: 'mon click perso'
    // data: {
    //   x: 10
    //   // y: 10
    // }
  })
})
