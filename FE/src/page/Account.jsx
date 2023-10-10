import { useContext, useState } from "react";
import UserContext from "../components/user/userContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AccountPage() {
    const [homepage, setHomepage] = useState(null)
    var { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile'
    }
    //aktivate link
    function linkActive(type = null) {
        var colors = 'p-2 px-6';
        if (type === subpage || (subpage === undefined && type === 'profile')) {
            colors += ' bg-primary rounded-lg text-white';
        }
        return colors;
    }
    const { user, redy, setUser } = useContext(UserContext);
    if (!redy) {
        return '...Loading';
    }
    if (redy && !user) {
        return <Navigate to={'/login'} />;
    }

    //logout
    async function logout() {
        await axios.post('/logout')
        setHomepage('/')
        setUser(null)
    }
    if (homepage) {
        return <Navigate to={homepage} />
    }
    return (
        <div className=" max-w-md mx-auto mt-8 relative">
            <nav className="flex justify-center gap-5">
                <Link className={linkActive('profile')} to={'/account/profile'}>My Profile</Link>
                <Link className={linkActive('booking')} to={'/account/booking'}>My Booking Kost</Link>
                <Link className={linkActive('kost')} to={'/account/kost'}>My Kost</Link>
            </nav>
            {subpage === 'profile' && (
                <div className="bg-white bg-opacity-50 p-4 rounded shadow-md mt-4">
                    <h1 className="text-2xl font-bold mb-4">Profile</h1>
                    <div className="flex flex-col mb-4">
                        <div className="flex items-center mb-2">
                            <span className="font-semibold mr-2 w-[100px]">User Name</span>
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
                    </div>
                    <div className="absolute bottom-0 right-0 mb-4 mr-4">
                        <button onClick={logout} className="bg-primary text-white py-2 px-4 rounded">
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
