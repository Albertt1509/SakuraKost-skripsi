import { useContext, useState } from "react";
import UserContext from "../components/user/userContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import KostPage from "./Kost";

export default function AccountPage() {
    const [homepage, setHomepage] = useState(null)
    var { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile'
    }
    //aktivate link

    const { user, redy, setUser } = useContext(UserContext);
    if (!redy) {
        return '...Loading';
    }
    if (redy && !user && !setHomepage) {
        return <Navigate to={'/api/login'} />;
    }

    //logout
    async function logout() {
        await axios.post('/api/logout')
        setHomepage('/')
        setUser(null)
    }
    if (homepage) {
        return <Navigate to={homepage} />
    }
    return (
        <>
            <div className=" max-w-md mx-auto mt-[80px] relative">

                {subpage === 'profile' && (
                    <div className="bg-white  p-4 rounded shadow-md mt-4">
                        <h1 className="text-2xl font-bold mb-4">Profile</h1>
                        <div className="flex flex-col mb-4">
                            <div className="flex items-center mb-2">
                                <span className="font-semibold mr-2 w-[100px]">Nama</span>
                                <span className="text-gray-700">: {user.name}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="font-semibold mr-2 w-[100px]">Email</span>
                                <span className="text-gray-700">: {user.email}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="font-semibold mr-2 w-[100px]">Alamat</span>
                                <span className="text-gray-700">: {user.alamat}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="font-semibold mr-2 w-[100px]">No HP</span>
                                <span className="text-gray-700">: {user.nohp}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="font-semibold mr-2 text-sm w-[100px]">Ingin Bergabug?</span>
                                <span className="text-gray-700">: request to join as a admin</span>
                            </div>
                        </div>
                        <div className="absolute bottom-0 right-0 mb-1 mr-4">
                            <button onClick={logout} className="bg-pink-400 text-white py-2 px-4 rounded">
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {subpage === 'kost' && (
                <KostPage />
            )}
        </>

    );
}
