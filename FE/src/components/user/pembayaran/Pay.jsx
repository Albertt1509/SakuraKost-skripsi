import { useState } from "react";

export default function Pembayaran() {
    const [selectedPayment, setSelectedPayment] = useState('');

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
                                <h1 className="text-sm ">Tanggal</h1>
                                <button className="text-sm ml-auto">Edit</button>
                            </div>
                        </div>
                        <div className="mt-5">
                            <h1 className="text-2xl font-bold">Durasi Pemesanan</h1>
                            <div className="flex">
                                <h1 className="text-sm ">Durasi</h1>
                                <button className="text-sm ml-auto">Edit</button>
                            </div>
                        </div>
                    </div>
                    <div className="border-2 border-solid p-3 rounded-lg mt-5 ">
                        <div className="">
                            <h1 className="text-2xl font-bold">Bayar Menggunakan</h1>
                            <select
                                value={selectedPayment}
                                onChange={(ev) => setSelectedPayment(ev.target.value)}
                                className="border text-gray-400 border-gray-300 bg-white rounded-md px-4 py-3 mt-2 mb-2 w-full focus:outline-none focus:border-pink-500"
                            >
                                <option value="">Pilih Pembayaran</option>
                                <option value="Transfer Bank">Transfer Bank</option>
                                <option value="Bayar Di Tempat">Bayar Di Tempat</option>
                            </select>
                        </div>
                        {selectedPayment && (
                            <>
                                <div className="flex justify-between">
                                    <div className=" ">
                                        <h1>Foto Selfi</h1>
                                        <input
                                            type="file"
                                            name="selfi"
                                            className="bg-white p-2 border mt-2 border-gray-300 rounded"
                                            onChange=""
                                            multiple
                                        />
                                    </div>
                                    {selectedPayment === "Transfer Bank" && (
                                        <div className="">
                                            <h1>Bukti Transfer</h1>
                                            <input
                                                type="file"
                                                name="transfer"
                                                className="bg-white p-2 border mt-2 border-gray-300 rounded"
                                                onChange=""
                                                multiple
                                            />
                                        </div>
                                    )}
                                </div>
                                {selectedPayment === "Transfer Bank" && (
                                    <div className="mt-3">
                                        <h1>No Rekening Tujuan</h1>
                                        <h1 className="font-bold">12312419</h1>
                                    </div>
                                )}

                            </>
                        )}
                    </div>
                    <div className="mt-5 ">
                        <button className="bg-pink-500 p-2 rounded-lg text-white flex ml-auto">Bayar</button>
                    </div>
                </div>

                <div className="sisi kanan w-1/2 p-4 ">
                    <div className="">
                        <h1>Konten kanan</h1>
                    </div>
                </div>
            </div>
        </>
    );
}
