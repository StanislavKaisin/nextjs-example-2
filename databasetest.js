const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

async function setup() {
  // console.log("inside setup");
  // console.log("sqlite =", sqlite);
  const db = await sqlite.open({
    filename: "./mydb.sqlite",
    driver: sqlite3.Database,
  });
  await db.migrate({ force: "last" });
  // console.log("migrate");
  const people = await db.all("SELECT id, email, name from person");
  console.log("people=", JSON.stringify(people, null, 2));

  const vehicles = await db.all("SELECT * from vehicle");
  console.log("vehicles=", JSON.stringify(vehicles, null, 2));
}

setup();
