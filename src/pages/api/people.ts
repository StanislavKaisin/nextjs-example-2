import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { secretKey } from "../../../api/secret";
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const jwt = require("jsonwebtoken");

export const authenticated = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // const token = req.headers.authorization!;
  const token = req.cookies.authToken!;
  jwt.verify(token, secretKey, async function (err: any, decoded: any) {
    if (!err && decoded) {
      return await fn(req, res);
    }
    // err
    // decoded undefined
    res.status(401).json({ message: "Sorry you are not authenticated" });
  });
};

// module.exports = handleErrors(async (req, res) => {
//   throw new Error('What happened here?')
// })

export default authenticated(async function getAllPeople(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await sqlite.open({
    filename: "./mydb.sqlite",
    driver: sqlite3.Database,
  });
  const people = await db.all("select id, email, name from person");
  res.json(people);
});
