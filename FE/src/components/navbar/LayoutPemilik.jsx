import { Outlet } from "react-router-dom";
import PemilikNav from './PemilikNav'

export default function PemilNav() {
    return (
        <div className=" flex flex-col min-h-screen ">
            <PemilikNav />
            <Outlet />
        </div>
    )
}