import {
  NextApiRequest,
  NextApiResponse,
} from "next/dist/next-server/lib/utils";
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

export default async function getVehicleById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await sqlite.open({
    filename: "./mydb.sqlite",
    driver: sqlite3.Database,
  });
  const vehicle = await db.get("select * from vehicle where id = ?", [
    req.query.id,
  ]);
  res.json(vehicle);
}
