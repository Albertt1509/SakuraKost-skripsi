import React from "react";
import Image from '../../../assets/polder/pxfuel2.jpg';
import { FaFacebook } from 'react-icons/fa';
import { BsInstagram } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai';
import Spiral from '../../../assets/polder/icon.png';
import Card from './Grid';
import BgKost from '../../../assets/polder/bgkost.png'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cover1 from "../../../assets/polder/contoh1.jpeg";
import Cover2 from "../../../assets/polder/contoh2.jpeg";
import Cover3 from "../../../assets/polder/contoh3.jpg";
import { Link } from "react-router-dom";
const Home = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const dummyData = [
        {
            id: 1,
            image: Cover1,
            address: "Kos Ganteng",
            price: "Rp. 10.000.000",
            rating: 4,
        },
        {
            id: 2,
            image: Cover2,
        },
        {
            id: 3,
            image: Cover3,
        },
    ];

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

            </div>

            {/* Card Section */}
            <div className="bg-pink-200 w-full p-4 rounded-lg ">
                <p className="flex justify-center item-center text-sm opacity-40 p-5">Cari Sekarang</p>
                <h1 className="flex justify-center text-4xl text-center mb-5 font-bold">Sakura Kost Tempat Yang Tepat Menemukan Hunianmu </h1>
                <div className="grid grid-cols-3 gap-4 items-end p-3 ">
                    <Card className='1 ' title="Lokasi" content="Area kost" />
                    <Card className='2' title="Fasilitas" content="Fasilitas kost" />
                    <Card className='3' title="Pemesanan" content="Content for Card 3" />
                </div>
            </div>

            {/* Spiral Section */}
            <div className="w-full">
                <div className="flex justify-center items-center mx-auto space-x-4 p-4 max-w-full">
                    {Array.from({ length: 4 }, (_, index) => (
                        <div key={index} className="flex-shrink-0 relative ">
                            <div className="w-16 h-16 bg-pink-500 rounded-full hover:ring-4 hover:ring-white transition-transform transform hover:scale-90">
                                <img src={Spiral} alt="Spiral" className="absolute inset-0 w-full h-full object-cover rounded-full " />
                            </div>
                        </div>
                    ))}
                </div>
                <p className="flex justify-center item-center text-sm opacity-40 p-5">Tunggu Apa Lagi</p>
                <h1 className="flex justify-center text-4xl text-center mb-5 font-bold">Tertarik? Dapatkan Sekarang!!!</h1>
                {/* Slider Section */}
                <img src={BgKost} alt="" className=" object-cover opacity-89" />
                <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-6">
                        <div className="bg-white shadow-sm rounded-lg m-4 w-[358px] md:justify-self-end relative">
                            <Slider {...settings}>
                                {dummyData.map((item) => (
                                    <div key={item.id}>
                                        <img src={item.image} className="object-cover w-full h-64 rounded-t-lg" alt={`Slide ${item.id}`} />
                                    </div>
                                ))}
                            </Slider>
                            <Link to={'/content'} className="p-4">
                                <div className="p-4">
                                    <div className="mb-2 text-xl font-bold ">{dummyData[0].address}</div>
                                    <div className="mb-2">Harga: {dummyData[0].price}</div>
                                    <div className="flex items-center">
                                        <span className="mr-1">Rating:</span>
                                        {Array.from({ length: dummyData[0].rating }, (_, index) => (
                                            <svg key={index} xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
            <footer className="text-center p-4 bg-pink-400">
                &copy; 2023 Sakura Kost.🌸
            </footer>
        </div>
    );
};

export default Home;
