"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.adminSignup = exports.userSignUp = void 0;
const admin = __importStar(require("firebase-admin"));
const userModel_1 = require("../model/userModel");
const auth_utils_1 = require("../utils/auth.utils");
// import { verifyIdToken } from "../config/services/userService"
//========user auth ===========
const userSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, role } = req.body;
        // const role: "user" | "admin" = "user"
        console.log("iy");
        const userId = yield (0, auth_utils_1.SignUpUtils)(email, password, role);
        console.log("iy");
        const newUser = new userModel_1.User();
        newUser.id = userId;
        newUser.email = email;
        newUser.password = password;
        newUser.role = role;
        yield admin.database().ref("users").child(userId).set(newUser);
        res.status(201).send({
            status: 201,
            message: "signup successful",
            user: {
                uid: userId,
                email: email,
                role: role
            }
        });
    }
    catch (error) {
        res.status(400).send({
            status: 400,
            message: "Signup failed. Please check the provided data."
        });
    }
});
exports.userSignUp = userSignUp;
//========== admin auth ==============
const adminSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const role = "admin";
        const userId = yield (0, auth_utils_1.SignUpUtils)(email, password, role);
        const newAdmin = new userModel_1.User();
        newAdmin.email = email;
        newAdmin.password = password;
        newAdmin.role = role;
        res.status(201).send({
            status: 201,
            message: "signin successful",
            user: {
                uid: userId,
                email: email,
                role: role
            }
        });
    }
    catch (error) {
        res.status(400).send({
            status: 400,
            message: "Signup failed. Please check the provided data."
        });
    }
});
exports.adminSignup = adminSignup;
