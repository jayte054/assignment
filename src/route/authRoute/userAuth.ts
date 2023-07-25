import express, {Request, Response} from "express"
import { adminSignup, userSignUp } from "../../controller/authController"
import { getUser } from "../../controller/dataController"

export const userRoute = express.Router()
export const adminRoute = express.Router()
/**
 * @swagger
 * /signup:
 * post:
 *      summary: signup into the app,
 *         description: provide the necessary credentials to signup into the account
 *      responses:  status: 201,
            message: "signup successful",
            status: 400,
            message: "Signup failed. Please check the provided data."
 */
userRoute.post("/signup", (req: Request, res: Response) => userSignUp(req, res))
/**
 * @swagger
 * /signup:
 * post:
 *      summary: signup into the app,
 *         description: provide the necessary credentials to signup into the account
 *      responses:  status: 201,
            message: "signup successful",
            status: 400,
            message: "Signup failed. Please check the provided data."
 */
adminRoute.post("/admin/signup", (req: Request, res: Response) => adminSignup(req, res))
