import mongoose from "mongoose";
import { env } from "./env.js";

async function connectToDatabase() {
  try {
    await mongoose.connect(env.DATABASE_URL);
    console.log("MongoDB connected successfully");
  }
  catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process if the connection fails
  }
};

async function disconnectFromDatabase() {
  await mongoose.disconnect();
}

async function createConnection() {
  return mongoose.createConnection(env.DATABASE_URL);
}

async function withConnection(callback) {
  let connection = null;
  try {
    connection = await createConnection(); // Open the connection
    return await callback(connection); // Execute the callback with the connection
  }
  catch (error) {
    console.error("Error during connection:", error);
    throw error; // Rethrow the error for handling outside
  }
  finally {
    if (connection) {
      await connection.close(); // Close the connection
      console.log("MongoDB connection closed.");
    }
  }
}

export {
  connectToDatabase,
  createConnection,
  disconnectFromDatabase,
  withConnection,
};
