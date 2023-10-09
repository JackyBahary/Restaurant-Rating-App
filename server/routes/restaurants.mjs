import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get list of restaurants
router.get("/", async (req, res) => {
  let collection = await db.collection("restaurants");
  let results = await collection.find({}).toArray();

  res.send(results).status(200);
});

// Add a new document to the collection
router.post("/", async (req, res) => {
  let collection = await db.collection("restaurants");
  let newDocument = req.body;
  let result = await collection.insertOne(newDocument);

  res.send(result).status(204);
});

// Update the restaurant
router.patch("/restaurants/:id", async (req, res) => {
  const query = { _id: ObjectId(req.params.id) };
  const updates = {
    $set: { name: req.body, rating: req.body, cost: req.body },
  };

  let collection = await db.collection("restaurants");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// Delete an entry
router.delete("/:id", async (req, res) => {
  const query = { name: req.params.id };

  const collection = db.collection("restaurants");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;
