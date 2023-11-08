import AdminPage from "./AdminNav";
import { Outlet } from "react-router-dom";
export default function AdminLay() {
    return (
        <>
            <div className=" flex flex-col min-h-screen ">
                <AdminPage />
                <Outlet />
            </div>
        </>
    )
}