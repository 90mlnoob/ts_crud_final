"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
// src/data-source.ts
const typeorm_1 = require("typeorm");
const Pid_1 = require("./entity/Pid");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite", // Specifies the database type.
    database: "database.sqlite", // The name of the SQLite database file.
    synchronize: true, // Automatically create database schema based on entities.
    logging: true, // Enable query logging to the console.
    entities: [Pid_1.Pid], // Specifies the entity classes.
    subscribers: [], // If using event subscribers, they would be defined here.
    migrations: [], // If using migrations, they would be defined here.
});
