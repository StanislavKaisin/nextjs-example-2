import {
  NextApiRequest,
  NextApiResponse,
} from "next/dist/next-server/lib/utils";
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const bcrypt = require("bcrypt");

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await sqlite.open({
    filename: "./mydb.sqlite",
    driver: sqlite3.Database,
  });

  if (req.method === "POST") {
    bcrypt.hash(req.body.password, 10, async function (err: any, hash: any) {
      // console.log("req.body", req.body);
      // console.log("hash", hash);
      const statement = await db.prepare(
        "INSERT INTO person (name, email, password) values (?, ?, ?)"
      );
      const result = await statement.run(req.body.name, req.body.email, hash);
      // result.finalize();
      const person = await db.all(
        // "select id, email, name from person where id = ?"
        "select * from person"
      );
      res.json(person);
    });
  } else {
    res.status(405).json({ message: "We only support POST method" });
  }
}
