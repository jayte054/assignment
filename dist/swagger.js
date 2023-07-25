"use strict";
// import { Application } from "express";
// import path from "path";
// import swaggerJSDoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express"
// import {Request, Response} from "express"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocument = void 0;
// const data = path.resolve(__dirname, "../route/authRoute/userAuth.ts")
// const auth = path.resolve(__dirname, "../route/data/dataRoute.ts")
// const options: swaggerJSDoc.Options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "Node JS API  assignment",
//             version: "1.0.0",
//             description: "documentation for the take home"
//         },
//         servers: [
//             {
//                api: "localhost:3003",
//                basepath: "/"
//             }
//         ] 
//     },
//     apis : [data, auth]
// }
// export const swaggerSpec = swaggerJSDoc(options)
// export const swaggerJSDocs =(app: Application) => {
//     app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
//     app.get("/docs.json", (req: Request, res: Response) => {
//         res.setHeader("content-Type", "application/json");
//         res.send(swaggerSpec);
//       });
// } 
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const app = (0, express_1.default)();
exports.swaggerDocument = yamljs_1.default.load("/Users/mac/Desktop/Assignment/swagger.yaml");
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(exports.swaggerDocument));
const port = process.env.PORT || 3005;
app.listen(port, (() => {
    console.log(`app is listening on port   ${port}`);
}));
