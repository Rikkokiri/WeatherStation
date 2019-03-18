import React, { Component } from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sensors: []
    }

    console.log('constructor')
  }

  componentDidMount() {
    console.log('App did mount')

  }


  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Dashboard</h1>
            <p>Welcome home, <strong>Pilvi</strong></p>
          </Col>

        </Row>
        <Row>
          <Col>
            <DropdownButton id="dropdown-item-button" title="Select Sensor">
              <Dropdown.Item as="button">Sensor 1</Dropdown.Item>
              <Dropdown.Item as="button">Sensor 2</Dropdown.Item>
              <Dropdown.Item as="button">Sensor 3</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
        <Row>
          <h2>Temperature</h2>
        </Row>
        <Row>
          <h2>Humidity</h2>
        </Row>
        <Row>
          <h2>Pressure</h2>
        </Row>
      </Container>
    );
  }
}

export default App;
