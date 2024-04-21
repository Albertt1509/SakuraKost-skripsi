import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../user/UserContext';

export default function IndexAdmin() {
    const { user, redy } = useContext(UserContext);

    if (!redy) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="bg-gray-100 h-screen justify-center items-center w-full">
            <div className="p-5 flex gap-2">
                <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
                {user && <h1 className=' text-2xl font-bold'>{user.name}</h1>}
            </div>
        </div>
    );
}
