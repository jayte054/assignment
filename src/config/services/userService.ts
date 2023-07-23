import * as admin from "firebase-admin"

export const signup = async(email: string, password: string, role: "user" | "admin" ): Promise<string> => {
    const userCredentials = await admin.auth().createUser({

        email: email,
        password: password,
    })

    return userCredentials.uid
}

export const verifyIdToken = async(idToken: string): Promise<string> => {
    try{
        const decodedToken = await admin.auth().verifyIdToken(idToken)
        return decodedToken.uid
    }catch(error){
        throw new Error("invalid token")
    }
}