import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './ModalImg';
import Selesai from './Selesai';
import Batal from './Batal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
    const [purchases, setPurchases] = useState([]);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/dataPesanan');
                setPurchases(response.data);
            } catch (error) {
                console.error('Error fetching purchase data:', error);
            }
        };

        fetchData();
    }, []);

    const OrderSelesai = async (purchase) => {
        try {
            const response = await axios.post(`/api/prosesPemesanan/${purchase._id}`);
            setOrder(response.data);
            toast.success('Pemesanan berhasil diproses!');
        } catch (error) {
            console.log('error proses:', error);
            toast.error('Terjadi kesalahan saat memproses pemesanan.');
        }
    };

    const OrderBatal = async (purchase) => {
        try {
            const response = await axios.post(`/api/batalPemesanan/${purchase._id}`);
            setOrder(response.data);
            toast.success('Pemesanan berhasil dibatalkan!');
        } catch (error) {
            console.log('error proses:', error);
            toast.error(`Terjadi kesalahan saat membatalkan pemesanan: ${error.message}`);
        }
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

    const openModal = (imageUrl) => {
        setSelectedImageUrl(imageUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        if (order.length > 0) {
            console.log('Order:', order); // Tampilkan pesan atau lakukan tindakan lain berdasarkan nilai order
        }
    }, [order]);

    return (
        <>
            <ToastContainer />
            <h1 className="text-2xl font-bold p-5">Data Pemesanan</h1>
            <div className="bg-white m-6 p-[30px] border-solid border-[#BAC7D5] border rounded">
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="border p-2">Nama</th>
                            <th className="border p-2">Nama Kos</th>
                            <th className="border p-2">Tanggal Pemesanan</th>
                            <th className="border p-2">Durasi</th>
                            <th className="border p-2">Harga</th>
                            <th className="border p-2">Jenis Pembayaran</th>
                            <th className="border p-2">Wajah</th>
                            <th className="border p-2">Bukti Transfer</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(purchases) && purchases.map((purchase) => (
                            <tr key={purchase._id} className="">
                                <td className="border p-2">
                                    <div className="flex justify-center">{purchase.name}</div>
                                </td>
                                <td className="border p-2">
                                    <div className="flex justify-center">{purchase.title}</div>
                                </td>
                                <td className="border p-2">
                                    <div className="flex justify-center">{purchase.tanggalPemesanan}</div>
                                </td>
                                <td className="border p-2">
                                    <div className="flex justify-center">{purchase.durasi}</div>
                                </td>
                                <td className="border p-2">
                                    <div className="flex justify-center">{formatNominal(purchase.harga)}</div>
                                </td>
                                <td className="border p-2">
                                    <div className="flex justify-center">{purchase.jenisPembayaran}</div>
                                </td>
                                <td className="border p-2">
                                    <div className="cursor-pointer flex justify-center" onClick={() => openModal(`http://localhost:4000/foto/${purchase.selpi[0]}`)}>
                                        Lihat
                                    </div>
                                </td>
                                <td className="border p-2">
                                    {purchase.jenisPembayaran !== 'Bayar Di Tempat' && (
                                        <div className="cursor-pointer flex justify-center" onClick={() => openModal(`http://localhost:4000/foto/${purchase.transfer[0]}`)}>
                                            Lihat
                                        </div>
                                    )}
                                </td>
                                <td className="border p-2">{purchase.status}</td>
                                <td className="border p-2">
                                    <div className="flex justify-center gap-2">
                                        <button className='bg-pink-400 rounded-lg p-2 text-white' onClick={() => OrderSelesai(purchase)}>Proses</button>
                                        <button className='bg-red-500 rounded-lg p-2 text-white' onClick={() => OrderBatal(purchase)}>Batalkan</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} imageUrl={selectedImageUrl} />
            <Selesai />
            <Batal />
        </>
    );
};

export default Product;
