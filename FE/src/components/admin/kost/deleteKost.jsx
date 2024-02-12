import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function deleteKost({ isOpen, onClose, targetKost }) {
    const handleDelete = () => {
        // Lakukan permintaan HTTP untuk menghapus data
        axios.delete(`/api/kost/${targetKost._id}`)
            .then((response) => {
                console.log("Data berhasil dihapus", response)
                toast.success('Data Telah Dihapus', {
                    position: 'top-right',
                    style: {
                        whiteSpace: 'nowrap',
                    },
                    autoClose: 3000,
                });
                onClose();


            })
            .catch((error) => {
                console.error("Error saat menghapus data", error);
                toast.error('Gagal menghapus data', {
                    position: 'top-right',
                    style: {
                        whiteSpace: 'nowrap',
                    },
                    autoClose: 3000,
                });
            });
    };
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded">
                        <p>Apakah Anda yakin akan menghapus data ini?</p>
                        <div className="mt-4 flex justify-end">
                            <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded mr-2">
                                Ya
                            </button>
                            <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Letakkan ToastContainer di luar kondisi agar selalu ditampilkan */}
            <ToastContainer />
        </>
    );

}