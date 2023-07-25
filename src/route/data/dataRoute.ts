import express, {Request, Response} from "express"
import { createData, getSavedData, getUser } from "../../controller/dataController"
import * as  handleImageUpload from "../../controller/dataController"
export const routes = express.Router()

routes.get("/get", getSavedData)
routes.get("/getusers", getUser)
routes.post("/create", createData)