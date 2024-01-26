import axios from "axios";
import { useEffect, useState } from "react";
import { Sukses } from './animation'

export default function Selesai() {
    const [selesai, setSelesai] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSimpanan = async () => {
            try {
                const response = await axios.get(`/api/selesai`);
                setSelesai(response.data);
            } catch (error) {
                console.error('Error fetching dataPesanan:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSimpanan();
    }, []);

    const formatNominal = (value) => {
        const floatValue = parseFloat(value);
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(floatValue);
    }

    return (
        <>
            {loading && <p>Loading...</p>}

            {!loading && (
                <div>
                    {selesai.map((item) => (
                        <div key={item._id} className="bg-white rounded-md overflow-hidden shadow-md ">
                            <div className="p-4">
                                <div className="flex justify-center">
                                    < Sukses />
                                </div>
                                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                                <p className="text-gray-600 mb-2">Nama: {item.name}</p>
                                <p className="text-gray-600 mb-2">Tanggal pemesanan: {item.tanggalPemesanan}</p>
                                <p className="text-gray-600 mb-2">Durasi: {item.durasi}</p>
                                <p className="text-gray-600 mb-2">Harga: {formatNominal(item.harga)}</p>
                                <p className="text-gray-600 mb-2">Jenis Pembayaran: {item.jenisPembayaran}</p>
                                <p className="text-gray-600 mb-2 flex items-center">
                                    <span className="mr-2">Status:</span>
                                    <div className="bg-green-400 p-2 rounded-lg">
                                        {item.status}
                                    </div>
                                </p>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
