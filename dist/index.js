"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
require("reflect-metadata"); // Import metadata reflection for TypeORM.
const express_1 = __importDefault(require("express")); // Import the Express framework.
const cors_1 = __importDefault(require("cors")); // Import the CORS middleware.
const data_source_1 = require("./data-source"); // Import the data source for database connection.
const pidRoutes_1 = __importDefault(require("./routes/pidRoutes")); // Import item routes.
const app = (0, express_1.default)(); // Create an instance of the Express application.
const PORT = 5000; // Define the port for the server.
app.use((0, cors_1.default)()); // Enable CORS for all routes.
app.use(express_1.default.json()); // Parse incoming JSON requests.
app.use("/api", pidRoutes_1.default); // Register the item routes with a base path of '/api'.
data_source_1.AppDataSource.initialize() // Initialize the database connection.
    .then(() => {
    app.listen(PORT, () => {
        // Start the server and listen on the defined port.
        console.log(`Server running on http://localhost:${PORT}`); // Log the server URL.
    });
})
    .catch((error) => console.log(error)); // Handle any errors during initialization.
