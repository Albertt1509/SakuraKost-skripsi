import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const KostList = ({ jenisKos, }) => {
    const [kostData, setKostData] = useState([]);
    const [liked, setLiked] = useState({});

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get("/api/kost");
                setKostData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getData();
    }, []);

    const handleLikeToggle = (id) => {
        setLiked((prevLiked) => ({
            ...prevLiked,
            [id]: !prevLiked[id],
        }));
    };

    const formatNominal = (value) => {
        const floatValue = parseFloat(value);
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(floatValue);
    };

    return (
        <div className="w-full relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ">
                {kostData
                    .filter((kost) => !jenisKos || kost.jenis === jenisKos)
                    .map((kost) => (
                        <div key={kost._id} className="relative bg-gray-100 p-4 rounded-md">
                            <button
                                className="absolute top-5 right-5 rounded-full z-10 cursor-pointer"
                                onClick={() => handleLikeToggle(kost._id)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill={liked[kost._id] ? 'red' : 'none'}
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="White"
                                    className={`w-6 h-6 text-${liked[kost._id] ? 'red' : 'gray'}-500 transition-colors`}
                                    style={{ fontSize: '24px' }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            </button>
                            <Link to={`/content/${kost._id}`}>
                                <img
                                    src={`http://localhost:4000/images/${kost.photos[0]}`}
                                    alt={kost.namaKost}
                                    className="w-full h-[50vh] z-0" />
                                <div className="flex ">
                                    <h2 className="text-lg font-semibold mb-2">{kost.title}</h2>
                                    <h2 className="text-lg font-semibold ml-auto mb-2">{kost.jenis}</h2>
                                </div>
                                <p className="text-gray-600 mb-2">{kost.location}</p>
                                <p className="text-red-500 font-semibold">{formatNominal(kost.price)}</p>
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default KostList;
