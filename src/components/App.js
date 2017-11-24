import React from 'react'
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import { BrowserRouter, Route, Link } from 'react-router-dom'

import VotingJSON from '../contracts/Voting.json'

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
      // <table>
      //   <thead>
      //     <tr>
      //       <th>Candidate</th>
      //       <th>Votes</th>
      //     </tr>
      //   </thead>
      //   <tbody>
      //     {
      //       this.state.candidateList.map((candidate, index) => (
      //         <tr key={index}>
      //           <td>{candidate.name}</td>
      //           <td>{candidate.vote}</td>
      //         </tr>
      //       ))
      //     }
      //   </tbody>
      // </table>
    )
  }
}
