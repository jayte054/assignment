"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("../../controller/authController");
exports.userRoute = express_1.default.Router();
exports.adminRoute = express_1.default.Router();
exports.userRoute.post("/signup", (req, res) => (0, authController_1.userSignUp)(req, res));
exports.userRoute.post("/signin", (req, res) => (0, authController_1.userSignin)(req, res));
exports.adminRoute.post("/admin/signup", (req, res) => (0, authController_1.adminSignup)(req, res));
