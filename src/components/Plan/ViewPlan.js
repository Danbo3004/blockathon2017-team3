import React from 'react'
import PropTypes from 'prop-types'
import * as Rs from 'reactstrap'
import styled from 'styled-components'
import classnames from 'classnames'
import { withRouter } from 'react-router-dom'
import request from '../../utils/request.js'

const Wrapper = styled(Rs.Container)`
  max-width: 700px !important;
  margin: 40px auto;

  button {
    cursor: pointer;
  }

  label {
    display: block;
  }
`

const WrapperBlock = styled(Rs.Card)`
  padding: 1.5em 1em;
  margin: 0 0 20px 0;
`

const CustomCardRow = styled(Rs.Row)`
  .card {
    cursor: pointer;
    transition: all 0.3s linear;

    img {
      width: auto;
      height: 120px;
      max-width: 100%;
    }

    &:hover {
      box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
    }

    &-body {
      padding: 20px 10px;
    }

    &-text {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5);
    }
  }
`

const BottomButtons = styled(Rs.Row)`
  justify-content: flex-end;
  margin: 20px 0;
`

const apiBase = 'http://localhost:5000/api/v1'

class ViewPlan extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      account: '',
      eth: 0,
    }

    this.toggle = this.toggle.bind(this)
    this.ethToDeposit = this.ethToDeposit.bind(this)
    this.backtoCreatePlan = this.backtoCreatePlan.bind(this)
    this.createTransaction = this.createTransaction.bind(this)
    this.gotoTraveller = this.gotoTraveller.bind(this)
  }

  toggle() {
    this.setState((prevState) => ({
      modal: !prevState.modal
    }))
  }

  backtoCreatePlan() {
    this.props.history.push('/plan/create')
  }

  ethToDeposit(value) {
    this.setState({ eth: value })
  }

  createTransaction() {
    const eth = this.state.eth
    const transportation = JSON.parse(localStorage.getItem('transportation'))
    const accommodation = JSON.parse(localStorage.getItem('accommodation'))
    const calendar = JSON.parse(localStorage.getItem('calendar'))

    request(`${apiBase}/plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        transportation: transportation._id,
        accommodation: accommodation._id,
        calendar: calendar._id,
        owner: localStorage.owner || ''
      })
    }).then(() => {
      window.contract.deployed()
        .then((instance) => {
          return instance.sendTransaction({
            from: '0xd113c526d60e472898124607fe87b87e6c8cba7e',
            to: instance.address,
            value: window.web3.toWei(eth, 'ether'),
            gas: 300000,
          })
        })
        this.props.history.push('/traveller')
    }).catch((err) => {
      console.log(err)
    })
  }

  gotoTraveller() {
    const transportation = JSON.parse(localStorage.getItem('transportation'))
    const accommodation = JSON.parse(localStorage.getItem('accommodation'))
    const calendar = JSON.parse(localStorage.getItem('calendar'))

    request(`${apiBase}/plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        transportation: transportation._id,
        accommodation: accommodation._id,
        calendar: calendar._id,
      })
    }).then((response) => {
      console.log(response)
      this.props.history.push('/traveller')
    })
  }

  render() {
    const transportation = JSON.parse(localStorage.getItem('transportation'))
    const accommodation = JSON.parse(localStorage.getItem('accommodation'))
    const calendar = JSON.parse(localStorage.getItem('calendar'))

    return (
      <Wrapper>
        <h2>Your Complete Plan</h2>
        <hr />

        <Rs.Row>
          <Rs.Col>
            <p><b>Transportation</b></p>
          </Rs.Col>
          <Rs.Col sm="12">
            <Rs.ListGroup>
              { transportation.means.map(item => (
                <Rs.ListGroupItem key={item}>{item}</Rs.ListGroupItem>)
              )}
            </Rs.ListGroup>
          </Rs.Col>
        </Rs.Row>
        <hr />

        <Rs.Row>
          <Rs.Col sm="12">
            <p><b>Time period:</b> 25/11/2017 - 10/12/2017</p>
          </Rs.Col>
          <Rs.Col sm="12">
            <CustomCardRow>
              <Rs.Col sm="4">
                <Rs.Card>
                  <Rs.CardImg top width="100%" src={calendar.destination.image} alt="" />
                  <Rs.CardBody>
                    <Rs.CardSubtitle>{calendar.destination.name}</Rs.CardSubtitle>
                  </Rs.CardBody>
                </Rs.Card>
              </Rs.Col>
            </CustomCardRow>
          </Rs.Col>
        </Rs.Row>
        <hr />

        <Rs.Row sm="12">
          <Rs.Col sm="12">
            <p><b>Hotel info</b></p>
          </Rs.Col>
          <Rs.Col sm="12">
            <CustomCardRow>
              <Rs.Col sm="4">
                <Rs.Card>
                  <Rs.CardImg top width="100%" src={accommodation.image} />
                  <Rs.CardBody>
                    <Rs.CardSubtitle>{accommodation.name}</Rs.CardSubtitle>
                    <Rs.CardText>${accommodation.price} per night</Rs.CardText>
                  </Rs.CardBody>
                </Rs.Card>
              </Rs.Col>
            </CustomCardRow>
          </Rs.Col>
        </Rs.Row>
        <hr />

        <BottomButtons>
          <Rs.Button
            outline
            color="secondary"
            onClick={this.backtoCreatePlan}
            style={{ marginRight: 10 }}
          >
            Cancel
          </Rs.Button>
          <Rs.Button
            color="primary"
            onClick={this.toggle}
          >
            Share
          </Rs.Button>
        </BottomButtons>

        <Rs.Modal isOpen={this.state.modal} toggle={this.toggle}>
          <Rs.ModalHeader toggle={this.toggle}>Share Plan</Rs.ModalHeader>
          <Rs.ModalBody>
            <Rs.FormGroup>
              <Rs.Input type="select" name="select" id="exampleSelect">
                <option>Facebook</option>
                <option>Twitter</option>
              </Rs.Input>
            </Rs.FormGroup>
            <Rs.ModalBody>
              <img
                style={{ width: '50%' }}
                src='https://i.pinimg.com/736x/14/e4/69/14e46913085f15a6f0303f915b096830--vietnam-map-vietnam-route.jpg'
              />
            </Rs.ModalBody>
            <Rs.InputGroup>
              <Rs.Input placeholder="ex: 1 ETH" onChange={(ev) => this.ethToDeposit(ev.target.value)} />
              <Rs.InputGroupButton>
                <Rs.Button onClick={this.createTransaction}>Deposit</Rs.Button>
              </Rs.InputGroupButton>
            </Rs.InputGroup>
          </Rs.ModalBody>
          {
            // <Rs.ModalFooter>
            //   <Rs.Button color="primary" onClick={this.gotoTraveller}>Submit</Rs.Button>
            // </Rs.ModalFooter>
          }
        </Rs.Modal>
      </Wrapper>
    )
  }
}

export default withRouter(ViewPlan)
