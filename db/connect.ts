import { AnyError, Db, MongoClient } from "mongodb";

const connection_str: string = process.env.ATLAS_URI!;
const client = new MongoClient(connection_str);

let _db: Db;

export function connectToDB(cb: (err?: AnyError) => void) {
  client.connect((err, db) => {
    if (db) {
      _db = db.db("employeeRecorder");
      console.log("Connected to MongoDB successfully");
    }
    return cb(err);
  });
}

export function getDb() {
  return _db;
}
