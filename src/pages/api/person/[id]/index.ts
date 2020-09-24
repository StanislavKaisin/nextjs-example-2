import {
  NextApiRequest,
  NextApiResponse,
} from "next/dist/next-server/lib/utils";
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

export default async function getPersonById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await sqlite.open({
    filename: "./mydb.sqlite",
    driver: sqlite3.Database,
  });

  if (req.method === "PUT") {
    const statement = await db.prepare(
      "UPDATE person SET name = ?, email = ? where id = ?"
    );
    const result = await statement.run(
      req.body.name,
      req.body.email,
      req.query.id
    );
    // result.finalize();
  }

  const person = await db.get(
    "select id, email, name from person where id = ?",
    [req.query.id]
  );
  res.json(person);
}
