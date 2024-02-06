import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Galery from './Galeri';
import MenuDetail from './MenuDetail';
import IconsFitur from './Fitur'

const DetailKost = () => {
    const { id } = useParams();
    const [kost, setKost] = useState(null);

    useEffect(() => {
        axios.get(`/api/kost/${id}`)
            .then(response => {
                setKost(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    if (!kost) {
        return <div> Loading...</div>;
    }
    return (
        <>
            <div className='mt-[80px] p-6'>
                <Galery />
            </div>
            <div className="pt-3 p-6 relative">
                <div className="font-bold text-2xl">
                    <h1>Pemilik Kost {kost.owner}</h1>
                </div>
                <div className=" mt-5 ">
                    <h1 className='font-bold text-2xl'>Deskripsi</h1>
                    <div className="flex mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                        <h1>{kost.description}</h1>
                    </div>
                </div>
                <div className="mt-5">
                    <h1 className='font-bold text-2xl'>Jumlah Kamar</h1>
                    <div className="flex mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>

                        <h1> {kost.kamar}</h1>
                    </div>
                </div>
                <div className="mt-5">
                    <h1 className='font-bold text-2xl'>Alamat</h1>
                    <div className="flex mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <h1> {kost.address}</h1>
                    </div>
                </div>
                <div className=" mt-5 ">
                    <h1 className='font-bold text-2xl'>Aturan</h1>
                    <div className="flex mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>
                        <h1>{kost.moreinfo}</h1>
                    </div>
                </div>
                <div className=" mt-5 ">
                    <h1 className='font-bold text-2xl'>Status Kamar</h1>
                    <div className="flex mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
                        </svg>

                        <h1>{kost.statusKamar}</h1>
                    </div>
                </div>
                <div className=" mt-5 ">
                    <h1 className='font-bold text-2xl'>Khusus</h1>
                    <div className="flex mt-2">
                        <h1>{kost.jenis}</h1>
                    </div>
                </div>
                <div className=" mt-5 ">
                    <h1 className='font-bold text-2xl'>Fasilitas</h1>
                    <div className="flex flex-wrap gap-5 mt-4">
                        {kost.wifi && IconsFitur.wifi}
                        {kost.parking && IconsFitur.parking}
                        {kost.laundry && IconsFitur.laundry}
                        {kost.servant && IconsFitur.servant}
                        {kost.free && IconsFitur.free}
                        {kost.fullRoom && IconsFitur.fullRoom}
                        {kost.pet && IconsFitur.pet}
                        {kost.energy && IconsFitur.energy}
                        {kost.water && IconsFitur.water}
                    </div>
                </div>
                <div className="lg:absolute bottom-0 top-10 left-0 w-full mb-4">
                    <MenuDetail />
                </div>
            </div>

        </>
    );
};

export default DetailKost;
