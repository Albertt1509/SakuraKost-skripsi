import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import BgHome from '../../../assets/polder/bgkost.png';
import Spiral from '../../../assets/polder/icon.png';

const Data = () => {
    const [kostData, setKostData] = useState([]);
    const [liked, setLiked] = useState({});
    useEffect(() => {
        const GetData = async () => {
            try {
                const response = await axios.get("/api/kost");
                const slicedData = response.data.slice(0, 3);
                setKostData(slicedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        GetData();
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
            <div
                className="absolute inset-0 bg-cover "
                style={{ backgroundImage: `url(${BgHome})`, backgroundSize: '', }}>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {kostData.map((kost) => (
                    <div key={kost._id} className="relative bg-white shadow-lg p-4 rounded-md">
                        <button
                            className="absolute top-5 right-5 rounded-full z-10 cursor-pointer"
                            onClick={() => handleLikeToggle(kost._id)}
                        >
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
                                src={`${kost.photos[0]}`}
                                className="w-full h-[50vh] z-0 rounded-t-lg object-cover"
                            />
                            <h2 className="text-lg font-semibold mb-2">{kost.title}</h2>
                            <p className="text-gray-600 mb-2"> {kost.location}</p>
                            <p className="text-red-500 font-semibold">{formatNominal(kost.price)}</p>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-end mx-auto space-x-4 p-4 max-w-full">
                {Array.from({ length: 4 }, (_, index) => (
                    <div key={index} className="flex-shrink-0 relative ">
                        <div className="w-16 h-16 bg-pink-500 rounded-full hover:ring-4 hover:ring-white transition-transform transform hover:scale-90">
                            <img src={Spiral} alt="Spiral" className="absolute inset-0 w-full h-full object-cover rounded-full " />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Data;
