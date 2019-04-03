import React from 'react'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts'

var dateOptions = { month: 'numeric', day: 'numeric' };
var longerDateOptions = { month: 'numeric', day: 'numeric', year: 'numeric' };

const CustomLineChart = ({ data, yDataKeys, yUnit, yDomain, xDataKey, boundaries }) => {

  return (
    <ResponsiveContainer width='90%' height={300}>
      <LineChart
        cx="50%"
        cy="50%"
        outerRadius="80%"
        data={data}>
        {
          yDataKeys.map(dataKey => <Line
            key={dataKey}
            type="monotone"
            dataKey={dataKey}
            stroke="#7D53DE"
            dot={false}
            name={dataKey.charAt(0).toUpperCase() + dataKey.slice(1)}
            unit={yUnit}
          />)
        }
        <CartesianGrid stroke="#ccc" vertical={false} />
        <XAxis dataKey={xDataKey} tick={false} type="number" domain={['dataMin', 'dataMax']} />
        <YAxis type="number" domain={yDomain} allowDecimals={false} />
        <Tooltip labelFormatter={(value) => new Date(value).toLocaleDateString('en-GB', longerDateOptions)} />
        {
          boundaries.map(boundary =>
            <ReferenceLine key={boundary} x={boundary} stroke="blue" label={new Date(boundary).toLocaleDateString('en-GB', dateOptions)} />
          )
        }
      </LineChart>
    </ResponsiveContainer>
  )
}

export default CustomLineChart