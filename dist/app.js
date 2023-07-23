"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataRoute_1 = require("./route/data/dataRoute");
const cors_1 = __importDefault(require("cors"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const serviceAccount_1 = require("./serviceAccount");
const userAuth_1 = require("./route/authRoute/userAuth");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount_1.serviceAccount),
    databaseURL: "https://assignment-846dd-default-rtdb.firebaseio.com/"
});
app.use(dataRoute_1.routes);
app.use(("/auth"), userAuth_1.userRoute);
app.use(("/auth"), userAuth_1.adminRoute);
const port = 3003;
app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});
