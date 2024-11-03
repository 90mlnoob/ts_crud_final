// src/routes/itemRoutes.ts
import { Router } from "express";
import {
  createPid,
  getPids,
  getPid,
  updatePid,
  deletePid,
  returnSamplePayload,
} from "../controllers/pidController";

const pidRouter = Router(); // Create a new Router instance.

pidRouter.get("/", returnSamplePayload); // Route for creating an item.
pidRouter.post("/create", createPid); // Route for creating an item.
pidRouter.get("/getPids", getPids); // Route for getting all items.
pidRouter.get("/getPid/:pid", getPid); // Route for getting a specific item by ID.
pidRouter.put("/update/:pid", updatePid); // Route for updating an item by ID.
pidRouter.delete("/delete/:pid", deletePid); // Route for deleting an item by ID.

export default pidRouter; // Export the router for use in the main application.
