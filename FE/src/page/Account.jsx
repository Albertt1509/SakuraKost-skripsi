import { useContext } from "react";
import UserContext from "../components/user/userContext";
import { Navigate } from "react-router-dom";

export default function AccountPage() {
    const { user } = useContext(UserContext);
    if (!user) {
        <Navigate to={'/login'} />
    }
    return (
        <div className=""> Selamat Datang {user.name}</div>
    )
}
