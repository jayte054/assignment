"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const dataController_1 = require("../../controller/dataController");
const dataService_1 = require("../../config/services/dataService");
exports.routes = express_1.default.Router();
exports.routes.get("/get", dataController_1.getSavedData);
exports.routes.get("/getusers", dataController_1.getUser);
exports.routes.get("/getentries", dataService_1.getEntriesByUserId);
exports.routes.post("/create", dataController_1.createData);
