import express from "express";
import { ObjectId } from "mongodb";
import { getDb } from "../db/connect";

export const recordRoutes = express.Router();
const COLLECTION_NAME = "employees";

// GET the list of all records
recordRoutes.get("/record", async (req, res) => {
  try {
    const db = getDb();

    const result = await db.collection(COLLECTION_NAME).find({}).toArray();

    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// GET one record
recordRoutes.get("/record/:id", async (req, res) => {
  try {
    const db = getDb();
    const record_id = new ObjectId(req.params.id);

    const result = await db
      .collection(COLLECTION_NAME)
      .findOne({ _id: record_id });

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error?.message });
  }
});

// POST a record
recordRoutes.post("/record", async (req, res) => {
  try {
    const db = getDb();

    const error: {
      first_name?: string;
      last_name?: string;
      role?: string;
    } = {};

    if (!req.body.first_name) error.first_name = "Firstname is required";
    if (!req.body.last_name) error.last_name = "Lastname is required";
    if (!req.body.role) error.role = "role is required";

    if (Object.keys(error).length) return res.status(400).json({ error });

    const result = await db.collection(COLLECTION_NAME).insertOne(req.body);

    res.status(201).json({
      ...req.body,
      _id: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// PATCH a record
recordRoutes.patch("/record/:id", async (req, res) => {
  try {
    const record_id = req.params.id;
    const db = getDb();

    const error: {
      first_name?: string;
      last_name?: string;
      role?: string;
    } = {};

    if (req.body.first_name === "") error.first_name = "Firstname is required";
    if (req.body.last_name === "") error.last_name = "Lastname is required";
    if (req.body.role === "") error.role = "Role is required";

    if (Object.keys(error).length) return res.status(400).json({ error });

    await db
      .collection(COLLECTION_NAME)
      .updateOne({ _id: new ObjectId(record_id) }, { $set: req.body });

    res.status(200).json({
      ...req.body,
      _id: record_id,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// DELETE a record
recordRoutes.delete("/record/:id", async (req, res) => {
  const record_id = req.params.id;
  const db = getDb();

  await db
    .collection(COLLECTION_NAME)
    .deleteOne({ _id: new ObjectId(record_id) });

  res.status(200).send("Deleted the resource successfully");
});
