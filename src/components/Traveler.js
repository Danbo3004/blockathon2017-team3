import React, { Component } from 'react'
import {
  Container,
  Card,
  Row,
  Col,
  Button,
} from 'reactstrap'
import styled from 'styled-components'

const Wrapper = styled(Container)`
  width: 700px;
  margin: 40px auto;

  h2.title-profile {
    margin-bottom: 30px;
  }
`

const UserAvatar = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
`

const UserName = styled.p`
  font-size: 24px;
  font-weight: bold;
`

const UserBio = styled.p`
  font-size: 16px;
  line-height: 1.5;
`

export default class Traveler extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userAvatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/mlane/128.jpg',
      userName: 'Dang Kieu',
      userBio: 'I\'ve lived in Tokyo for more than ten years, working in the fashion industry and running Tokyo Fashionista Events. This has given me many connections to amazing people and great nightlife experiences, and I\'m excited to share them both with you.',
      isEdit: false,
    }

    this.toggleMode = this.toggleMode.bind(this)
    this.renderProfile = this.renderProfile.bind(this)
    this.renderEdit = this.renderEdit.bind(this)
  }

  toggleMode() {
    this.setState((prevState) => ({
      isEdit: !prevState.isEdit,
    }))
  }

  renderEdit() {
    const {
      userAvatar,
      userName,
      userBio,
    } = this.state

    return (
      <Wrapper>
        <h2>Traveler Profile</h2>
        <Row noGutters>
          <Col xs="12" sm="2">
            <UserAvatar src={userAvatar} alt={userName}/>
          </Col>
          <Col xs="12" sm="10">
            <UserName>{userName}</UserName>
            <UserBio>{userBio}</UserBio>
          </Col>
        </Row>
      </Wrapper>
    )
  }

  renderProfile() {
    const {
      userAvatar,
      userName,
      userBio,
    } = this.state

    return (
      <Wrapper>
        <h2 className="title-profile">Traveler Profile</h2>
        <Row noGutters>
          <Col xs="12" sm="2">
            <UserAvatar src={userAvatar} alt={userName}/>
          </Col>
          <Col xs="12" sm="10">
            <UserName>{userName}</UserName>
            <UserBio>{userBio}</UserBio>
          </Col>
        </Row>
      </Wrapper>
    )
  }

  render() {
    const { isEdit } = this.state
    return !isEdit ? this.renderProfile() : this.renderProfile()
  }
}