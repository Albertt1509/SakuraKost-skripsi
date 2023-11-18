import React from 'react';
import { useParams } from 'react-router-dom';
import { dummyData } from './KostList';
import Galery from './Galeri';
import Pembayaran from './Pembayaran';

const DetailKost = () => {
    const { id } = useParams();
    const kost = dummyData.find((item) => item.id === parseInt(id, 10));

    if (!kost) {
        return <div> Kost Tidak Ditemukan</div>;
    }

    return (
        <>
            <div className='mt-[80px] p-6'>
                <Galery />
            </div >
            <div className="pt-3 p-6 relative">
                <div className="font-bold text-2xl">
                    <h1>Nama Pemilik Kost : mr. Subekti</h1>
                </div>
                <div className="flex mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <h1>Alamat :{kost.alamat}</h1>
                </div>
                <div className="pt-8 font-bold text-2xl">
                    <h1>Fasilitas Kost</h1>
                </div>
                <div className="flex gap-5">
                    <h1>wifi</h1>
                    <h1>wifi</h1>
                    <h1>wifi</h1>
                    <h1>wifi</h1>
                    <h1>wifi</h1>
                </div>
                <div className="pt-8 font-bold text-2xl">
                    <h1>Aturan Kost</h1>
                </div>
                <div className="flex gap-5">
                    <h1>Tidak boleh membawa orang dalam</h1>
                </div>
                <div className="absolute top-0 right-0 mt-4">
                    <Pembayaran />
                </div>
            </div>
        </>
    );
};

export default DetailKost;
