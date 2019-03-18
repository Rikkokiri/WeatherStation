import React, { Component } from 'react';

// Charts
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'

// Services
import readingsService from './services/readings'
import sensorsService from './services/sensors'

// Material-UI
import AppBar from '@material-ui/core/AppBar'

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
      chosenReadings: [],
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

  selectSensor = (name) => {
    return () => {
      console.log(`Sensor ${name} is being selected`)
      const relevantReadings = this.state.readings.filter(reading => reading.sensorname === name)
      this.setState({
        selectedSensor: name,
        chosenReadings: relevantReadings
      })
    }
  }

  render() {
    return (
      <div>
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
                  this.state.sensors.map(sensor =>
                    <Dropdown.Item key={sensor.name} as="button" onClick={this.selectSensor(sensor.name)}>
                      {sensor.name}
                    </Dropdown.Item>
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
                  this.state.chosenReadings
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
            <Col>
              <h2>Temperature</h2>

              <LineChart width={400} height={400} data={this.state.chosenReadings}>
                <Line type="monotone" dataKey="temperature" stroke="#FF4455" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis type="number" domain={[20, 30]} />
                <Tooltip />
              </LineChart>
            </Col>
            <Col>
              <h2>Humidity &amp; Temperature</h2>
              <LineChart width={400} height={400} data={this.state.chosenReadings}>
                <Line type="monotone" dataKey="humidity" stroke="#FF4455" />
                <Line type="monotone" dataKey="temperature" stroke="#000" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis type="number" domain={[20, 30]} />
                <Tooltip />
                <Legend />
              </LineChart>
            </Col>
          </Row>
          <Row>
            <h2>Pressure</h2>
          </Row>
        </Container >
      </div >
    );
  }
}

export default App;
