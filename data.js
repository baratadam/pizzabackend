import Database from "better-sqlite3";

const db = new Database("./database.sqlite");

db.prepare(
  `CREATE TABLE IF NOT EXISTS pizzas(
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    nev TEXT,
    ar INTEGER,
    leiras TEXT,
    imageURL TEXT
  )`,
).run();

export const GetAllPizza = () => {
  return db.prepare("SELECT * FROM pizzas").all();
};

export const GetPizzaById = (id) => {
  return db.prepare("SELECT * FROM pizzas WHERE Id = ?").get(id);
};

export const CreatePizza = (nev, ar, leiras, imageURL) => {
  return db
    .prepare(
      "INSERT INTO pizzas (nev, ar, leiras, imageURL) VALUES (?, ?, ?, ?)",
    )
    .run(nev, ar, leiras, imageURL);
};

export const DeletePizza = (id) => {
  return db.prepare("DELETE FROM pizzas WHERE Id = ?").run(id);
};

export const UpdatePizza = (nev, ar, leiras, imageURL, id) => {
  return db
    .prepare(
      "UPDATE pizzas SET nev = ?, ar = ?, leiras = ?, imageURL = ? WHERE Id = ?",
    )
    .run(nev, ar, leiras, imageURL, id);
};

export const PatchAr = (ar, id) => {
  return db.prepare("UPDATE pizzas SET ar = ? WHERE Id = ?").run(ar, id);
};

export default db;
