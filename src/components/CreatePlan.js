import React from 'react'
import {
  Container,
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
  CardBody,
  CardImg,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
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

const BottomButtons = styled(Row)`
  justify-content: flex-end;
  margin: 20px 0;
`

class TravelerEdit extends React.Component {
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
    const {
      userAvatar,
      userName,
      userBio,
    } = this.state

    return (
      <Wrapper>
        <h2>Create Plan</h2>
        <Form onSubmit={this.handleConfirmEdit}>
          <Row>
            <Col xs="12" sm="12">
              <FormGroup>
                <Label for="destination">Destination</Label>
                <Input type="select" name="destination">
                  <option>Đà Nẵng</option>
                  <option>Đà Lạt</option>
                  <option>Hà Nội</option>
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="time">Time</Label>
                <Input type="date" name="time" />
              </FormGroup>
              <hr />

              <Row>
                <Col sm="4">
                  <Card>
                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="" />
                    <CardBody>
                      <CardTitle>Hotel Name</CardTitle>
                      <CardSubtitle>address</CardSubtitle>
                      <CardText>$500</CardText>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm="4">
                  <Card>
                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="" />
                    <CardBody>
                      <CardTitle>Hotel Name</CardTitle>
                      <CardSubtitle>address</CardSubtitle>
                      <CardText>$500</CardText>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm="4">
                  <Card>
                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="" />
                    <CardBody>
                      <CardTitle>Hotel Name</CardTitle>
                      <CardSubtitle>address</CardSubtitle>
                      <CardText>$500</CardText>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>

          <BottomButtons>
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
                Create
              </Button>
            </Col>
          </BottomButtons>
        </Form>
      </Wrapper>
    )
  }
}

export default TravelerEdit
