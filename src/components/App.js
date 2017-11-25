import React from 'react'
import PropTypes from 'prop-types'
import contract from 'truffle-contract'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'

import { initWeb3 } from '../utils/web3.js'
import ContractJSON from '../contracts/P2Gether.json'

import Login           from './Login.js'
import PartnerLogin    from './PartnerLogin.js'
import Host            from './Host.js'
import HostConfirm     from './HostConfirm.js'

import Traveller        from './Traveller/Traveller.js'
import TravellerEdit    from './Traveller/TravellerEdit.js'
import TravellerConfirm from './Traveller/TravellerConfirm.js'
import CreatePlan      from './Plan/CreatePlan.js'
import ViewPlan        from './Plan/ViewPlan.js'

window.web3 = initWeb3()
window.contract = contract(ContractJSON)
window.contract.setProvider(web3.currentProvider)

class App extends React.Component {
  constructor(props) {
    super(props)
    localStorage.origin = location.origin
  }
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

export default App
