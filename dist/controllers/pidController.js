"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePid = exports.updatePid = exports.getPid = exports.getPids = exports.createPid = exports.returnSamplePayload = void 0;
const data_source_1 = require("../data-source"); // Import the data source to access the repository.
const Pid_1 = require("../entity/Pid"); // Import the Pid entity.
let printOutput = false;
printOutput = true;
const returnSamplePayload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.returnSamplePayload = returnSamplePayload;
const createPid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pidRepository = data_source_1.AppDataSource.getRepository(Pid_1.Pid); // Get the repository for Pid.
    if (printOutput) {
        console.log("------ req.body -------");
        console.log(req.body);
    }
    const shortNameExists = yield pidRepository.findOne({
        where: { ptPidShortName: req.body.ptPidShortName.toLowerCase() },
    });
    if (printOutput) {
        console.log(`Short Name Exists: ${shortNameExists}`);
    }
    if (shortNameExists === null) {
        // Create a new item instance with the request body.
        req.body.ptPidShortName = req.body.ptPidShortName.toLowerCase();
        const newPid = pidRepository.create(req.body); // Create a new item instance with the request body.
        yield pidRepository.save(newPid); // Save the new item to the database.
        res.status(201).json({
            "Response Code": 200,
            Description: "PID Created successfully.",
            PID: newPid,
        }); // Respond with the created item and a 201 status code.
    }
    else
        res
            .status(400)
            .json({ Error: 400, ErrorDescription: "Short Name already exists" });
});
exports.createPid = createPid;
const getPids = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (printOutput) {
        console.log(req.body);
    }
    const pidRepository = data_source_1.AppDataSource.getRepository(Pid_1.Pid); // Get the repository.
    const pids = yield pidRepository.find(); // Fetch all items from the database.
    res.json(pids); // Respond with the list of items.
});
exports.getPids = getPids;
const getPid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (printOutput) {
        console.log(req.body);
    }
    const pidRepository = data_source_1.AppDataSource.getRepository(Pid_1.Pid); // Get the repository.
    const pid = yield pidRepository.findOne({
        where: { ptPidNum: Number(req.params.pid) },
    }); // Fetch the item by ID.
    if (pid) {
        res.json(pid); // Respond with the item if found.
    }
    else {
        res.status(404).send({ ErrorCode: 404, ErrorDescription: "Pid not found" }); // Respond with a 404 status if not found.
    }
});
exports.getPid = getPid;
const updatePid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (printOutput) {
        console.log(req.body);
    }
    const pidRepository = data_source_1.AppDataSource.getRepository(Pid_1.Pid); // Get the repository.
    const pid = yield pidRepository.findOne({
        where: { ptPidNum: Number(req.params.pid) },
    }); // Find the item to update.
    if (req.body.ptPidNum ||
        // typeof req.body.ptPidNum === "undefined" ||
        req.body.ptPidNum === null ||
        req.body.ptPidNum === "" ||
        req.body.ptPidNum === 0) {
        res.status(400).send({
            ErrorCode: 400,
            ErrorDescription: "Bad Request. Key field cannot be updated.",
        });
    }
    else {
        if (pid) {
            pidRepository.merge(pid, req.body); // Merge the existing item with the updated data from the request.
            pid.pidNotes = pid.pidNotes
                ? `${pid.pidNotes}\n${req.body.pidNotes}`
                : req.body.pidNotes;
            console.log(pid.pidNotes);
            const result = yield pidRepository.save(pid); // Save the updated item.
            res.json(result); // Respond with the updated item.
        }
        else {
            res
                .status(404)
                .send({ ErrorCode: 404, ErrorDescription: "Pid not found" }); // Respond with a 404 status if not found.
        }
    }
});
exports.updatePid = updatePid;
const deletePid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pidRepository = data_source_1.AppDataSource.getRepository(Pid_1.Pid); // Get the repository.
    const result = yield pidRepository.delete(req.params.pid); // Delete the item by ID.
    if (result.affected === 1) {
        res.status(204).send(); // Respond with a 204 status for successful deletion.
    }
    else {
        res.status(404).send({ ErrorCode: 404, ErrorDescription: "Pid not found" }); // Respond with a 404 status if not found.
    }
});
exports.deletePid = deletePid;
