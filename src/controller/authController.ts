import  * as admin  from "firebase-admin"
import bcrypt from "bcrypt"
import { SignupInterface } from "../inteface/signupInterface"
import { User } from "../model/userModel"
import { SignUpUtils } from "../utils/auth.utils"
import { verifyIdToken } from "../config/services/userService"

//========user auth ===========

export const userSignUp = async(req:Request | any, res: Response | any) => {
    try{
        const { email, password } : SignupInterface | any = req.body
        const role: "user" | "admin" = "user"
        
        const userId = await SignUpUtils(email, password, role)

        const newUser = new User()

        newUser.id = userId
        newUser.email = email
        newUser.password = password
        newUser.role = role
       

        await admin.database().ref("users").child(userId).set(newUser)

        res.status(201).send({
            status: 201,
            message: "signup successful",
            user: {
                uid: userId,
                email: email,
                role: role
            }
        })
    }catch(error){
        res.status(400).send({
            status: 400,
            message: "Signup failed. Please check the provided data."
          });
    }
}

export const userSignin = async (req: Request | any, res: Response | any) => {
    try{
        const {idToken} = req.body
        const uid = await verifyIdToken(idToken)
        res.status(201).send({
            status: 201,
            message: "signin sucessful",
            user: uid
        })
    }catch(error){
        res.status(400).send({
            status: 400,
            message: "failed to signin"
        })
    }
}

//========== admin auth ==============

export const adminSignup = async(req: Request | any, res: Response | any) => {
    try{
        const {email, password}: SignupInterface | any = req.body
        const role : "user" | "admin" = "admin"

        const userId = await SignUpUtils(email, password, role)

        const newAdmin = new User()
        newAdmin.email = email
        newAdmin.password = password
        newAdmin.role = role

        res.status(201).send({
            status: 201,
            message: "signin successful",
            user: {
                uid: userId,
                email: email,
                role: role
            }
        })
    }catch(error){
        res.status(400).send({
            status: 400,
            message: "Signup failed. Please check the provided data."
          });
    }
}