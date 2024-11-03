// src/index.ts
import "reflect-metadata"; // Import metadata reflection for TypeORM.
import express from "express"; // Import the Express framework.
import cors from "cors"; // Import the CORS middleware.
import { AppDataSource } from "./data-source"; // Import the data source for database connection.
import pidRoutes from "./routes/pidRoutes"; // Import item routes.

const app = express(); // Create an instance of the Express application.
const PORT = 5000; // Define the port for the server.

app.use(cors()); // Enable CORS for all routes.
app.use(express.json()); // Parse incoming JSON requests.

app.use("/api", pidRoutes); // Register the item routes with a base path of '/api'.

AppDataSource.initialize() // Initialize the database connection.
  .then(() => {
    app.listen(PORT, () => {
      // Start the server and listen on the defined port.
      console.log(`Server running on http://localhost:${PORT}`); // Log the server URL.
    });
  })
  .catch((error) => console.log(error)); // Handle any errors during initialization.
