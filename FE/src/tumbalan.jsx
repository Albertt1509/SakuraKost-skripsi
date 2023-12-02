import { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";

export default function Pembayaran() {
    const location = useLocation();
    const [selectedPayment, setSelectedPayment] = useState('');
    const [tanggalPemesanan, setTanggalPemesanan] = useState("");
    const [durasi, setDurasi] = useState("");

    useEffect(() => {
        if (location.state) {
            setTanggalPemesanan(location.state.tanggalPemesanan);
            setDurasi(location.state.durasi);
        }
    }, [location.state]);

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

    return (
        <>
            <div style={containerStyle}>
                <div style={topContainerStyle}></div>
                <div className="flex mr-auto mt-[80px] p-6 ">
                    <div className="text-4xl font-bold">
                        <h1>Ajukan Pemesanan</h1>
                    </div>
                </div>
            </div>
            <div className="p-6 flex">
                <div className="w-1/2 p-4 ">
                    <div className="rincian border-2 border-solid  p-3 rounded-lg">
                        <div className="">
                            <h1 className="text-2xl font-bold">Pesanan anda</h1>
                            <div className="flex">
                                <h1 className="text-sm ">Tanggal Pemesanan: {tanggalPemesanan}</h1>
                                <button className="text-sm ml-auto">Edit</button>
                            </div>
                        </div>
                        <div className="mt-5">
                            <h1 className="text-2xl font-bold">Durasi Pemesanan</h1>
                            <div className="flex">
                                <h1 className="text-sm ">Durasi: {durasi}</h1>
                                <button className="text-sm ml-auto">Edit</button>
                            </div>
                        </div>
                    </div>
                    {/* ... (kode setelahnya) */}
                </div>
                {/* ... (kode setelahnya) */}
            </div>
        </>
    );
}
