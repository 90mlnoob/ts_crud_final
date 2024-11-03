// src/controllers/pidController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source"; // Import the data source to access the repository.
import { Pid } from "../entity/Pid"; // Import the Pid entity.

let printOutput = false;
printOutput = true;

export const returnSamplePayload = async (req: Request, res: Response) => {
  if (printOutput) {
    console.log(req.body);
  }
  const resp = {
    ptPidNum: "Auto-generated: Number",
    ptPidShortName: "Required: String",
    companyId: "Required: String",
    caseId: "Required: Number",
    pidNotes: "Optional: String",
  };

  res.status(200).send(resp);
};

export const createPid = async (req: Request, res: Response) => {
  const pidRepository = AppDataSource.getRepository(Pid); // Get the repository for Pid.
  if (printOutput) {
    console.log("------ req.body -------");
    console.log(req.body);
  }
  const shortNameExists = await pidRepository.findOne({
    where: { ptPidShortName: req.body.ptPidShortName.toLowerCase() },
  });
  if (printOutput) {
    console.log(`Short Name Exists: ${shortNameExists}`);
  }

  if (shortNameExists === null) {
    // Create a new item instance with the request body.
    req.body.ptPidShortName = req.body.ptPidShortName.toLowerCase();
    const newPid = pidRepository.create(req.body); // Create a new item instance with the request body.
    await pidRepository.save(newPid); // Save the new item to the database.
    res.status(201).json({
      "Response Code": 200,
      Description: "PID Created successfully.",
      PID: newPid,
    }); // Respond with the created item and a 201 status code.
  } else
    res
      .status(400)
      .json({ Error: 400, ErrorDescription: "Short Name already exists" });
};

export const getPids = async (req: Request, res: Response) => {
  if (printOutput) {
    console.log(req.body);
  }
  const pidRepository = AppDataSource.getRepository(Pid); // Get the repository.
  const pids = await pidRepository.find(); // Fetch all items from the database.
  res.json(pids); // Respond with the list of items.
};

export const getPid = async (req: Request, res: Response) => {
  if (printOutput) {
    console.log(req.body);
  }
  const pidRepository = AppDataSource.getRepository(Pid); // Get the repository.
  const pid = await pidRepository.findOne({
    where: { ptPidNum: Number(req.params.pid) },
  }); // Fetch the item by ID.
  if (pid) {
    res.json(pid); // Respond with the item if found.
  } else {
    res.status(404).send({ ErrorCode: 404, ErrorDescription: "Pid not found" }); // Respond with a 404 status if not found.
  }
};

export const updatePid = async (req: Request, res: Response) => {
  if (printOutput) {
    console.log(req.body);
  }
  const pidRepository = AppDataSource.getRepository(Pid); // Get the repository.
  const pid = await pidRepository.findOne({
    where: { ptPidNum: Number(req.params.pid) },
  }); // Find the item to update.
  if (
    req.body.ptPidNum ||
    // typeof req.body.ptPidNum === "undefined" ||
    req.body.ptPidNum === null ||
    req.body.ptPidNum === "" ||
    req.body.ptPidNum === 0
  ) {
    res.status(400).send({
      ErrorCode: 400,
      ErrorDescription: "Bad Request. Key field cannot be updated.",
    });
  } else {
    if (pid) {
      pidRepository.merge(pid, req.body); // Merge the existing item with the updated data from the request.

      pid.pidNotes = pid.pidNotes
        ? `${pid.pidNotes}\n${req.body.pidNotes}`
        : req.body.pidNotes;
      console.log(pid.pidNotes);
      const result = await pidRepository.save(pid); // Save the updated item.
      res.json(result); // Respond with the updated item.
    } else {
      res
        .status(404)
        .send({ ErrorCode: 404, ErrorDescription: "Pid not found" }); // Respond with a 404 status if not found.
    }
  }
};

export const deletePid = async (req: Request, res: Response) => {
  const pidRepository = AppDataSource.getRepository(Pid); // Get the repository.
  const result = await pidRepository.delete(req.params.pid); // Delete the item by ID.
  if (result.affected === 1) {
    res.status(204).send(); // Respond with a 204 status for successful deletion.
  } else {
    res.status(404).send({ ErrorCode: 404, ErrorDescription: "Pid not found" }); // Respond with a 404 status if not found.
  }
};
