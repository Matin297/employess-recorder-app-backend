import express from "express";
import cors from "cors";

import { connectToDB } from "./db/connect";
import { recordRoutes } from "./routes/record";

const port = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(recordRoutes);

app.listen(port, () => {
  connectToDB((err) => {
    if (err) console.error("Failed to connect to mongodb: ", err);
  });
  console.log("Server is up and running on port:", port);
});
