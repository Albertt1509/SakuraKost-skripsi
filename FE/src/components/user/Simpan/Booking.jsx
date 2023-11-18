// components/user/Simpan/Booking.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Booking() {
    const { user, redy } = useContext(UserContext);

    if (!redy) {
        return '...Loading';
    }
    if (!user) {
        return <Navigate to="/login" />;
    }


    return (
        <>
            <div className="mt-[80px] p-6">
                <div className="text-4xl font-bold">
                    <h1>Favorite</h1>
                </div>
            </div>
        </>
    );
}
