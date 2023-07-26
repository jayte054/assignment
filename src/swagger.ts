// import { Application } from "express";
// import path from "path";
// import swaggerJSDoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express"
// import {Request, Response} from "express"

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

import express, {Express} from "express"
import swaggerUi from "swagger-ui-express"
import YAML from "yamljs"

const app: Express = express()
export const swaggerDocument = YAML.load("/Users/mac/Desktop/Assignment/swagger.yaml")

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// const port = process.env.PORT || 3005
// app.listen(port, (() => {
//     console.log(`app is listening on port   ${port}`)
// }))