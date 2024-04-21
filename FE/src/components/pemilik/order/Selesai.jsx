import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './ModalImg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Product = () => {
    const [selesai, setSelesai] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/selesai');
                setSelesai(response.data);
            } catch (error) {
                console.error('Error fetching purchase data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/selesai/${id}`);
            setSelesai(selesai.filter(item => item._id !== id));
            console.log("Data Selesai berhasil dihapus.");
            toast.success('Pemesanan berhasil dihapus!');
        } catch (error) {
            console.error('Error deleting Selesai data:', error);
            toast.error('Terjadi kesalahan saat menghapus pesanan.');
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
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <ToastContainer />
            <h1 className="text-2xl font-bold p-5">Data Pemesanan Selesai</h1>
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
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selesai.map((item) => (
                            <tr key={item._id} className=''>
                                <td className="border p-2">{item.name}</td>
                                <td className="border p-2">{item.title}</td>
                                <td className="border p-2">{item.tanggalPemesanan}</td>
                                <td className="border p-2">{item.durasi}</td>
                                <td className="border p-2">{formatNominal(item.harga)}</td>
                                <td className="border p-2">{item.jenisPembayaran}</td>
                                <td className="border p-2">{item.status}</td>
                                <td className="border p-2">
                                    <div className="flex justify-center gap-2">
                                        <button className='bg-red-500 rounded-lg p-2 text-white' onClick={() => handleDelete(item._id)}>Hapus</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
};

export default Product;
