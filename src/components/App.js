import React from 'react'
import * as Web3 from 'web3'
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

import Traveler        from './Traveler/Traveler.js'
import TravelerEdit    from './Traveler/TravelerEdit.js'
import TravelerConfirm from './Traveler/TravelerConfirm.js'
import CreatePlan      from './Plan/CreatePlan.js'
import ViewPlan        from './Plan/ViewPlan.js'

// import VotingJSON from '../contracts/Voting.json'
// const provider = new Web3.providers.HttpProvider('http://www.blockathon.asia:8545/')
// const web3 = new Web3(provider)
// const VotingContract = contract(VotingJSON)
// VotingContract.setProvider(provider)

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
          <Route exact path='/'           component={withRouter(Login)}/>
          <Route path='/partner'          component={withRouter(PartnerLogin)}/>
          <Route path='/host'             component={Host}/>
          <Route path='/host-confirm'     component={HostConfirm}/>

          <Route exact path='/traveler' component={withRouter(Traveler)} />
          <Route path='/traveler/edit' component={withRouter(TravelerEdit)} />
          <Route path='/traveler/confirm' component={withRouter(TravelerConfirm)} />
          <Route path='/plan/create' component={withRouter(CreatePlan)} />
          <Route path='/plan/view' component={withRouter(ViewPlan)} />
        </Switch>
      </Router>
    )
  }
}
