import express, {Request, Response} from "express"
import { createData, getSavedData, getUser } from "../../controller/dataController"
import * as  handleImageUpload from "../../controller/dataController"
import { getEntriesByUserId } from "../../config/services/dataService"



export const routes = express.Router()

routes.get("/get", getSavedData)
routes.get("/getusers", getUser)
routes.get("/getentries", getEntriesByUserId )
routes.post("/create", createData)
