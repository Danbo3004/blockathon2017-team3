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
`

const CustomNav = styled(Rs.Nav)`
  margin-bottom: 20px !important;

  li {
    cursor: pointer;
  }
`

const CustomTabContent = styled(Rs.TabContent)`
  label {
    display: block;
  }
`

const CustomCardRow = styled(Rs.Row)`
  margin: 30px 0 15px;

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
    this.state = {
      activeTab: '1',
    }

    this.toggleTab = this.toggleTab.bind(this)
    this.gotoTraveler = this.gotoTraveler.bind(this)
    this.handleChangeFor = this.handleChangeFor.bind(this)
    this.handleConfirmEdit = this.handleConfirmEdit.bind(this)
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  gotoTraveler() {
    this.props.history.push('/traveler')
  }

  handleChangeFor(key) {
    return (event) => {
      this.setState({
        [key]: event.target.value,
      })
    }
  }

  handleConfirmEdit(ev) {
    ev.preventDefault()
    this.props.history.push('/traveler', {
      ...this.state,
    })
  }

  render() {
    return (
      <Wrapper>
        <h2>Create Travel Plan</h2>

        <CustomNav tabs>
          <Rs.NavItem>
            <Rs.NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggleTab('1') }}
            >
              Step 1
            </Rs.NavLink>
          </Rs.NavItem>

          <Rs.NavItem>
            <Rs.NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggleTab('2') }}
            >
              Step 2
            </Rs.NavLink>
          </Rs.NavItem>

          <Rs.NavItem>
            <Rs.NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggleTab('3') }}
            >
              Step 3
            </Rs.NavLink>
          </Rs.NavItem>
        </CustomNav>

        <CustomTabContent activeTab={this.state.activeTab}>
          <Rs.TabPane tabId="1">
            <Rs.Row>
              <Rs.Col sm="12">
                <h4>Chose your Transportation</h4>

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

                <BottomButtons>
                  <Rs.Col sm={{ size: 'auto' }}>
                    <Rs.Button
                      outline
                      color="secondary"
                      onClick={this.gotoTraveler}
                    >
                      Cancel
                    </Rs.Button>
                  </Rs.Col>
                  <Rs.Col sm={{ size: 'auto' }}>
                    <Rs.Button
                      type="submit"
                      color="primary"
                      onClick={() => { this.toggleTab('2') }}
                    >
                      Next
                    </Rs.Button>
                  </Rs.Col>
                </BottomButtons>
              </Rs.Col>
            </Rs.Row>
          </Rs.TabPane>

          <Rs.TabPane tabId="2">
            <Rs.Row>
              <Rs.Col sm="12">
                <h4>Chose your Place and time</h4>

                <Rs.FormGroup>
                  <Rs.Label for="destination">Destination</Rs.Label>
                  <Rs.Input type="select" name="destination">
                    <option>Dubai</option>
                    <option>France</option>
                    <option>Singapore</option>
                  </Rs.Input>
                </Rs.FormGroup>

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
                        <Rs.CardSubtitle>Haiku Stairs</Rs.CardSubtitle>
                      </Rs.CardBody>
                    </Rs.Card>
                  </Rs.Col>

                  <Rs.Col sm="4">
                    <Rs.Card>
                      <Rs.CardImg top width="100%" src="https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" alt="" />
                      <Rs.CardBody>
                        <Rs.CardSubtitle>Hotel Name</Rs.CardSubtitle>
                      </Rs.CardBody>
                    </Rs.Card>
                  </Rs.Col>
                </CustomCardRow>

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
                        <Rs.CardSubtitle>Haiku Stairs</Rs.CardSubtitle>
                      </Rs.CardBody>
                    </Rs.Card>
                  </Rs.Col>

                  <Rs.Col sm="4">
                    <Rs.Card>
                      <Rs.CardImg top width="100%" src="https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" alt="" />
                      <Rs.CardBody>
                        <Rs.CardSubtitle>Hotel Name</Rs.CardSubtitle>
                      </Rs.CardBody>
                    </Rs.Card>
                  </Rs.Col>
                </CustomCardRow>

                <BottomButtons>
                  <Rs.Col sm={{ size: 'auto' }}>
                    <Rs.Button
                      outline
                      color="secondary"
                      onClick={this.gotoTraveler}
                    >
                      Cancel
                    </Rs.Button>
                  </Rs.Col>
                  <Rs.Col sm={{ size: 'auto' }}>
                    <Rs.Button
                      type="submit"
                      color="primary"
                      onClick={() => { this.toggleTab('3') }}
                    >
                      Next
                    </Rs.Button>
                  </Rs.Col>
                </BottomButtons>
              </Rs.Col>
            </Rs.Row>
          </Rs.TabPane>

          <Rs.TabPane tabId="3">
            <Rs.Row>
              <Rs.Col sm="12">
                <h4>Chose your Hotel</h4>
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

                <BottomButtons>
                  <Rs.Col sm={{ size: 'auto' }}>
                    <Rs.Button
                      outline
                      color="secondary"
                      onClick={this.gotoTraveler}
                    >
                      Cancel
                    </Rs.Button>
                  </Rs.Col>
                  <Rs.Col sm={{ size: 'auto' }}>
                    <Rs.Button
                      type="submit"
                      color="primary"
                      onClick={this.gotoTraveler}
                    >
                      Create Plan
                    </Rs.Button>
                  </Rs.Col>
                </BottomButtons>
              </Rs.Col>
            </Rs.Row>
          </Rs.TabPane>
        </CustomTabContent>
      </Wrapper>
    )
  }
}

export default CreatePlan
