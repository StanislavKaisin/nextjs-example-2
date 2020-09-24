import { NextApiRequest, NextApiResponse } from "next";
import { authenticated } from "./people";
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

export default authenticated(async function getAllVehicles(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await sqlite.open({
    filename: "./mydb.sqlite",
    driver: sqlite3.Database,
  });
  const vehicles = await db.all("select * from vehicle");
  res.json(vehicles);
});
