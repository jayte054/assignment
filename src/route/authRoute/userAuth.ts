import express, {Request, Response} from "express"
import { adminSignup, userSignUp } from "../../controller/authController"
import { getUser } from "../../controller/dataController"

export const userRoute = express.Router()
export const adminRoute = express.Router()

userRoute.post("/signup", (req: Request, res: Response) => userSignUp(req, res))
adminRoute.post("/admin/signup", (req: Request, res: Response) => adminSignup(req, res))
