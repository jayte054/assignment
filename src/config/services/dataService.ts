import * as admin from "firebase-admin"
import { snapshotConstructor } from "firebase-functions/v1/firestore";
import { Data } from "../../model/data.model"
import { UserModel } from "../../model/userModel";

export const saveData = async(data: Data): Promise<string> => {
    const db = admin.database();
    const ref = db.ref("data")

    try{
        const newRef = await ref.push(data)
        const id = newRef.key

        if(!id) {
            throw new Error("Failed to generate a unique key for data")
        }

        return id
    }catch(error:any){
        throw new Error("Error creating data" + error.message)
    }
}

export const getData = async(): Promise<string> => {
    const db = admin.database()
    const ref = db.ref("data")

    try{
        const snapShot = await ref.once("value")
        const data = snapShot.val()
        return data
    }catch(error: any){
        throw new Error("Error getting data" + error.message)
    }
}

export const getAllUsers = async(): Promise<{ id: string; email: string }[]> => {
    const db = admin.database()
    const ref = db.ref("users")

    try{
        const snapShot = await ref.once("value")
        const allUsers :  { id: string; email: string }[]  = []

        snapShot.forEach((childSnapShot) => {
            const user = childSnapShot.val() 
            if(user && user.email)
            allUsers.push({
                id: user.id, 
                email: user.email,
               
            })
        })
        return allUsers
    }catch(error){
        throw new Error("failed to retrieve users from database")
    }
}