import React from 'react'
import {
  Container,
  Card,
  Row,
  Col,
  Button,
} from 'reactstrap'
import styled from 'styled-components'
import request from '../../utils/request'

const Wrapper = styled(Container)`
  max-width: 700px !important;
  margin: 40px auto;

  h2.title-profile {
    margin-bottom: 30px;
  }

  button {
    cursor: pointer;
  }
`

const UserAvatar = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const UserName = styled.span`
  font-size: 24px;
  font-weight: bold;
  display: inline-block;
  margin: 0 10px 20px 0;
`

const UserBio = styled.p`
  font-size: 16px;
  line-height: 1.5;
`

const CenterButton = styled(Row)`
  justify-content: center;
`

class Traveller extends React.Component {
  constructor(props) {
    super(props)
    const locationState = props.location.state
    this.state = {
      userAvatar: locationState ? locationState.userAvatar : 'https://s3.amazonaws.com/uifaces/faces/twitter/mlane/128.jpg',
      userName: locationState ? locationState.userName : 'Dang Kieu',
      userBio: locationState ? locationState.userBio : 'I\'ve lived in Tokyo for more than ten years, working in the fashion industry and running Tokyo Fashionista Events. This has given me many connections to amazing people and great nightlife experiences, and I\'m excited to share them both with you.',
    }

    this.gotoEdit = this.gotoEdit.bind(this)
    this.gotoCreatePlan = this.gotoCreatePlan.bind(this)
  }

  componentDidMount() {
    request('http://localhost:5000/api/v1/plans', {
      method: 'GET',
    }).then((result) => {
      console.log(result)
    })
  }

  gotoEdit() {
    this.props.history.push('/traveller/edit', {
      ...this.state,
    })
  }

  gotoCreatePlan() {
    this.props.history.push('/plan/create')
  }

  render() {
    const {
      userAvatar,
      userName,
      userBio,
    } = this.state

    return (
      <Wrapper>
        <h2 className="title-profile">Traveller Profile</h2>
        <Row>
          <Col xs="12" sm="2">
            <UserAvatar>
              <img src={userAvatar} alt={userName}/>
            </UserAvatar>
          </Col>
          <Col xs="12" sm="10">
            <UserName>{userName}</UserName>{' '}
            <Button
              outline
              color="secondary"
              onClick={this.gotoEdit}
            >
              Edit
            </Button>
            <UserBio>{userBio}</UserBio>
          </Col>
        </Row>
        <CenterButton>
          <Button
            color="primary"
            onClick={this.gotoCreatePlan}
          >
            Create Your Plan
          </Button>
        </CenterButton>
      </Wrapper>
    )
  }
}

export default Traveller
