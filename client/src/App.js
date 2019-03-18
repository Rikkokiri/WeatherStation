import React, { Component } from 'react';

// Services
import readingsService from './services/readings'
import sensorsService from './services/sensors'

// Charts
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'

// Components
import NavBar from './components/NavBar'

// Material-UI
import { withStyles } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// --- Grid
import Grid from '@material-ui/core/Grid';

// --- Tabs
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// --- Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const styles = {
  root: {
    flexGrow: 1,
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sensors: [],
      readings: [],
      chosenReadings: [],
      selectedSensor: 'YokkilaSensor',
      currentTab: 0
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
        const relevantReadings = response.filter(reading => reading.sensorname === this.state.selectedSensor)
        this.setState({
          readings: response,
          chosenReadings: relevantReadings
        })
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

  handleTabChange = (event, value) => {
    this.setState({ currentTab: value })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <NavBar />
        <Paper>
          <Tabs
            value={this.state.currentTab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            {
              this.state.sensors.map(sensor =>
                <Tab key={sensor.name} as="button" onClick={this.selectSensor(sensor.name)} label={sensor.name} />
              )
            }
          </Tabs>
        </Paper>

        <Grid container
          spacing={8}
          alignItems="center"
          justify="center">

          <Grid item xs={12}>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <th>Date</th>
                    <th>Temperature</th>
                    <th>Pressure</th>
                    <th>Humidity</th>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    this.state.chosenReadings
                      .map(reading =>
                        <TableRow key={reading.id}>
                          <TableCell>{reading.date}</TableCell>
                          <TableCell>{reading.temperature}</TableCell>
                          <TableCell>{reading.pressure}</TableCell>
                          <TableCell>{reading.humidity}</TableCell>
                        </TableRow>
                      )
                  }
                </TableBody>
              </Table>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <h2>Temperature</h2>
            <LineChart width={400} height={400} data={this.state.chosenReadings}>
              <Line type="monotone" dataKey="temperature" stroke="#FF4455" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis type="number" domain={[20, 30]} />
              <Tooltip />
            </LineChart>
          </Grid>

          <Grid item xs={12} md={4}>
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
          </Grid>

        </Grid>
      </div >
    );
  }
}

export default withStyles(styles)(App);