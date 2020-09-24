import {
  NextApiRequest,
  NextApiResponse,
} from "next/dist/next-server/lib/utils";
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

export default async function getAllVehiclesByPersonId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await sqlite.open({
    filename: "./mydb.sqlite",
    driver: sqlite3.Database,
  });
  const allVehiclesByPersonId = await db.all(
    "select * from vehicle where ownerId = ?",
    [req.query.id]
  );
  res.json(allVehiclesByPersonId);
}
