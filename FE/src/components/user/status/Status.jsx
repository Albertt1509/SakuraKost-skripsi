import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import axios from 'axios';
import Selesai from './Selesai';
import Batal from './Batal';
import { Waktu } from './animation'
export default function Status() {
    const { user, redy } = useContext(UserContext);
    const [simpan, setSimpan] = useState([]);
    useEffect(() => {
        if (user) {
            const fetchSimpanan = async () => {
                try {
                    const response = await axios.get(`/api/dataPesanan`);
                    setSimpan(response.data);
                } catch (error) {
                    console.error('Error fetching favorite Kosts:', error);
                }
            };

            fetchSimpanan();
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
        <>
            <div style={containerStyle}>
                <div style={topContainerStyle}></div>
                <div className="flex mr-auto mt-[80px] p-6 ">
                    <div className="text-4xl font-bold">
                        <h1>Status Pembayaran</h1>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
                {simpan.map((pemesanan) => (
                    <div key={pemesanan._id} className="bg-white rounded-md overflow-hidden shadow-md ">
                        <div className="p-4">
                            <div className="flex justify-center"><Waktu /></div>
                            <h2 className="text-xl font-semibold mb-2">{pemesanan.title}</h2>
                            <p className="text-gray-600 mb-2">Nama: {pemesanan.name}</p>
                            <p className="text-gray-600 mb-2">Tanggal Pemesanan: {pemesanan.tanggalPemesanan}</p>
                            <p className="text-gray-600 mb-2">Durasi: {pemesanan.durasi}</p>
                            <p className="text-gray-600 mb-2">Harga: {formatNominal(pemesanan.harga)}</p>
                            <p className="text-gray-600 mb-2">Jenis Pembayaran: {pemesanan.jenisPembayaran}</p>
                            <p className="text-gray-600 mb-2 flex items-center">
                                <span className="mr-2">Status:</span>
                                <div className="bg-red-500 p-2 text-white rounded-lg">
                                    {pemesanan.status}
                                </div>
                            </p>
                        </div>
                    </div>
                ))}
                <div className="">
                    <Selesai />
                    <Batal />
                </div>
            </div>
        </>
    )

}