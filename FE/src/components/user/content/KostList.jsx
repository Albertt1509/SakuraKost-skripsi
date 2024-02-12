import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import NoData from './NoData';
import UserContext from '../UserContext'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const KostList = ({ jenisKos, kostData: initialKostData, onRemoveFavorite }) => {
    const { user } = useContext(UserContext);
    const [kostData, setKostData] = useState(initialKostData);
    const [favorit, setFavorit] = useState({});

    useEffect(() => {
        setKostData(initialKostData);
    }, [initialKostData]);

    const handleLikeToggle = async (id) => {
        try {
            // Update local state
            setFavorit((prevFavorited) => ({
                ...prevFavorited,
                [id]: !prevFavorited[id],
            }));
            await axios.post(`/user/${user._id}/favorites/${id}`);
            toast.success('Disimpan di Favorite', {
                position: 'top-right',
                style: {
                    whiteSpace: 'nowrap',
                },
                autoClose: 3000,
            });
        } catch (error) {
            console.error('Error toggling favorite:', error);
            toast.error('Login Terlebih Dahulu', {
                position: 'top-right',
                style: {
                    whiteSpace: 'nowrap',
                },
                autoClose: 3000,
            });
        }
    };

    const handleRemoveFavorite = async (id) => {
        try {
            // Update local state
            setFavorit((prevFavorited) => ({
                ...prevFavorited,
                [id]: false,
            }));
            if (onRemoveFavorite) {
                onRemoveFavorite(id);
                await axios.delete(`/user/${user._id}/favorites/${id}`);
                toast.success('Data Favorite di Hapus', {
                    position: 'top-right',
                    style: {
                        whiteSpace: 'nowrap',
                    },
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error('Error removing favorite:', error);
            toast.error('Data Favorite Gagal di Hapus', {
                position: 'top-right',
                style: {
                    whiteSpace: 'nowrap',
                },
                autoClose: 3000,
            });
        }
    };

    const formatNominal = (value) => {
        const floatValue = parseFloat(value);
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(floatValue);
    };

    return (
        <div className="w-full relative">
            <ToastContainer />
            {kostData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {kostData
                        .filter((kost) => !jenisKos || kost.jenis === jenisKos)
                        .map((kost) => (
                            <div key={kost._id} className="relative bg-gray-100 p-4 rounded-md">
                                <button
                                    className="absolute top-5 right-5 rounded-full z-10 cursor-pointer"
                                    onClick={() => {
                                        if (favorit[kost._id]) {
                                            handleRemoveFavorite(kost._id);
                                        } else {
                                            handleLikeToggle(kost._id);
                                        }
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill={favorit[kost._id] ? 'red' : 'none'}
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="White"
                                        className={`w-6 h-6 text-${favorit[kost._id] ? 'red' : 'gray'}-500 transition-colors`}
                                        style={{ fontSize: '24px' }}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                        />
                                    </svg>
                                </button>
                                <Link to={`/content/${kost._id}`}>
                                    <img
                                        src={`${kost.photos[0]}`}
                                        alt={kost.namaKost}
                                        className="w-full h-[65vh] z-0"
                                    />
                                    <div className="flex">
                                        <h2 className="text-lg font-semibold mb-2">{kost.title}</h2>
                                        <h2 className="text-xm opacity-50 ml-auto mb-2">{kost.jenis}</h2>
                                    </div>
                                    <p className="text-gray-600 mb-2">{kost.location}</p>
                                    <p className="text-red-500 font-semibold">{formatNominal(kost.price)}</p>
                                </Link>
                            </div>
                        ))}
                </div>
            ) : (
                <NoData />
            )}
        </div>
    );
};

export default KostList;
