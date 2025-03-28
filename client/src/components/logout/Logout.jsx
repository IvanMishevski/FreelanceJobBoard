import { Navigate } from "react-router";
import { useLogout } from "../../api/userApi";



export default function Logout() {
    const { isLoggedOut } = useLogout()

    return isLoggedOut
        ? <Navigate to="/" />
        : null; // spinner is better
}