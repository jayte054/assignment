"use strict";
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
exports.getUser = exports.createData = exports.getSavedData = void 0;
const dataService_1 = require("../config/services/dataService");
const uuid_1 = require("uuid");
const getSavedData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, dataService_1.getData)();
    try {
        return res.status(200).send({
            status: 200,
            data: response
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
