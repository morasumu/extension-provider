const createProvider = require('../')
const Web3 = require('web3')
const provider = createProvider()

renderText('Loading...')

if (provider) {
  const web3 = new Web3(provider)

  renderText('MetaMask provider detected.')

  web3.eth.requestAccounts()
    .then((accounts) => {
      renderText(`Detected MetaMask account ${accounts[0]}`)
    })
    .catch((e) => {
      renderText(`Failed: ${e.message}`)
    })

  provider.on('error', (error) => {
    if (error && error.includes('lost connection')) {
      renderText('Lost connection.')
    }
  })
} else {
  renderText('MetaMask provider not detected.')
}

function renderText(text) {
  content.innerText = text
}
