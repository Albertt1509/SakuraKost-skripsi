import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Modal from "./ModalPay";
import Rule from './Rule'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const KopiButton = ({ textToCopy, onCopy, onButtonClick }) => {
    const [kopi, setKopi] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setKopi(true);
                setTimeout(() => {
                    setKopi(false);
                }, 3000);

                // Trigger copy action if needed
                if (typeof onCopy === 'function') {
                    onCopy();
                }
            })
            .catch((error) => {
                console.error('Error copying to clipboard:', error);
            });
    };

    return (
        <button
            onClick={() => {
                copyToClipboard();
                // Trigger onButtonClick if provided
                if (typeof onButtonClick === 'function') {
                    onButtonClick();
                }
            }}
            className="bg-pink-500 text-white rounded-md p-1 cursor-pointer ml-2"
        >
            {kopi ? (
                <span>✅</span>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                    </svg>

                </svg>
            )}
        </button>
    );
};
export default function Pembayaran() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [kost, setKost] = useState('');
    const [name, setName] = useState('')
    const location = useLocation();
    const [jenisPembayaran, setJenisPembayaran] = useState('');
    const [tanggalPemesanan, setTanggalPemesanan] = useState("");
    const [durasi, setDurasi] = useState("");
    const [harga, setHarga] = useState(0);
    const [paymentClicked, setPaymentClicked] = useState(false);
    const [modal, setModal] = useState(false)
    const [selfiFile, setSelfiFile] = useState(null);
    const [transferFile, setTransferFile] = useState(null);

    useEffect(() => {
        if (location.state) {
            setTanggalPemesanan(location.state.tanggalPemesanan);
            setDurasi(location.state.durasi);
            setHarga(location.state.harga);
        }
    }, [location.state]);

    useEffect(() => {
        axios.get(`/api/profile/`).then((response) => {
            setName(response.data.name);
        }).catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, []);

    useEffect(() => {
        axios.get(`/api/kost/${id}`).then((response) => {
            setKost(response.data);
        }).catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, [id]);

    useEffect(() => {
        axios.get(`/api/kost/${id}`).then((response) => {
            setTitle(response.data.title);
        }).catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, [id]);

    const formatNominal = (value) => {
        const floatValue = parseFloat(value);
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(floatValue);
    };

    const formatDurasi = (durasi) => {
        const match = durasi.match(/(\d+)(\w+)/);
        if (match) {
            const angka = match[1];
            const teks = match[2];
            return `${angka} ${teks}`;
        }
        return durasi;
    };

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
    const handleBayarClick = async (e) => {
        e.preventDefault();
        if (title && name && jenisPembayaran && tanggalPemesanan && durasi && harga && !paymentClicked) {
            setModal(true);
        } else {
            console.error('Incomplete payment data or already clicked. Please fill in all required fields.');
        }
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (type === 'selpi') {
            setSelfiFile(file);
        } else if (type === 'transfer') {
            setTransferFile(file);
        }
    };


    const handleKonfirmasiPembayaran = async () => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('name', name);
            formData.append('jenisPembayaran', jenisPembayaran);
            formData.append('tanggalPemesanan', tanggalPemesanan);
            formData.append('durasi', durasi);
            formData.append('harga', harga);

            // Jika jenis pembayaran adalah 'Transfer Bank', tambahkan file selfi dan transfer ke FormData
            if (jenisPembayaran === 'Transfer Bank') {
                if (selfiFile) {
                    formData.append('selpi', selfiFile);
                }
                if (transferFile) {
                    formData.append('transfer', transferFile);
                }
            }
            // Jika jenis pembayaran adalah 'Bayar Di Tempat', tambahkan file selfi dan transfer ke FormData
            if (jenisPembayaran === 'Bayar Di Tempat' && selfiFile) {
                formData.append('selpi', selfiFile);
            }

            // Kirim permintaan POST dengan FormData
            const response = await axios.post('/api/pemesanan', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Response from server:', response.data);

            setPaymentClicked(true);
            setModal(false);
            if (response.status === 200) {
                toast.success('Pembayaran sukses', {
                    position: 'top-right',
                    style: {
                        whiteSpace: 'nowrap',
                    },
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error('Error making payment:', error);
            if (error.response) {
                console.error('HTTP Status:', error.response.status);
            }
        }
    };

    return (
        <>
            <div style={containerStyle}>
                <div style={topContainerStyle}></div>
                <div className="md:flex md:mr-auto md:mt-[80px] p-6">
                    <div className="text-4xl font-bold">
                        <h1>Ajukan Pemesanan</h1>
                    </div>
                </div>
            </div>
            <div className="p-6 flex flex-col md:flex-row justify-center align-center">
                <div className="w-1/2 p-4 ">
                    <form onSubmit={handleBayarClick} encType="multipart/form-data">
                        <div className="rincian border-2 border-solid  p-3 rounded-lg">
                            <div className="">
                                <h1 className="text-2xl font-bold">Kost Pesanan Anda</h1>
                                <div className="flex">
                                    <h1 className="text-sm">{title}</h1>
                                </div>
                            </div>
                            <div className="mt-5">
                                <h1 className="text-2xl font-bold">Tanggal Pesanan Anda</h1>
                                <div className="flex">
                                    <h1 className="text-sm" >{tanggalPemesanan}</h1>
                                </div>
                            </div>
                            <div className="mt-5">
                                <h1 className="text-2xl font-bold">Durasi Pemesanan</h1>
                                <div className="flex">
                                    <h1 className="text-sm ">{formatDurasi(durasi)}</h1>
                                </div>
                            </div>
                            <div className="mt-5">
                                <h1 className="text-2xl font-bold">Total Harga</h1>
                                <div className="flex">
                                    <h1 className="text-sm ">{formatNominal(harga)}</h1>
                                </div>
                            </div>
                            <div className="mt-5">
                                <h1 className="text-2xl font-bold">Nama Pembeli</h1>
                                <div className="flex">
                                    <h1 className="text-sm ">{name}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="border-2 border-solid p-3 rounded-lg mt-5 ">
                            <div className="">
                                <h1 className="text-2xl font-bold">Bayar Menggunakan</h1>
                                <select
                                    value={jenisPembayaran}
                                    onChange={(ev) => setJenisPembayaran(ev.target.value)}
                                    className="border text-gray-400 border-gray-300 bg-white rounded-md px-4 py-3 mt-2 mb-2 w-full focus:outline-none focus:border-pink-500"
                                >
                                    <option value="">Pilih Pembayaran</option>
                                    <option value="Transfer Bank">Transfer Bank</option>
                                    <option value="Bayar Di Tempat">Bayar Di Tempat</option>
                                </select>
                            </div>
                            {jenisPembayaran && (
                                <>
                                    <div className="flex justify-between">
                                        <div className=" ">
                                            <h1>Foto Selfi</h1>
                                            <p className="text-sm text-slate-500">Gambar tidak lebih dari 2Mb</p>
                                            <input
                                                type="file"
                                                name="selpi"
                                                id="selpi"
                                                className="bg-white p-2 border mt-2 border-gray-300 rounded"
                                                onChange={(e) => handleFileChange(e, 'selpi')}
                                            />
                                        </div>
                                        {jenisPembayaran === "Transfer Bank" && (
                                            <div className="">
                                                <h1>Bukti Transfer</h1>
                                                <p className="text-sm text-slate-500">Gambar tidak lebih dari 2Mb</p>
                                                <input
                                                    type="file"
                                                    name="transfer"
                                                    className="bg-white p-2 border mt-2 border-gray-300 rounded"
                                                    onChange={(e) => handleFileChange(e, 'transfer')}
                                                />

                                                <div className="mt-3 mr-auto">
                                                    <h1>No Rekening Tujuan</h1>
                                                    <div className="flex">
                                                        <h1 className="font-bold">{kost.rekening}</h1>
                                                        <KopiButton
                                                            textToCopy={kost.rekening}
                                                            onButtonClick={() => setPaymentClicked(true)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {jenisPembayaran === "Bayar Di Tempat" && (
                                        <div className=""></div>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="mt-5 ">
                            <button className="bg-pink-500 p-2 rounded-lg text-white flex ml-auto" onClick={handleBayarClick}>Bayar</button>
                        </div>
                    </form>
                </div>
                <div className="w-full md:w-1/2 flex mt-4 md:border-2 md:border-solid p-3 md:rounded-lg">
                    <Rule />
                </div>
                <ToastContainer />
            </div>
            <Modal
                visible={modal}
                onConfirm={handleKonfirmasiPembayaran}
                onCancel={() => setModal(false)}
            />
        </>
    );
}