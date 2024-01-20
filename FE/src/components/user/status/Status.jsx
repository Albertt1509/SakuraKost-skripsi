import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';

import axios from 'axios';

export default function Status() {
    const { user, redy } = useContext(UserContext);
    const [favoriteKosts, setFavoriteKosts] = useState([]);

    useEffect(() => {
        if (user) {
            // Ambil daftar Kost favorit dari server
            const fetchFavoriteKosts = async () => {
                try {
                    const response = await axios.get(`/user/${user._id}/favorites`);
                    setFavoriteKosts(response.data);
                } catch (error) {
                    console.error('Error fetching favorite Kosts:', error);
                }
            };

            fetchFavoriteKosts();
        }
    }, [user]);

    if (!redy || !user) {
        return !redy ? '...Loading' : <Navigate to="/login" />;
    }

    const containerStyle = {
        background: '#f472b6',
        height: '30vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const topContainerStyle = {
        width: '100%',
        flexGrow: 1,
        position: 'relative',
    };

    return (
        <>
            <div style={containerStyle}>
                <div style={topContainerStyle}></div>
                <div className="flex mr-auto mt-[80px] p-6 ">
                    <div className="text-4xl font-bold">
                        <h1>Status Pembayaran</h1>
                    </div>
                </div>
            </div>
        </>
    )

}