"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pid = void 0;
// src/entity/Item.ts
const typeorm_1 = require("typeorm");
let Pid = class Pid {
};
exports.Pid = Pid;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)() // Decorator to indicate that this property is a primary key and auto-incremented.
    ,
    __metadata("design:type", Number)
], Pid.prototype, "ptPidNum", void 0);
__decorate([
    (0, typeorm_1.Column)() // Decorator to specify this property as a column in the database.
    ,
    __metadata("design:type", String)
], Pid.prototype, "ptPidShortName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pid.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Pid.prototype, "caseId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: " " }),
    __metadata("design:type", String)
], Pid.prototype, "pidNotes", void 0);
exports.Pid = Pid = __decorate([
    (0, typeorm_1.Entity)() // Decorator to mark the class as a database entity.
], Pid);
