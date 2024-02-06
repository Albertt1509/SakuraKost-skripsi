import Axios from "axios";
import { useEffect, useState } from "react";

const Data = () => {
    const [kostCount, setKostCount] = useState(0);
    const [userData, setUserData] = useState([]);
    const [pemesanan, setPemesanan] = useState([]);
    const [selesai, setSelesai] = useState([]);
    const [batal, setBatal] = useState([]);

    useEffect(() => {
        Axios.get('/api/kost')
            .then((response) => {
                setKostCount(response.data.length);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    useEffect(() => {
        Axios.get('/api/batal')
            .then((response) => {
                setBatal(response.data.length);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    useEffect(() => {
        Axios.get('/api/selesai')
            .then((response) => {
                setSelesai(response.data.length);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    useEffect(() => {
        Axios.get('/api//dataPesanan')
            .then((response) => {
                setPemesanan(response.data.length);
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

    const userCount = userData.filter((user) => user.role === 'user').length;
    const adminCount = userData.filter((user) => user.role === 'admin').length;
    const superAdminCount = userData.filter((user) => user.role === 'superAdmin').length;

    return (

        <div className="flex gap-5">
            <div className="p-2 bg-white rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Data Jumlah Total Kos</h1>
                <div className="flex justify-center">
                    <p>Total Data Kos : {kostCount}</p>
                </div>
            </div>
            <div className="p-2 bg-white rounded-lg ">
                <h1 className="text-2xl font-bold mb-4">Data Jumlah Akun</h1>
                <div className="">
                    <p>Total User : {userCount}</p>
                    <p>Total Super Admin : {superAdminCount}</p>
                    <p>Total Admin : {adminCount}</p>
                </div>
            </div>
            <div className="p-2 bg-white rounded-lg ">
                <h1 className="text-2xl font-bold mb-4">Data Pesanan</h1>
                <div className="">
                    <p>Total Pemesanan Masuk : {pemesanan}</p>

                </div>
            </div>
            <div className="p-2 bg-white rounded-lg ">
                <h1 className="text-2xl font-bold mb-4">Data Pesanan Selesai</h1>
                <div className="">
                    <p>Total Pemesanan Selesai : {selesai}</p>
                </div>
            </div>
            <div className="p-2 bg-white rounded-lg ">
                <h1 className="text-2xl font-bold mb-4">Data Pesanan Dibatalkan</h1>
                <div className="">
                    <p>Total Pemesanan Dibatalkan : {batal}</p>
                </div>
            </div>
        </div>
    );
};

export default Data;
