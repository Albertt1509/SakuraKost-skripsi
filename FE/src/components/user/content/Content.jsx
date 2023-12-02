import axios from 'axios';
import { useState, useEffect } from 'react';
import KostList from './KostList';

export default function Menu() {
    const [jenisKos, setJenisKost] = useState("");
    const [hargaMin, setHargaMin] = useState("");
    const [hargaMax, setHargaMax] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    const handleJenisKosChange = (event) => {
        setJenisKost(event.target.value);
    };

    const handleHargaMinChange = (event) => {
        setHargaMin(event.target.value);
    };

    const handleHargaMaxChange = (event) => {

        setHargaMax(event.target.value);
    };
    //get data min and max price
    const fetchData = async () => {
        try {
            var apiUrl = "/api/kost";

            if (jenisKos) {
                apiUrl += `?jenis=${jenisKos}`;
            }

            if (hargaMin) {
                apiUrl += apiUrl.includes("?") ? "&" : "?";
                apiUrl += `hargaMin=${hargaMin}`;
            }

            if (hargaMax) {
                apiUrl += apiUrl.includes("?") || hargaMin ? "&" : "?";
                apiUrl += `hargaMax=${hargaMax}`;
            }

            const response = await axios.get(apiUrl);
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        const fetchDataAndPrices = async () => {
            try {
                const response = await axios.get('/api/kost');
                setSearchResults(response.data);

                const prices = response.data.map((kost) => kost.price);
                setMinPrice(Math.min(...prices));
                setMaxPrice(Math.max(...prices));

                setHargaMin("");
                setHargaMax("");
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataAndPrices();
    }, []);

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
                                    <option value="">Pilih Tipe Kost</option>
                                    <option value="Laki-Laki">Kost Laki Laki</option>
                                    <option value="Perempuan">Kost Perempuan</option>
                                    <option value="Campuran">Kost Campuran</option>
                                </select>
                            </div>
                            <div className="flex flex-col w-full">
                                <h1 className="mb-1">Rentang Harga</h1>
                                <input
                                    type="text"
                                    value={hargaMin}
                                    onChange={handleHargaMinChange}
                                    className="border p-2 w-full"
                                    placeholder={`Rp. ${minPrice.toLocaleString('id-ID')}`}
                                />
                            </div>
                            <div className="flex pt-[28px]">
                                <h1 className='flex justify-center items-center'>-</h1>
                            </div>
                            <div className="flex flex-col w-full pt-[28px]">
                                <input
                                    type="text"
                                    value={hargaMax}
                                    onChange={handleHargaMaxChange}
                                    className="border p-2 w-full"
                                    placeholder={`Rp. ${maxPrice.toLocaleString('id-ID')}`}
                                />
                            </div>
                            <div className="flex pt-[30px] ">
                                <button onClick={fetchData} className='bg-pink-500 p-3 w-[100px] h-[50px] rounded-lg text-white'> Cari</button>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
            <div className="p-6 mt-8 flex flex-row">
                <KostList jenisKos={jenisKos} kostData={searchResults} />
            </div>
        </>
    );
}
