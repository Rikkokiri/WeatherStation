import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const SensorTable = ({ sensors }) => {
  return (
    <Fragment>
      <Typography variant="h5">Sensors</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <th>Sensorname</th>
            <th>First online</th>
            <th>Last online</th>
          </TableRow>
        </TableHead>
        <TableBody>
          {sensors.map((sensor) => (
            <TableRow key={sensor._id}>
              <TableCell>{sensor.name}</TableCell>
              <TableCell>
                {new Date(sensor.firstonline).toLocaleString('fi-FI')}
              </TableCell>
              <TableCell>
                {new Date(sensor.lastonline).toLocaleString('fi-FI')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
};

export default SensorTable;
