import React from 'react'
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Login           from './Login.js'
import PartnerLogin    from './PartnerLogin.js'
import Host            from './Host.js'
import HostConfirm     from './HostConfirm.js'
import Traveler        from './Traveler.js'
import TravelerEdit    from './TravelerEdit.js'
import TravelerConfirm from './TravelerConfirm.js'

import VotingJSON from '../contracts/Voting.json'
import { withRouter } from 'react-router';

const provider = new Web3.providers.HttpProvider('http://www.blockathon.asia:8545/')
const web3 = new Web3(provider)
// const VotingContract = contract(VotingJSON)
// VotingContract.setProvider(provider)

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      candidateList: [
        { name: 'Bao', vote: 0 },
        { name: 'An', vote: 0 },
        { name: 'Dang', vote: 0 },
        { name: 'Khanh', vote: 0 },
        { name: 'Quan', vote: 0 },
      ],
    }
  }

  componentDidMount() {
    // this.state.candidateList.map((candidate, index) => {
    //   VotingContract.deployed()
    //     .then((instance) => {
    //       return instance.totalVoteFor.call(candidate.name)
    //     })
    //     .then((result) => {
    //       let arr = this.state.candidateList.map((item) => {
    //         if (item.name === candidate.name) {
    //           item.vote = result.toString()
    //         }
    //         return item
    //       })

    //       this.setState({
    //         candidateList: arr,
    //       })
    //     })
    //     .catch((err) => {
    //       console.log(err.message)
    //     })
    // })
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/'           component={withRouter(Login)}/>
          <Route path='/partner'          component={withRouter(PartnerLogin)}/>
          <Route path='/host'             component={Host}/>
          <Route path='/host-confirm'     component={HostConfirm}/>
          <Route exact path='/traveler/edit' component={withRouter(TravelerEdit)}/>
          <Route path='/traveler'         component={withRouter(Traveler)}/>
          <Route path='/traveler-confirm' component={withRouter(TravelerConfirm)}/>
        </Switch>
      </Router>
    )
  }
}
