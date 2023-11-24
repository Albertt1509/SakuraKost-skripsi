import KostList from './KostList';
import { useState } from 'react';
import axios from 'axios';

export default function Menu() {
    const [jenisKos, setJenisKos] = useState("Laki-Laki");
    const [hargaMin, setHargaMin] = useState("");
    const [hargaMax, setHargaMax] = useState("");
    const [kostData, setKostData] = useState([]);

    const handleJenisKosChange = (event) => {
        setJenisKos(event.target.value);
    };

    const handleHargaMinChange = (event) => {
        const input = event.target.value;
        const sanitizedInput = input.replace(/[^\d]/g, '');
        const parsedInput = parseInt(sanitizedInput, 10);
        setHargaMin(isNaN(parsedInput) ? 0 : parsedInput);
    };

    const handleHargaMaxChange = (event) => {
        const input = event.target.value;
        const sanitizedInput = input.replace(/[^\d]/g, '');
        const parsedInput = parseInt(sanitizedInput, 10);
        setHargaMax(isNaN(parsedInput) ? 0 : parsedInput);
    }
    const handleCariClick = async () => {
        try {
            const response = await axios.get(`/api/kost?jenis=${jenisKos}&hargaMin=${hargaMin}&hargaMax=${hargaMax}`);
            setKostData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
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

    return (
        <>
            <div style={containerStyle}>
                <div style={topContainerStyle}></div>
                <header className="search items-center justify-center p-4 ">
                    <div className="search bg-white p-4 rounded-md shadow-md w-50 relative z-10" style={{ marginTop: '20%' }}>
                        <div className=" flex gap-2">
                            <div className="flex flex-col w-full">
                                <label htmlFor="tipeKos" className="mb-1">Tipe Kos</label>
                                <select
                                    id="tipeKos"
                                    value={jenisKos}
                                    onChange={handleJenisKosChange}
                                    className="border text-gray-400 border-gray-300 bg-white rounded-md px-4 py-2 mt-2 mb-2 w-full focus:outline-none focus:border-blue-500"
                                >
                                    <option value="Laki-Laki">Kost Laki Laki</option>
                                    <option value="Perempuan">Kost Perempuan</option>
                                    <option value="Campuran">Kost Campuran</option>
                                </select>
                            </div>
                            <div className="flex flex-col w-full">
                                <h1 className="mb-1">Rentang Harga</h1>

                                <input
                                    type="text"
                                    value={hargaMin.toLocaleString('id-ID')}
                                    onChange={handleHargaMinChange}
                                    className="border p-2 w-full"
                                    placeholder="Rp. 550.000"
                                />
                            </div>
                            <div className="flex pt-[28px]">
                                <h1 className='flex justify-center items-center'>-</h1>
                            </div>
                            <div className="flex flex-col w-full pt-[28px]">
                                <input
                                    type="text"
                                    value={hargaMax.toLocaleString('id-ID')}
                                    onChange={handleHargaMaxChange}
                                    className="border p-2 w-full"
                                    placeholder="Rp. 2.550.000"
                                />
                            </div>
                            <div className="flex pt-[30px] ">
                                <button onClick={handleCariClick} className='bg-pink-500 p-3 w-[100px] h-[50px] rounded-lg text-white'> Cari</button>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
            <div className="p-6 mt-8 flex flex-row">
                <KostList kostData={kostData} />
            </div>
        </>
    );
}
