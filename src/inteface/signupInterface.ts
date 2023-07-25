type Role = "user" | "admin"
export interface SignupInterface {
    email: string;
    password: string;
    role: Role
}