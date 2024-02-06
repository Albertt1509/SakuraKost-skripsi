import { useState, useEffect } from "react"
import Axios from "axios"

export default function Home() {
    const [kostData, setKostData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [pesanan, setPesanan] = useState([]);
    const [batal, setBatal] = useState([]);

    useEffect(() => {
        Axios.get('/api/kost')
            .then((response) => {
                setKostData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        Axios.get('/api/users')
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    useEffect(() => {
        Axios.get('/api/selesai')
            .then((response) => {
                setPesanan(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    useEffect(() => {
        Axios.get('/api/selesai')
            .then((response) => {
                setBatal(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <div className="bg-gray-100 min-h-[1000px] w-full ">
                <h1 className="text-4xl font-bold p-6">Home</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-2">Data Kost</h2>
                        <p>Jumlah Kos: {kostData.length}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <h2 className="text-xl font-bold mb-2">Data Pengguna</h2>
                        <p>Jumlah Pengguna Aktif: {userData.length}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <h2 className="text-xl font-bold mb-2">Data Pesanan Selesai</h2>
                        <p>Jumlah Pesanan : {pesanan.length}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <h2 className="text-xl font-bold mb-2">Data Pesanan Dibatalkan</h2>
                        <p>Jumlah Pesanan : {batal.length}</p>
                    </div>
                </div>
            </div >
        </>
    )

}
