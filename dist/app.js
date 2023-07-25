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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bucket = void 0;
const express_1 = __importDefault(require("express"));
const dataRoute_1 = require("./route/data/dataRoute");
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const serviceAccount_1 = require("./serviceAccount");
const userAuth_1 = require("./route/authRoute/userAuth");
const dataController = __importStar(require("./controller/dataController"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount_1.serviceAccount),
    databaseURL: "https://assignment-846dd-default-rtdb.firebaseio.com/",
    storageBucket: "assignment-846dd.appspot.com"
});
const storage = firebase_admin_1.default.storage();
exports.bucket = storage.bucket();
// Create a Multer instance with the desired configuration
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB file size limit
    },
});
app.use(dataRoute_1.routes);
app.use(("/auth"), userAuth_1.userRoute);
app.use(("/auth"), userAuth_1.adminRoute);
app.post("/uploadimage", upload.single("image"), dataController.handleImageUpload);
const port = 3003;
app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});
