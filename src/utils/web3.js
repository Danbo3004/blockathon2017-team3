import Web3 from 'web3'

export function initWeb3(cb) {
  const newWeb3 = checkAndInstantiateWeb3()
  return newWeb3
  // newWeb3.eth.getAccounts((err, accounts) => {
  //   if (err) {
  //     alert("There was an error fetching your accounts.")
  //     return
  //   }

  //   if (accounts.length === 0) {
  //     alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
  //     return
  //   }

  // })
}

function checkAndInstantiateWeb3() {
    console.log("Instantiating web3")
    if (typeof window['web3'] !== 'undefined') {
      console.warn("Using web3 detected from external source.")
      return new Web3(window['web3'].currentProvider)
    } else {
      console.warn("No web3 detected. Falling back to http://localhost:8545.")
      return new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
    }
}
