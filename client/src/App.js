import React, { Component } from 'react';

// Services
import readingsService from './services/readings'
import sensorsService from './services/sensors'

// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import Table from 'react-bootstrap/Table'


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sensors: [],
      readings: [],
      selectedSensor: 'HomeSensor'
    }

    console.log('constructor')
  }

  componentDidMount() {
    console.log('App did mount')

    sensorsService
      .getAll()
      .then(response => {
        console.log('Promise fulfilled')
        console.log(response)
        this.setState({ sensors: response })
      })

    readingsService
      .getAll()
      .then(response => {
        console.log('Promise fulfilled')
        console.log(response)
        this.setState({ readings: response })
      })
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
              {
                this.state.sensors.filter(reading => reading.sensorname === this.state.selectedSensor).map(sensor =>
                  <Dropdown.Item key={sensor.name} as="button">{sensor.name}</Dropdown.Item>
                )
              }
            </DropdownButton>
          </Col>
        </Row>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Temperature</th>
                <th>Pressure</th>
                <th>Humidity</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.readings.filter(reading => reading.sensorname === this.state.selectedSensor)
                  .map(reading =>
                    <tr key={reading.id}>
                      <td>{reading.date}</td>
                      <td>{reading.temperature}</td>
                      <td>{reading.pressure}</td>
                      <td>{reading.humidity}</td>
                    </tr>
                  )
              }
            </tbody>
          </Table>
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
