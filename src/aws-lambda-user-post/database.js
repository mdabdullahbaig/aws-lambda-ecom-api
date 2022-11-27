import { MongoClient } from "mongodb";

let cachedDb = null;

const mongodbConnection = async () => {
  if (cachedDb) {
    return cachedDb;
  }

  const mongoUri = process.env.MONGODB_URI;
  const databaseName = process.env.DATABASE_NAME;
  const client = await MongoClient.connect(mongoUri);
  const db = await client.db(databaseName);
  cachedDb = db;
  return db;
};

export const getDBCollection = async () => {
  const dbConnection = await mongodbConnection();
  const mongoClient = await dbConnection.collection(
    process.env.COLLECTION_NAME
  );
  return mongoClient;
};
