import { signup } from "../config/services/userService"

export const SignUpUtils = async (email: string, password: string, role: "user" | "admin")=> {
    console.log(email)
    try{
        const userId = await signup(email, password, role)
        return userId
    }catch(error: any){
        console.log(error)
        throw error.message
    }
   
}