import express, {Request, Response} from "express"
import {routes} from "./route/data/dataRoute"
import multer from "multer";
import cors from "cors"
import admin, {database, ServiceAccount} from "firebase-admin"
import { serviceAccount} from "./serviceAccount"
import { userRoute, adminRoute } from "./route/authRoute/userAuth"
import * as dataController from "./controller/dataController";
// import { swaggerJSDocs, swaggerSpec } from "./utils/swaggerutils";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./swagger";


const app = express()
app.use(express.json())
app.use(cors())


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    databaseURL: "https://assignment-846dd-default-rtdb.firebaseio.com/",
    storageBucket: "assignment-846dd.appspot.com"
})

const storage = admin.storage();
export const bucket = storage.bucket();

// Create a Multer instance with the desired configuration
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB file size limit
    },
  });


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

//   swaggerJSDocs(app) 
app.use(("/"), routes)
app.use(("/auth"), userRoute)
app.use(("/auth"), adminRoute)
app.post("/uploadimage", upload.single("image"), dataController.handleImageUpload);

const port = 3003

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})