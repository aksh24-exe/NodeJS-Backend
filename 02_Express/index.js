import express from "express";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());

let teaData = [];
let nextID = 1;

app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextID, name, price };
  teaData.push(newTea);
  nextID++;
  res.status(201).json(newTea);
});

app.get("/teas", (req, res) => {
  res.json(teaData);
});

app.get("/teas/:id", (req, res) => {
  const id = req.params.id;
  const tea = teaData.find((t) => t.id === parseInt(id));
  res.json(tea);
});

app.put("/tea/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const tea = teaData.find((t) => t.id === parseInt(id));
  tea.name = name;
  tea.price = price;
  res.send(200).json(tea);
});

app.delete("/tea/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    res.status(404).send("Tea not found");
  }
  teaData.splice(index, 1);
  return res.status(200).send("Deleted");
});

app.listen(PORT, () => {
  console.log(`Server is listining at http://localhost:${PORT}`);
});
