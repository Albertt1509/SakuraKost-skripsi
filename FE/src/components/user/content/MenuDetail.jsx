import { useState, useEffect, useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../UserContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MenuDetail() {
    const { id } = useParams();
    const [kost, setKost] = useState(null);
    const { user } = useContext(UserContext);
    const [durasi, setDurasi] = useState('bulan');
    const [simpan, setSimpan] = useState(false);
    const [harga, setHarga] = useState(0);
    const [navigate, setNavigate] = useState(false);
    const [tanggalPemesanan, setTanggalPemesanan] = useState("");

    const UntukHarga = () => {
        // Logika perhitungan harga sesuai durasi
        switch (durasi) {
            case '1bulan':
                return kost.price * 1;
            case '3bulan':
                return kost.price * 3;
            case '6bulan':
                return kost.price * 6;
            case '1tahun':
                return kost.price * 12;
            default:
                return kost.price;
        }
    };

    useEffect(() => {
        axios
            .get(`/api/kost/${id}`)
            .then((response) => {
                setKost(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    useEffect(() => {
        // Update harga setiap kali durasi berubah
        if (kost) {
            setHarga(UntukHarga());
        }
    }, [durasi, kost]);

    if (!kost) {
        return <div>Loading...</div>;
    }

    const formatNominal = (value) => {
        const floatValue = parseFloat(value);
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(floatValue);
    };

    const message = 'Hallo, Saya Tertarik Dengan Kost Milik Anda!';
    const whatsappLink = `https://wa.me/${kost.phoneNumber}?text=${encodeURIComponent(message)}`;

    const handleSaveClick = async () => {
        setSimpan(true);
        try {

            await axios.post(`/user/${user._id}/favorites/${id}`);
            toast.success('Disimpan di Favorite', {
                position: 'top-right',
                style: {
                    whiteSpace: 'nowrap',
                },
                autoClose: 3000,
            });
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };


    const handleBayarClick = () => {
        if (user) {
            if (tanggalPemesanan && durasi) {
                setNavigate(true);
            } else {
                toast.error('Mohon isi tanggal pemesanan dan pilih durasi terlebih dahulu', {
                    position: 'top-right',
                    style: {
                        whiteSpace: '',
                    },
                    autoClose: 3000,
                });
            }
        } else {
            setSimpan(false);
            toast.error('Silakan login terlebih dahulu ', {
                position: 'top-right',
                style: {
                    whiteSpace: 'nowrap',
                },
                autoClose: 3000,
            });
            return <Navigate to="/login" />;
        }
    };
    if (navigate) {
        return <Navigate to={`/content/${id}/pembayaran`} state={{ tanggalPemesanan, durasi, harga }} />;
    }

    return (
        <>
            <div className="flex justify-end p-6 ">
                <ToastContainer />
                <div className="flex flex-col bg-white w-[65vh] sm:h-[60vh] p-4 shadow-lg">
                    <h1 className='font-bold text-2xl'>{formatNominal(harga)}</h1>
                    <div className='mt-5 flex-grow'>
                        <h2 className="text-sm">Tanggal Pemesanan</h2>
                        <input
                            type="date"
                            onChange={(e) => setTanggalPemesanan(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                        <h2 className="text-sm mt-3">Durasi</h2>
                        <select
                            value={durasi}
                            onChange={(ev) => setDurasi(ev.target.value)}
                            className="border text-gray-400 border-gray-300 bg-white rounded-md px-4 py-3 mt-2 mb-2 w-full focus:outline-none focus:border-pink-500"
                        >
                            <option value="" disabled selected></option>
                            <option value="1bulan">Per 1 Bulan</option>
                            <option value="3bulan">Per 3 Bulan</option>
                            <option value="6bulan">Per 6 Bulan</option>
                            <option value="1tahun">Per 1 Tahun</option>
                        </select>
                    </div>
                    <div className="flex justify-center items-center mb-9">
                        <h1 className='text-sm text-center'>Ajukan Pertanyaan Jika Ada Hal yang Ingin Ditanyakan</h1>
                    </div>
                    <div className="flex justify-center bg-pink-400 p-2 text-white mb-3 gap-2 rounded-lg">
                        <button className=" text-white rounded">
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">Chat di WhatsApp</a>
                        </button>
                        <div className="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex justify-center w-full gap-2">
                        <div className="bg-pink-400 p-2 w-full flex justify-center items-center gap-2 text-white rounded-lg">
                            <button onClick={handleSaveClick} className="ml-2">Simpan</button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                            </svg>
                        </div>
                        <div className="bg-pink-400 p-2 w-full flex gap-2 justify-center text-white rounded-lg">
                            <button onClick={handleBayarClick} className="ml-2">Bayar</button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            {simpan && !user && <Navigate to="/login" />}
        </>
    );
}