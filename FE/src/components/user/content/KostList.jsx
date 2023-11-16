import React from 'react';
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
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ">
            {dummyData.map((kost) => (
                <Link key={kost.id} to={`/content/${kost.id}`}>
                    <div className="bg-gray-100 p-4 rounded-md">
                        <img
                            src={kost.image}
                            alt={kost.namaKost}
                            className="w-full h-full object-cover"
                        />
                        <h2 className="text-lg font-semibold mb-2">{kost.namaKost}</h2>
                        <p className="text-gray-600 mb-2">{kost.alamat}</p>
                        <p className="text-green-500 font-semibold">{kost.harga}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default KostList;
