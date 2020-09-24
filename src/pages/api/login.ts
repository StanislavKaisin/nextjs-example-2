import {
  NextApiRequest,
  NextApiResponse,
} from "next/dist/next-server/lib/utils";
import { secretKey } from "../../../api/secret";
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const db = await sqlite.open({
    filename: "./mydb.sqlite",
    driver: sqlite3.Database,
  });

  if (req.method === "POST") {
    const person:
      | Person
      | undefined = await db.get("select * from person where email = ?", [
      req.body.email,
    ]);
    // console.log("person", person);
    bcrypt.compare(req.body.password, person?.password, function (
      err: any,
      result: any
    ) {
      if (!err && result) {
        const claims = { subject: person?.id, myPersonEmail: person?.email };
        const token = jwt.sign(claims, secretKey, {
          expiresIn: "1h",
        });
        res.json({ authToken: token });
        // res.json({ message: "Ok" });
      } else {
        res.json({ message: "Something Wrong" });
      }
    });
  } else {
    res.status(405).json({ message: "We only support POST method" });
  }
}

interface Person {
  email: string;
  name: string;
  id: string | number;
  password: string | null;
}
