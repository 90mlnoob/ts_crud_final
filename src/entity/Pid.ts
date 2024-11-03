// src/entity/Item.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity() // Decorator to mark the class as a database entity.
export class Pid {
  @PrimaryGeneratedColumn() // Decorator to indicate that this property is a primary key and auto-incremented.
  ptPidNum!: number;

  @Column() // Decorator to specify this property as a column in the database.
  ptPidShortName!: string;

  @Column()
  companyId!: string;

  @Column()
  caseId!: number;

  @Column({ nullable: true, default: " " })
  pidNotes?: string;
}
