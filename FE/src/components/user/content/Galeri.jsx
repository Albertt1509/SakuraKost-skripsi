import React from 'react';
import { useParams } from 'react-router-dom';
import { dummyData } from './KostList';

export default function Galery() {
    const { id } = useParams();
    const kost = dummyData.find((item) => item.id === parseInt(id, 10));

    if (!kost) {
        return <div> Kost Tidak Ditemukan</div>;
    }

    return (
        <>
            <h1 className='font-bold text-4xl mb-3'>{kost.namaKost}</h1>
            <div className="w-full flex">
                <div className="w-1/2 flex ">
                    <div className="w-full">
                        <img
                            src={kost.image}
                            alt={kost.namaKost}
                            className="w-full  h-[70vh] object-cover"
                        />
                    </div>
                </div>
                <div className="w-1/4 pl-4 flex flex-col">
                    <div id="red-one" className="bg-gray-400 flex-grow">
                        {/* Content for the first column */}
                    </div>
                    <div id="red-two" className="bg-gray-400 mt-4 flex-grow">
                        {/* Content for the second column */}
                    </div>
                </div>
                <div className="w-1/4 pl-4 rounded-lg flex flex-col">
                    <div className="bg-gray-400 flex-grow">
                        {/* Content for the third column */}
                    </div>
                    <div id="red-two" className="bg-gray-400 mt-4 flex-grow">
                        {/* Content for the fourth column */}
                    </div>
                </div>
            </div>

        </>
    )
}