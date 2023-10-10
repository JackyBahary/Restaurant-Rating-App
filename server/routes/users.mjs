import express from "express";
import db from "../db/conn.mjs";

const router = express.Router();

// Get a user
router.get("/:email/:password", async (req, res) => {
  let collection = await db.collection("restaurants");
  let query = {
    account: { email: req.params.email, password: req.params.password },
  };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

export default router;
