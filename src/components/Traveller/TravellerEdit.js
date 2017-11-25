import React from 'react'
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
} from 'reactstrap'
import styled from 'styled-components'

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

class TravellerEdit extends React.Component {
  constructor(props) {
    super(props)
    const locationState = props.location.state
    this.state = {
      userAvatar: locationState ? locationState.userAvatar : 'https://s3.amazonaws.com/uifaces/faces/twitter/mlane/128.jpg',
      userName: locationState ? locationState.userName : 'Dang Kieu',
      userBio: locationState ? locationState.userBio : 'I\'ve lived in Tokyo for more than ten years, working in the fashion industry and running Tokyo Fashionista Events. This has given me many connections to amazing people and great nightlife experiences, and I\'m excited to share them both with you.',
    }

    this.goBack = this.goBack.bind(this)
    this.handleChangeFor = this.handleChangeFor.bind(this)
    this.handleConfirmEdit = this.handleConfirmEdit.bind(this)
  }

  goBack() {
    this.props.history.push('/traveller')
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
    this.props.history.push('/traveller', {
      ...this.state,
    })
  }

  render() {
    const {
      userAvatar,
      userName,
      userBio,
    } = this.state

    return (
      <Wrapper>
        <h2>Traveller Profile</h2>
        <Form onSubmit={this.handleConfirmEdit}>
          <Row>
            <Col xs="12" sm="2">
              <UserAvatar>
                <img src={userAvatar} alt={userName}/>
              </UserAvatar>
            </Col>
            <Col xs="12" sm="10">
              <FormGroup>
                <Input
                  type="text"
                  name="userName"
                  onChange={this.handleChangeFor('userName')}
                  defaultValue={userName}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="textarea"
                  name="userBio"
                  rows="5"
                  onChange={this.handleChangeFor('userBio')}
                  defaultValue={userBio}
                />
              </FormGroup>
              <Row >
                <Col sm={{ size: 'auto' }}>
                  <Button
                    outline
                    color="secondary"
                    onClick={this.goBack}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col sm={{ size: 'auto' }}>
                  <Button
                    type="submit"
                    color="primary"
                  >
                    Confirm
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Wrapper>
    )
  }
}

export default TravellerEdit
