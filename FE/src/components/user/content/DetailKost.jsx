import React from 'react';
import { useParams } from 'react-router-dom';
import { dummyData } from './KostList'; // Import as named export

const DetailKost = () => {
    const { id } = useParams();
    const kost = dummyData.find((item) => item.id === parseInt(id, 10));

    if (!kost) {
        return <div> Kost Tidak Ditemukan</div>;
    }

    return (
        <div className='mt-36 p-6'>
            <h1 className='font-bold text-4xl mb-3'>{kost.namaKost}</h1>
            <img
                src={kost.image}
                alt={kost.namaKost}
                style={{ width: '500px', height: '400px' }}
            />
            <h1>Alamat :{kost.alamat}</h1>
            <h1>Harga  :{kost.harga}</h1>
        </div>
    );
};

export default DetailKost;

