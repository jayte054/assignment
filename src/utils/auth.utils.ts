import { signup } from "../config/services/userService"

export const SignUpUtils = async (email: string, password: string, role: "user" | "admin")=> {
    const userId = await signup(email, password, role)
    return userId
}