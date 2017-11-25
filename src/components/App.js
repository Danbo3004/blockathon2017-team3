import React from 'react'
import Web3 from 'web3'
import * as contract from 'truffle-contract'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'

import Login           from './Login.js'
import PartnerLogin    from './PartnerLogin.js'
import Host            from './Host.js'
import HostConfirm     from './HostConfirm.js'

import Traveller        from './Traveller/Traveller.js'
import TravellerEdit    from './Traveller/TravellerEdit.js'
import TravellerConfirm from './Traveller/TravellerConfirm.js'
import CreatePlan      from './Plan/CreatePlan.js'
import ViewPlan        from './Plan/ViewPlan.js'


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

const newWeb3 = checkAndInstantiateWeb3()

newWeb3.eth.getAccounts((err, accounts) => {
  if (!err) {
    console.log(accounts);
  }
})

export default class App extends React.Component {
  // componentDidMount() {
  //   this.state.candidateList.map((candidate, index) => {
  //     VotingContract.deployed()
  //       .then((instance) => {
  //         return instance.totalVoteFor.call(candidate.name)
  //       })
  //       .then((result) => {
  //         let arr = this.state.candidateList.map((item) => {
  //           if (item.name === candidate.name) {
  //             item.vote = result.toString()
  //           }
  //           return item
  //         })

  //         this.setState({
  //           candidateList: arr,
  //         })
  //       })
  //       .catch((err) => {
  //         console.log(err.message)
  //       })
  //   })
  // }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={withRouter(Login)}/>
          <Route path='/partner' component={withRouter(PartnerLogin)}/>
          <Route path='/host' component={Host}/>
          <Route path='/host-confirm' component={HostConfirm}/>
          <Route exact path='/traveller' component={withRouter(Traveller)} />
          <Route path='/traveller/edit' component={withRouter(TravellerEdit)} />
          <Route path='/traveller/confirm' component={withRouter(TravellerConfirm)} />
          <Route path='/plan/create' component={withRouter(CreatePlan)} />
          <Route path='/plan/view' component={withRouter(ViewPlan)} />
        </Switch>
      </Router>
    )
  }
}
