import express from "express";
import db from "../db/conn.mjs";

const router = express.Router();

// Get a user
router.get("/:email/:password", async (req, res) => {
  let collection = await db.collection("users");
  let query = {
    email: req.params.email,
    password: req.params.password,
  };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Add a new document to the collection
router.post("/:email", async (req, res) => {
  let collection = await db.collection("users");
  let query = {
    email: req.params.email,
  };
  let duplicate = await collection.findOne(query); // Check if email is already used
  if (duplicate) {
    res.sendStatus(400); // If duplicate email found, send error as response
  } else {
    let newDocument = req.body;
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204); // Else send result as success
  }
});

// Update user
router.patch("/:id", async (req, res) => {
  const query = { id: parseInt(req.params.id) };
  const updates = {
    $set: {
      date: req.body.date,
      email: req.body.email,
      password: req.body.password,
      fname: req.body.fname,
      lname: req.body.lname,
      birthDate: req.body.birthDate,
      phone: req.body.phone,
    },
  };

  let collection = await db.collection("users");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// Delete a user
router.delete("/:id", async (req, res) => {
  const query = { id: parseInt(req.params.id) };

  const collection = db.collection("users");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;
