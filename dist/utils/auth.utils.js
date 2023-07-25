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
exports.SignUpUtils = void 0;
const userService_1 = require("../config/services/userService");
const SignUpUtils = (email, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(email);
    try {
        const userId = yield (0, userService_1.signup)(email, password, role);
        return userId;
    }
    catch (error) {
        console.log(error);
        throw error.message;
    }
});
exports.SignUpUtils = SignUpUtils;
