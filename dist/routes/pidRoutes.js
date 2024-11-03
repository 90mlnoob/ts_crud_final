"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/itemRoutes.ts
const express_1 = require("express");
const pidController_1 = require("../controllers/pidController");
const pidRouter = (0, express_1.Router)(); // Create a new Router instance.
pidRouter.get("/", pidController_1.returnSamplePayload); // Route for creating an item.
pidRouter.post("/create", pidController_1.createPid); // Route for creating an item.
pidRouter.get("/getPids", pidController_1.getPids); // Route for getting all items.
pidRouter.get("/getPid/:pid", pidController_1.getPid); // Route for getting a specific item by ID.
pidRouter.put("/update/:pid", pidController_1.updatePid); // Route for updating an item by ID.
pidRouter.delete("/delete/:pid", pidController_1.deletePid); // Route for deleting an item by ID.
exports.default = pidRouter; // Export the router for use in the main application.
