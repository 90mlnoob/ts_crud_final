// src/data-source.ts
import { DataSource } from "typeorm";
import { Pid } from "./entity/Pid";

export const AppDataSource = new DataSource({
  type: "sqlite", // Specifies the database type.
  database: "database.sqlite", // The name of the SQLite database file.
  synchronize: true, // Automatically create database schema based on entities.
  logging: true, // Enable query logging to the console.
  entities: [Pid], // Specifies the entity classes.
  subscribers: [], // If using event subscribers, they would be defined here.
  migrations: [], // If using migrations, they would be defined here.
});
