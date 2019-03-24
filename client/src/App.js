import React, { Component } from 'react';

// Services
import readingsService from './services/readings'
import sensorsService from './services/sensors'

// Charts
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'

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

// --- Forms & Inputs
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Slider from '@material-ui/lab/Slider';

// --- Table
/*import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';*/

const styles = {
  root: {
    flexGrow: 1,
  },
  slider: {
    padding: '22px 0px'
  },
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sensors: [],
      readings: [],
      chosenReadings: [],
      selectedSensor: '',
      currentTab: 0,
      range: 1
    }

    console.log('constructor')
  }

  componentDidMount() {
    console.log('App did mount')

    sensorsService
      .getAll()
      .then(response => {
        console.log('Sensors promise fulfilled')
        console.log(response)
        this.setState({
          sensors: response,
          selectedSensor: response[0].name
        })
      })

    readingsService
      .getAll()
      .then(response => {
        console.log('Readings promise fulfilled')
        console.log(response)

        this.setState({
          readings: response,
        })
        this.filterReadings()
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
    this.filterReadings()
  }

  handleRangeChange = (event, value) => {
    this.setState({ range: value })
    this.filterReadings()
  }

  toMilliseconds = (days) => {
    return days * 24 * 60 * 60 * 1000
  }

  filterReadings = () => {
    // Filter by sensor
    const sensorReadings = this.state.readings.filter(reading => reading.sensorname === this.state.selectedSensor)

    // Filter by timerange
    const relevantReadings = sensorReadings.filter(reading =>
      new Date().getTime() - new Date(reading.date).getTime() <= this.toMilliseconds(this.state.range))

    this.setState({
      chosenReadings: relevantReadings
    })
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

          <Grid item xs={10} md={8}>
            <Slider
              classes={{ container: classes.slider }}
              value={this.state.range}
              min={1}
              max={14}
              step={1}
              onChange={this.handleRangeChange}
            />
            <p>{this.state.range} days</p>
          </Grid>

          <Grid item xs={12} md={5}>
            <Typography align="center" variant="h5">Temperature</Typography>

            <LineChart width={500} height={300} data={this.state.chosenReadings}>
              <Line type="monotone" dataKey="temperature" stroke="#FF4455" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis type="number" domain={[20, 30]} />
              <Tooltip />
            </LineChart>
          </Grid>

          <Grid item xs={12} md={5}>
            <Typography align="center" variant="h5">Humidity</Typography>

            <ResponsiveContainer width='100%' height={300}>
              <LineChart
                cx="50%"
                cy="50%"
                outerRadius="80%"
                data={this.state.chosenReadings}
              >
                <Line type="monotone" dataKey="humidity" stroke="#FF4455" dot={false} />
                <CartesianGrid stroke="#ccc" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis type="number" domain={[21, 28]} />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </Grid>

          <Grid item xs={12} md={5}>
            <Typography align="center" variant="h5">Humidity &amp; Temperature</Typography>

            <LineChart width={500} height={300} data={this.state.chosenReadings}>
              <Line type="monotone" dataKey="humidity" stroke="#FF4455" />
              <Line type="monotone" dataKey="temperature" stroke="#000" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis type="number" domain={[20, 30]} />
              <Tooltip />
            </LineChart>
          </Grid>

        </Grid>
      </div >
    );
  }
}

export default withStyles(styles)(App);