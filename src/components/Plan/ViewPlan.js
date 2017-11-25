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
    this.gotoTraveler = this.gotoTraveler.bind(this)
  }

  gotoTraveler() {
    this.props.history.push('/traveler')
  }

  render() {
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
              <Rs.ListGroupItem>Bicyle</Rs.ListGroupItem>
              <Rs.ListGroupItem>Bike</Rs.ListGroupItem>
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
                  <Rs.CardImg top width="100%" src="https://images.unsplash.com/photo-1496153615838-861aed350146?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" alt="" />
                  <Rs.CardBody>
                    <Rs.CardSubtitle>Atlnafeadh</Rs.CardSubtitle>
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
                  <Rs.CardImg top width="100%" src="https://images.unsplash.com/photo-1440151050977-247552660a3b?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" />
                  <Rs.CardBody>
                    <Rs.CardSubtitle>Balchik hotel</Rs.CardSubtitle>
                    <Rs.CardText>$500 per night</Rs.CardText>
                  </Rs.CardBody>
                </Rs.Card>
              </Rs.Col>
            </CustomCardRow>
          </Rs.Col>
        </Rs.Row>
        <hr />

        <BottomButtons>
          <Rs.Button
            color="primary"
            onClick={this.gotoTraveler}
          >
            OK
          </Rs.Button>
        </BottomButtons>
      </Wrapper>
    )
  }
}

export default CreatePlan
