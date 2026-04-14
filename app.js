import express from "express";
import {
  GetAllPizza,
  GetPizzaById,
  CreatePizza,
  DeletePizza,
  UpdatePizza,
  PatchAr,
} from "./data.js";

const app = express();

app.use(express.json());

app.get("/api/pizzak", (req, res) => {
  const pizzas = GetAllPizza();
  res.json(pizzas);
});

app.get("/api/pizzak/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "Valid ID is required" });
  }

  const pizza = GetPizzaById(id);

  if (!pizza) {
    return res.status(404).json({ error: "Pizza not found" });
  }

  res.json(pizza);
});

app.post("/api/pizzak", (req, res) => {
  const { nev, ar, leiras, imageURL } = req.body;

  if (!nev || ar == null || !leiras || !imageURL) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const result = CreatePizza(nev, ar, leiras, imageURL);

  res.status(201).json({
    id: result.lastInsertRowid,
    nev,
    ar,
    leiras,
    imageURL,
  });
});

app.delete("/api/pizzak/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "Valid ID is required" });
  }

  const result = DeletePizza(id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "Pizza not found" });
  }

  res.json({ message: "Pizza deleted" });
});

app.put("/api/pizzak/:id", (req, res) => {
  const id = Number(req.params.id);
  const { nev, ar, leiras, imageURL } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Valid ID is required" });
  }

  if (!nev || ar == null || !leiras || !imageURL) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const result = UpdatePizza(nev, ar, leiras, imageURL, id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "Pizza not found" });
  }

  res.json({ message: "Pizza updated" });
});

app.patch("/api/pizzak/:id/price", (req, res) => {
  const id = Number(req.params.id);
  const { ar } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Valid ID is required" });
  }

  if (ar == null) {
    return res.status(400).json({ error: "Price is required" });
  }

  const result = PatchAr(ar, id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "Pizza not found" });
  }

  res.json({ message: "Price updated" });
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
