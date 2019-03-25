import React from 'react'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts'

const CustomLineChart = ({ data, yDataKey, yUnit, yDomain, xDataKey, boundaries }) => {

  return (
    <ResponsiveContainer width='90%' height={300}>
      <LineChart
        cx="50%"
        cy="50%"
        outerRadius="80%"
        data={data}>
        <Line
          type="monotone"
          dataKey={yDataKey}
          stroke="#7D53DE"
          dot={false}
          name={yDataKey.charAt(0).toUpperCase() + yDataKey.slice(1)}
          unit={yUnit}
        />
        <CartesianGrid stroke="#ccc" vertical={false} />
        <XAxis dataKey={xDataKey} tick={false} type="number" domain={['dataMin', 'dataMax']} />
        <YAxis type="number" domain={yDomain} allowDecimals={false} />
        <Tooltip />
        {
          boundaries.map(boundary =>
            <ReferenceLine key={boundary} x={boundary} stroke="blue" label={new Date(boundary).toDateString()} />
          )
        }

      </LineChart>
    </ResponsiveContainer>
  )
}

export default CustomLineChart