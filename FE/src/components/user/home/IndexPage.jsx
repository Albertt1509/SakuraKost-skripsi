import { useEffect, useState } from "react";
import Image from '../../../assets/polder/pxfuel2.jpg';
import { FaFacebook } from 'react-icons/fa';
import { BsInstagram } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai';
import { Location, Payment, Booking } from './jsonAnimation'
import { CiMusicNote1 } from "react-icons/ci";
import Music from './music'
import Data from './Data'
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [kosts, setKosts] = useState([]);
    const playPauseHandler = () => {
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/kost");
                setKosts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const showMoreLink = kosts.length > 3;
    return (
        <div className="relative w-full h-screen scroll-behavior-smooth">
            <div className="relative col-span-3">
                <img
                    src={Image}
                    className="w-full h-full object-cover opacity-89"
                    alt="Deskripsi Gambar"
                />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent"></div>
                {/* Teks h1 di tengah atas */}
                <h5 className="sakura absolute top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-pink-500">
                    Sakura Kost
                </h5>
            </div>

            {/* Social Media Section */}
            {!isMobile && (
                <div className="flex absolute bottom-0 left-0 p-2 ml-2 mb-2 space-x-6">
                    <div className="bg-pink-500 rounded-full p-2 flex items-center justify-center">
                        <FaFacebook size={20} color="white" />
                    </div>
                    <div className="bg-pink-500 rounded-full p-2 flex items-center justify-center">
                        <BsInstagram size={20} color="white" />
                    </div>
                    <div className="bg-pink-500 rounded-full p-2 flex items-center justify-center">
                        <AiOutlineMail size={20} color="white" />
                    </div>
                    <button
                        className={`bg-pink-500 rounded-full p-2 flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`}
                        onClick={playPauseHandler}
                    >
                        <CiMusicNote1 size={20} color="white" />
                        <Music isPlaying={isPlaying} />
                    </button>
                </div>
            )}
            {/* sm */}

            {/* Card Section */}
            <div className="kapan bg-pink-200 w-full p-4 rounded-lg pb-[100px]" >
                <p className="flex justify-center item-center text-sm opacity-40 p-5">Cari Sekarang</p>
                <h1 className="flex justify-center text-4xl text-center mb-5 font-bold">Sakura Kost Tempat Yang Tepat Menemukan Hunianmu </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Card 1 */}
                    <div className="bg-white p-4 rounded-lg " id="kapan">
                        <p className="text-sm opacity-40 p-5 text-center">Pilih Lokasi</p>
                        <div className='flex justify-center items-center'>
                            <Location />
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm opacity-40 p-5 text-center">Pesan</p>
                        <div className="flex justify-center items-center">
                            <Booking />
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm opacity-40 p-5 text-center">Bayar</p>
                        <div className="flex justify-center items-center ">
                            <Payment className='mb-5' />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white opacity-80 w-full rounded-lg ">
                <p className="flex justify-center text-red-600 item-center text-sm  p-5">Tunggu Apa Lagi</p>
                <h1 className="flex justify-center text-4xl text-center mb-5 font-bold">Tertarik? Dapatkan Sekarang!!!</h1>
                <div className="bg-white w-full p-4 rounded-lg ">
                    <div className="flex justify-end mt-4">
                        {showMoreLink && (
                            <Link to="/content" className="text-red-500 hover:underline">
                                Lihat Lebih Banyak
                            </Link>
                        )}
                    </div>
                    <Data />
                </div>
            </div>
            {/* Footer Section */}
            <footer className="text-center p-4 bg-pink-400">
                <div className="flex justify-center space-x-6">
                    {isMobile && (
                        <>
                            <div className="bg-pink-500 rounded-full p-0 flex items-center justify-center">
                                <FaFacebook size={20} color="white" />
                            </div>
                            <div className="bg-pink-500 rounded-full p-2 flex items-center justify-center">
                                <BsInstagram size={20} color="white" />
                            </div>
                            <div className="flex items-center">
                                <p>&copy; 2023 Sakura Kost.🌸</p>
                            </div>
                            <div className="bg-pink-500 rounded-full p-2 flex items-center justify-center">
                                <AiOutlineMail size={20} color="white" />
                            </div>
                            <div className="bg-pink-500 rounded-full p-2 flex items-center justify-center">
                                <CiMusicNote1 size={20} color="white" />
                            </div>
                        </>
                    )}
                    <div className="hidden lg:flex">
                        <p>&copy; 2024 Sakura Kost.🌸</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
