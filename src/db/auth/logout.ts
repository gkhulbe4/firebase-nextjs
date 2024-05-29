import { getAuth, signOut } from "firebase/auth";
import { app } from "../config";

const auth = getAuth(app);

export default async function logout(){
    let error = null
    try {
        const result = await signOut(auth)
    } catch (e) {
        error = e;
    }
    return {SuccessMessage: "Logout successfully", error}
}