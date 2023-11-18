import { useState } from 'react';
import { Link } from 'react-router-dom';
import Cover1 from '../../../assets/polder/contoh1.jpeg';
import Cover2 from '../../../assets/polder/contoh2.jpeg';
import Cover3 from '../../../assets/polder/contoh3.jpg';

export const dummyData = [
    {
        id: 1,
        image: Cover1,
        namaKost: 'Kost A',
        alamat: 'Jl. A No. 123',
        harga: 'Rp. 1.500.000',
    },
    {
        id: 2,
        image: Cover2,
        namaKost: 'Kost B',
        alamat: 'Jl. B No. 456',
        harga: 'Rp. 2.000.000',
    },
    {
        id: 3,
        image: Cover3,
        namaKost: 'Kost C',
        alamat: 'Jl. C No. 789',
        harga: 'Rp. 1.800.000',
    },
];

const KostList = () => {
    const [liked, setLiked] = useState({});

    const handleLikeToggle = (id) => {
        setLiked((prevLiked) => ({
            ...prevLiked,
            [id]: !prevLiked[id],
        }));
    };
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ">
            {dummyData.map((kost) => (
                <div key={kost.id} className="relative bg-gray-100 p-4 rounded-md">

                    <button
                        className="absolute top-5 right-5 rounded-full z-10 cursor-pointer"
                        onClick={(event) => handleLikeToggle(event, kost.id)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={liked[kost.id] ? 'red' : 'none'}
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="White"
                            className={`w-6 h-6 text-${liked[kost.id] ? 'red' : 'gray'}-500 transition-colors`}
                            style={{ fontSize: '24px' }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    </button>
                    <Link to={`/content/${kost.id}`}>
                        <img
                            src={kost.image}
                            alt={kost.namaKost}
                            className="w-full h-[50vh] z-0"
                        />
                        <h2 className="text-lg font-semibold mb-2">{kost.namaKost}</h2>
                        <p className="text-gray-600 mb-2">{kost.alamat}</p>
                        <p className="text-green-500 font-semibold">{kost.harga}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
};


export default KostList;
