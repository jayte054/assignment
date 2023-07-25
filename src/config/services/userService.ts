import * as admin from "firebase-admin"

export const signup = async(email: string, password: string, role: "user" | "admin" ): Promise<string> => {
    const userCredentials = await admin.auth().createUser({

        email: email,
        password: password,
    })

    return userCredentials.uid
}

// export const signinService = async(email:string, password: string): Promise<string> => {
//     try{
//         // const userCredentials = await admin.auth().signIn(idToken)
//         const userCredential = await admin.auth().signInWithEmailAndPassword(email, password);
//         const uid = userCredential.user?.uid;
//         // return decodedToken.uid
//     }catch(error){
//         throw new Error("invalid token")
//     }
// }