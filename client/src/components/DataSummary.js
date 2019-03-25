import React from 'react'
import Typography from '@material-ui/core/Typography';

const calculateAverage = (array, dataKey) => {
  const sum = array.reduce(function (acc, val) { return acc + val[dataKey] }, 0)
  return Math.round(sum / array.length * 100) / 100;
}

const DataSummary = ({ data, boundaries }) => {

  return (
    <div>
      <Typography variant="h5">Data Summary</Typography>
      <ul>
        <li key="datapoints">{data.length} data points over {boundaries.length} days</li>
        <li key="temp">Average temperature {calculateAverage(data, "temperature")}</li>
        <li key="hum">Average humidity {calculateAverage(data, "humidity")}</li>
      </ul>
    </div>
  )
}

export default DataSummary