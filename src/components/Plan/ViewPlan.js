import React from 'react'
import * as Rs from 'reactstrap'
import styled from 'styled-components'
import classnames from 'classnames'

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

class CreatePlan extends React.Component {
  constructor(props) {
    super(props)
    this.backtoCreatePlan = this.backtoCreatePlan.bind(this)
    this.gotoTraveler = this.gotoTraveler.bind(this)
  }

  backtoCreatePlan() {
    this.props.history.push('/plan/create')
  }

  gotoTraveler() {
    this.props.history.push('/traveller')
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
            onClick={this.gotoTraveler}
          >
            Create plan
          </Rs.Button>
        </BottomButtons>
      </Wrapper>
    )
  }
}

export default CreatePlan
