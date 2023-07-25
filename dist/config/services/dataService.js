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
exports.updateImageUrlInFirestore = exports.uploadImageToStorage = exports.getAllUsers = exports.getData = exports.saveData = void 0;
const admin = __importStar(require("firebase-admin"));
const app_1 = require("../../app");
// import { bucket } from "firebase-functions/v1/storage";
const saveData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const db = admin.database();
    const ref = db.ref("data");
    try {
        const newRef = yield ref.push(data);
        const id = newRef.key;
        if (!id) {
            throw new Error("Failed to generate a unique key for data");
        }
        return id;
    }
    catch (error) {
        throw new Error("Error creating data" + error.message);
    }
});
exports.saveData = saveData;
const getData = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = admin.database();
    const ref = db.ref("data");
    try {
        const snapShot = yield ref.once("value");
        const data = snapShot.val();
        return data;
    }
    catch (error) {
        throw new Error("Error getting data" + error.message);
    }
});
exports.getData = getData;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = admin.database();
    const ref = db.ref("users");
    try {
        const snapShot = yield ref.once("value");
        const allUsers = [];
        snapShot.forEach((childSnapShot) => {
            const user = childSnapShot.val();
            if (user && user.email)
                allUsers.push({
                    id: user.id,
                    email: user.email,
                });
        });
        console.log(allUsers);
        return allUsers;
    }
    catch (error) {
        throw new Error("failed to retrieve users from database");
    }
});
exports.getAllUsers = getAllUsers;
// export const updateImage = async (email: string, imageUrl: string) => {
//         const db = admin.firestore()
//     try {
//       // Find the data entry with the provided email in the database
//       const dataEntryRef = db.collection('data').doc(email);
//       const snapshot = await dataEntryRef.get();
//       // If the data entry exists, update the image URL
//       if (snapshot.exists) {
//         await dataEntryRef.update({ image: imageUrl });
//         return imageUrl;
//       } else {
//         throw new Error('Data entry not found');
//       }
//     } catch (error) {
//       throw new Error('Failed to update image in database');
//     }
//   };
// Function to upload an image to Firebase Storage
const uploadImageToStorage = (email, file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageFileName = Date.now() + '-' + file.originalname;
        const fileUpload = app_1.bucket.file(imageFileName);
        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });
        blobStream.on('error', (error) => {
            throw new Error('Error uploading image to storage: ' + error.message);
        });
        blobStream.on('finish', () => {
            const imageUrl = `https://storage.googleapis.com/${app_1.bucket.name}/${fileUpload.name}`;
            return imageUrl;
        });
        blobStream.end(file.buffer);
    }
    catch (error) {
        throw new Error('Failed to upload image to storage: ' + error.message);
    }
});
exports.uploadImageToStorage = uploadImageToStorage;
// ...
const updateImageUrlInFirestore = (email, imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRef = admin.firestore().collection('users').where('email', '==', email);
        const userSnapshot = yield userRef.get();
        if (userSnapshot.empty) {
            throw new Error('User not found with email: ' + email);
        }
        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();
        yield userDoc.ref.update({
            image: imageUrl,
        });
        // Return a resolved Promise to satisfy the Promise<void> return type
        return Promise.resolve();
    }
    catch (error) {
        throw new Error('Failed to update image URL in Firestore: ' + error.message);
    }
});
exports.updateImageUrlInFirestore = updateImageUrlInFirestore;
// ...
