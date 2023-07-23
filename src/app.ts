import express, {Request, Response} from "express"
import {routes} from "./route/data/dataRoute"
import cors from "cors"
import admin, {database, ServiceAccount} from "firebase-admin"
import { serviceAccount} from "./serviceAccount"
import { userRoute, adminRoute } from "./route/authRoute/userAuth"


const app = express()
app.use(express.json())
app.use(cors())

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    databaseURL: "https://assignment-846dd-default-rtdb.firebaseio.com/"
})

app.use(routes)
app.use(("/auth"), userRoute)
app.use(("/auth"), adminRoute)

const port = 3003

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})