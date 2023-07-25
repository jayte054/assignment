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
/**
 * @swagger
 * /signup:
 * post:
 *      summary: signup into the app,
 *         description: provide the necessary credentials to signup into the account
 *      responses:  status: 201,
            message: "signup successful",
            status: 400,
            message: "Signup failed. Please check the provided data."
 */
exports.userRoute.post("/signup", (req, res) => (0, authController_1.userSignUp)(req, res));
/**
 * @swagger
 * /signup:
 * post:
 *      summary: signup into the app,
 *         description: provide the necessary credentials to signup into the account
 *      responses:  status: 201,
            message: "signup successful",
            status: 400,
            message: "Signup failed. Please check the provided data."
 */
exports.adminRoute.post("/admin/signup", (req, res) => (0, authController_1.adminSignup)(req, res));
