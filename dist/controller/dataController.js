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
exports.handleImageUpload = exports.getUser = exports.createData = exports.getSavedData = void 0;
const dataService_1 = require("../config/services/dataService");
const uuid_1 = require("uuid");
const dataServices = __importStar(require("../config/services/dataService"));
const getSavedData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("get");
    const response = yield (0, dataService_1.getData)();
    console.log(response + "lin1");
    try {
        console.log(res);
        return res.status(200).send({
            status: 200,
            data: [response]
        });
    }
    catch (error) {
        res.status(500).send({
            status: 500,
            message: "failed to retrieve data"
        });
    }
});
exports.getSavedData = getSavedData;
const createData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataArray = req.body;
        const newKeys = [];
        for (const data of dataArray) {
            const newId = (0, uuid_1.v4)();
            data.id = newId;
            const percentage = (data.number_of_users / data.number_of_products) * 100;
            data.percentage = parseInt(percentage.toFixed(2));
            const newKey = yield (0, dataService_1.saveData)(data);
            newKeys.push(newKey);
        }
        res.status(201).send({
            status: 201,
            key: newKeys,
            data: dataArray
        });
        // return data
    }
    catch (error) {
        console.log(error);
        res.send({
            status: 500,
            message: "failed to save data"
        });
    }
});
exports.createData = createData;
//====== admin data retrieval from user =======
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield (0, dataService_1.getAllUsers)();
        return res.status(200).send({
            status: 200,
            message: "users fetched successfully",
            users: allUsers
        });
    }
    catch (error) {
        res.status(404).send({
            status: 404,
            message: "unable to fetch users from database"
        });
    }
});
exports.getUser = getUser;
//======admin upload image =========
// Controller function to handle image upload and update
const handleImageUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if a file is present in the request
        if (!req.file) {
            res.status(400).send({ error: 'No image file found in the request' });
            return;
        }
        // Get the user's email from the request body
        const email = req.body.email;
        // Upload the image to Firebase Storage and get the image URL
        const imageUrl = yield dataServices.uploadImageToStorage(email, req.file);
        // Update the image URL in Firestore for the user
        yield dataServices.updateImageUrlInFirestore(email, imageUrl);
        // Send a success response
        res.status(200).send({ imageUrl });
    }
    catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send({ error: 'Failed to upload image' });
    }
});
exports.handleImageUpload = handleImageUpload;
