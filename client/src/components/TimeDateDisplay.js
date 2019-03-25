import React from 'react'
import Typography from '@material-ui/core/Typography';

var dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };

class TimeDateDisplay extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      time: new Date()
    }
  }

  // When component is inserted into the DOM
  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    )
  }

  // When component is removed from the DOM
  componentWillUnmount() {
    clearInterval(this.intervalID)
  }

  tick() {
    this.setState({
      time: new Date()
    })
  }

  render() {
    return (
      <div className="timeDateDisplay">
        <Typography variant="h2">
          {this.state.time.toLocaleString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })}
        </Typography>
        <Typography variant="h6">
          {this.state.time.toLocaleDateString('en-GB', dateOptions)}
        </Typography>
      </div>
    )
  }
}

export default TimeDateDisplay;