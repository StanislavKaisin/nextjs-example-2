import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

interface VehiclesProp {
  vehiclesList: Vehicle[] | undefined;
}

interface Vehicle {
  id: number | string;
  brand: string;
  model: string;
  ownerId: number | string;
}

export default function Vehicles({ vehiclesList }: VehiclesProp) {
  // const classes = useStyles();
  return (
    <div>
      <p>Vehicles list</p>
      {/* <pre>{JSON.stringify(vehiclesList, null, 2)}</pre> */}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Model</TableCell>
              <TableCell align="right">OwnerId</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehiclesList?.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.brand}</TableCell>
                <TableCell align="right">{row.model}</TableCell>
                <TableCell align="right">{row.ownerId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

Vehicles.getInitialProps = async () => {
  //
  const resp = await fetch("http://localhost:3000/api/vehicles");
  const json = await resp.json();
  return { vehiclesList: json };
};
