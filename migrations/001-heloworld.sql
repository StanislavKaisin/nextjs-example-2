-- Up
CREATE TABLE Person(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  password TEXT
);

CREATE TABLE Vehicle(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  brand TEXT,
  model TEXT,
  ownerId INTEGER REFERENCES Person(id)
);

INSERT INTO Person (name, email) values ('bruno', 'bruno@bruno.pt');
INSERT INTO Person (name, email) values ('jack', 'jack@bruno.pt');

INSERT INTO Vehicle (brand, model, ownerId) values ('audi', 'R8', 1);
INSERT INTO Vehicle (brand, model, ownerId) values ('audi', 'R7', 1);
INSERT INTO Vehicle (brand, model, ownerId) values ('mercedes', 'benz', 2);


-- Down
DROP TABLE Person;
DROP TABLE Vehicle
