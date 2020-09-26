import {
  NextApiRequest,
  NextApiResponse,
} from "next/dist/next-server/lib/utils";
import { secretKey } from "../../../api/secret";
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import cookie from "cookie";

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
    // console.log("req.body=", req.body);
    // console.log("person", person);
    bcrypt.compare(req.body.password, person?.password, function (
      err: any,
      result: any
    ) {
      // console.log("err=", err);
      if (!err && result) {
        // console.log("person=", person);
        const claims = { subject: person?.id, myPersonEmail: person?.email };
        const token = jwt.sign(claims, secretKey, {
          expiresIn: "1h",
        });
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 3600,
            path: "/",
          })
        );
        // res.json({ authToken: token });
        res.json({ message: "Welcome back to the app!" });
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
