import React from 'react'
import Typography from '@material-ui/core/Typography'

const TimeDateDisplay = () => {
  const time = new Date()
  var dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };

  return (
    <div className="timeDateDisplay">
      <Typography variant="h2">
        {time.toLocaleString(undefined, {
          hour: '2-digit',
          minute: '2-digit'
        })}
      </Typography>
      <Typography variant="h6">
        {time.toLocaleDateString('en-GB', dateOptions)}
      </Typography>
    </div>
  )
}

export default TimeDateDisplay