"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = __importDefault(require("express"));
const dataController_1 = require("../controller/dataController");
exports.route = express_1.default.Router();
exports.route.get("/", dataController_1.index);
exports.route.post("/create", dataController_1.createEntry);
