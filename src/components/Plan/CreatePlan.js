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
    margin: 30px 0 0;

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
    this.gotoView = this.gotoView.bind(this)
    this.gotoTraveler = this.gotoTraveler.bind(this)
  }

  gotoView() {
    this.props.history.push('/plan/view')
  }

  gotoTraveler() {
    this.props.history.push('/traveler')
  }

  render() {
    return (
      <Wrapper>
        <h2>Create Travel Plan</h2>
        <hr />

        <WrapperBlock>
          <Rs.CardTitle>Chose your Transportation</Rs.CardTitle>
          <Rs.Col sm="12">
            <Rs.FormGroup check>
              <Rs.Label check>
                <Rs.Input type="checkbox" /> Bicyle
              </Rs.Label>
              <Rs.Label check>
                <Rs.Input type="checkbox" /> Bike
              </Rs.Label>
              <Rs.Label check>
                <Rs.Input type="checkbox" /> Car
              </Rs.Label>
              <Rs.Label check>
                <Rs.Input type="checkbox" /> Train
              </Rs.Label>
              <Rs.Label check>
                <Rs.Input type="checkbox" /> Plane
              </Rs.Label>
            </Rs.FormGroup>
          </Rs.Col>
        </WrapperBlock>

        <WrapperBlock>
          <Rs.CardTitle>Chose your Place and time</Rs.CardTitle>
          <Rs.Col sm="12">
            <Rs.FormGroup>
              <Rs.Row>
                <Rs.Col sm="6">
                  <Rs.Label for="timeFrom">From</Rs.Label>
                  <Rs.Input type="text" name="timeFrom" placeholder="dd/mm/yyyy" />
                </Rs.Col>
                <Rs.Col sm="6">
                  <Rs.Label for="timeTo">To</Rs.Label>
                  <Rs.Input type="text" name="timeTo" placeholder="dd/mm/yyyy" />
                </Rs.Col>
              </Rs.Row>
            </Rs.FormGroup>

            <CustomCardRow>
              <Rs.Col sm="4">
                <Rs.Card>
                  <Rs.CardImg top width="100%" src="https://images.unsplash.com/photo-1505343011179-ffb744ab9bef?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" alt="" />
                  <Rs.CardBody>
                    <Rs.CardSubtitle>Hyatt Regency</Rs.CardSubtitle>
                  </Rs.CardBody>
                </Rs.Card>
              </Rs.Col>

              <Rs.Col sm="4">
                <Rs.Card>
                  <Rs.CardImg top width="100%" src="https://images.unsplash.com/photo-1508922450598-2f5b1193950a?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" alt="" />
                  <Rs.CardBody>
                    <Rs.CardSubtitle>Mee Mountain</Rs.CardSubtitle>
                  </Rs.CardBody>
                </Rs.Card>
              </Rs.Col>

              <Rs.Col sm="4">
                <Rs.Card>
                  <Rs.CardImg top width="100%" src="https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" alt="" />
                  <Rs.CardBody>
                    <Rs.CardSubtitle>Haiku Stairs</Rs.CardSubtitle>
                  </Rs.CardBody>
                </Rs.Card>
              </Rs.Col>

              <Rs.Col sm="4">
                <Rs.Card>
                  <Rs.CardImg top width="100%" src="https://images.unsplash.com/photo-1496153615838-861aed350146?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" alt="" />
                  <Rs.CardBody>
                    <Rs.CardSubtitle>Atlnafeadh</Rs.CardSubtitle>
                  </Rs.CardBody>
                </Rs.Card>
              </Rs.Col>

              <Rs.Col sm="4">
                <Rs.Card>
                  <Rs.CardImg top width="100%" src="https://images.unsplash.com/photo-1493540554008-8e3008329feb?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" alt="" />
                  <Rs.CardBody>
                    <Rs.CardSubtitle>Pickle Rick</Rs.CardSubtitle>
                  </Rs.CardBody>
                </Rs.Card>
              </Rs.Col>
            </CustomCardRow>
          </Rs.Col>
        </WrapperBlock>

        <WrapperBlock>
          <Rs.CardTitle>Chose your Hotel</Rs.CardTitle>
          <Rs.Col sm="12">
            <p>Base on your selected place, we recommend you some hotels.</p>
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

              <Rs.Col sm="4">
                <Rs.Card>
                  <Rs.CardImg top width="100%" src="https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" alt="" />
                  <Rs.CardBody>
                    <Rs.CardSubtitle>Dubai hotel</Rs.CardSubtitle>
                    <Rs.CardText>$1500 per night</Rs.CardText>
                  </Rs.CardBody>
                </Rs.Card>
              </Rs.Col>

              <Rs.Col sm="4">
                <Rs.Card>
                  <Rs.CardImg top width="100%" src="https://images.unsplash.com/photo-1489516408517-0c0a15662682?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" alt="" />
                  <Rs.CardBody>
                    <Rs.CardSubtitle>Atlantis hotel</Rs.CardSubtitle>
                    <Rs.CardText>$900 per night</Rs.CardText>
                  </Rs.CardBody>
                </Rs.Card>
              </Rs.Col>
            </CustomCardRow>
          </Rs.Col>
        </WrapperBlock>

        <BottomButtons>
          <Rs.Button
            outline
            color="secondary"
            onClick={this.gotoTraveler}
            style={{ marginRight: 10 }}
          >
            Cancel
          </Rs.Button>
          <Rs.Button
            type="submit"
            color="primary"
            onClick={this.gotoView}
          >
            OK
          </Rs.Button>
        </BottomButtons>
      </Wrapper>
    )
  }
}

export default CreatePlan
