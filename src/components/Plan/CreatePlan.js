import React from 'react'
import * as Rs from 'reactstrap'
import styled from 'styled-components'

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

const desArr = [
  {
    name: 'Đà Lạt',
    image: 'https://cdn3.ivivu.com/2013/09/top-5-khu-resort-da-lat-thich-hop-dua-nhau-di-tron-o-khu-ho-tuyen-lam-ivivu-14.jpg',
  },
  {
    name: 'Hà Nội',
    image: 'http://img.cdn2.vietnamnet.vn/Images/english/2016/12/23/09/20161223094029-1.jpg',
  },
  {
    name: 'Đà Nẵng',
    image: 'http://static.asiawebdirect.com/m/bangkok/portals/vietnam/shared/teasersL/da-nang/top10s/top10-da-nang-attractions/teaserMultiLarge/imageHilight/da-nang-attractions.jpg',
  }
]

const accArr = [
  {
    name: 'Balchik hotel',
    image: 'https://images.unsplash.com/photo-1440151050977-247552660a3b?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
    price: 1000,
  },
  {
    name: 'Atlantis hotel',
    image: 'https://images.unsplash.com/photo-1489516408517-0c0a15662682?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
    price: 1500,
  },
  {
    name: 'Dubai hotel',
    image: 'https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
    price: 2000,
  },
]

const meansArr = ['Bike', 'Bicyle', 'Car', 'Train', 'Plane']

const apiBase = 'http://localhost:5000'

class CreatePlan extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      means: [],
      accommodation: {},
      calendar: {
        destination: {},
        from: '',
        to: '',
      },
    }

    this.convertDate = this.convertDate.bind(this)
    this.handleAccommodationChange = this.handleAccommodationChange.bind(this)
    this.handleDestinationChange = this.handleDestinationChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.gotoView = this.gotoView.bind(this)
    this.gotoTraveller = this.gotoTraveller.bind(this)
  }

  convertDate(date) {
    const newDate = date.split('/')
    return new Date(newDate[2], newDate[1], newDate[0])
  }

  handleSubmit() {
    const header = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    // convert from/to
    this.setState({
      calendar: {
        ...this.state.calendar,
        from: this.convertDate(this.state.calendar.from),
        to: this.convertDate(this.state.calendar.to),
      }
    }, () => {
      const transportationPromise = request(`${apiBase}/api/v1/transportation`, {
        ...header,
        body: JSON.stringify({ means: this.state.means }),
      })

      const accommodationPromise = request(`${apiBase}/api/v1/accommodation`, {
        ...header,
        body: JSON.stringify(this.state.accommodation),
      })

      const callendarPromise = request(`${apiBase}/api/v1/callendar`, {
        ...header,
        body: JSON.stringify(this.state.calendar),
      })

      Promise.all([
        transportationPromise,
        accommodationPromise,
        callendarPromise,
      ]).then((response) => {
        // console.log(response)
        localStorage.setItem('transportation', JSON.stringify(response[0]))
        localStorage.setItem('accommodation', JSON.stringify(response[1]))
        localStorage.setItem('calendar', JSON.stringify(response[2]))
        this.gotoView()
      })
    })
  }

  handleCheckBoxChange(value) {
    const { means } = this.state

    if (means.includes(value)) {
      const idx = means.indexOf(value)
      const newMeans = means.slice(0, idx).concat(means.slice(idx + 1))
      this.setState({ means: newMeans })
    } else {
      this.setState({ means: [...means, value] })
    }
  }

  handleDateChange(key, value) {
    this.setState({
      calendar: {
        ...this.state.calendar,
        [key]: value,
      }
    })
  }

  handleDestinationChange(value) {
    this.setState({
      calendar: {
        ...this.state.calendar,
        destination: value,
      }
    })
  }

  handleAccommodationChange(value) {
    this.setState({
      accommodation: value,
    })
  }

  gotoView() {
    this.props.history.push('/plan/view')
  }

  gotoTraveller() {
    this.props.history.push('/traveller')
  }

  render() {
    return (
      <Wrapper>
        <h2>Create Travel Plan</h2>
        <hr />

        <WrapperBlock>
          <Rs.CardTitle>Chose your Transportation</Rs.CardTitle>
          <Rs.Col sm="12">
            <Rs.FormGroup>
              { meansArr.map((item) => (
                <Rs.Label key={item} check>
                  <Rs.Input
                    type="checkbox"
                    value={item}
                    onChange={() => this.handleCheckBoxChange(item)}
                  /> {item}
                </Rs.Label>
              ))}
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
                  <Rs.Input
                    type="text"
                    name="timeFrom"
                    placeholder="dd/mm/yyyy"
                    defaultValue="25/11/2017"
                    onChange={(e) => this.handleDateChange('from', e.target.value)}
                  />
                </Rs.Col>
                <Rs.Col sm="6">
                  <Rs.Label for="timeTo">To</Rs.Label>
                  <Rs.Input
                    type="text"
                    name="timeTo"
                    placeholder="dd/mm/yyyy"
                    defaultValue="30/11/2017"
                    onChange={(e) => this.handleDateChange('to', e.target.value)}
                  />
                </Rs.Col>
              </Rs.Row>
            </Rs.FormGroup>
            <CustomCardRow>
              { desArr.map((item, index) => (
                  <Rs.Col key={index} sm="4">
                    <Rs.Card onClick={() => this.handleDestinationChange(item)}>
                      <Rs.CardImg top width="100%" src={item.image} alt="" />
                      <Rs.CardBody>
                        <Rs.CardSubtitle>{item.name}</Rs.CardSubtitle>
                      </Rs.CardBody>
                    </Rs.Card>
                  </Rs.Col>
              ))}
            </CustomCardRow>
          </Rs.Col>
        </WrapperBlock>

        <WrapperBlock>
          <Rs.CardTitle>Chose your Hotel</Rs.CardTitle>
          <Rs.Col sm="12">
            <p>Base on your selected place, we recommend you some hotels.</p>
            <CustomCardRow>
              { accArr.map((item, index) => (
                <Rs.Col key={index} sm="4">
                  <Rs.Card onClick={() => this.handleAccommodationChange(item)}>
                    <Rs.CardImg top width="100%" src={item.image} />
                    <Rs.CardBody>
                      <Rs.CardSubtitle>{item.name}</Rs.CardSubtitle>
                      <Rs.CardText>${item.price} per night</Rs.CardText>
                    </Rs.CardBody>
                  </Rs.Card>
                </Rs.Col>
              ))}
            </CustomCardRow>
          </Rs.Col>
        </WrapperBlock>

        <BottomButtons>
          <Rs.Button
            outline
            color="secondary"
            onClick={this.gotoTraveller}
            style={{ marginRight: 10 }}
          >
            Cancel
          </Rs.Button>
          <Rs.Button
            type="submit"
            color="primary"
            onClick={this.handleSubmit}
          >
            OK
          </Rs.Button>
        </BottomButtons>
      </Wrapper>
    )
  }
}

export default CreatePlan
