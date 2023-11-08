import React, { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { RiHomeSmile2Line } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function AdminPage() {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };
    const closeMenu = () => {
        setMenuVisible(false);
    };

    return (
        <nav className="">
            {/* AdminNav Component */}
            <div className="bg-pink-600 p-4 shadow-lg text-white flex justify-between items-center">
                {/* Logo */}
                <div className="logo">
                    <Link to={'/admin'} className="text-4xl font-black">Emu</Link>
                </div>
                {/* Hamburger Menu Button (visible in small screens) */}
                <div className="sm:hidden">
                    <button onClick={toggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
                {/* Menu (visible on large screens) */}
                <ul className={`hidden lg:flex mx-auto justify-center items-center text-lg gap-4`}>
                    <li className="flex pt-3 pb-3 pl-3 gap-2 hover:opacity-100 items-center">
                        <MdOutlineSpaceDashboard className="text-white" />
                        <Link to={'/admin/home'}>Home</Link>
                    </li>
                    <li className="relative group">
                        <div className="relative group flex pt-3 pb-3 p-3 gap-2 hover:opacity-100 items-center cursor-pointer" onClick={toggleMenu}>
                            <AiOutlineHome className="text-white" />
                            Kost
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 absolute right-4 top-1/2 -mt-3 transform group-hover:rotate-180 transition-transform duration-300 ease-in-out" style={{ left: '75px' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        {menuVisible && (
                            <ul className="absolute top-15 left-16 w-40  bg-white text-black border rounded-md p-2">
                                <li className="hover:bg-gray-200 cursor-pointer">
                                    <Link to={'/admin/kost'} onClick={closeMenu}>Add Kost</Link>
                                </li>
                                <li className="hover:bg-gray-200 cursor-pointer">
                                    <Link to={'/admin/edit'} onClick={closeMenu}>Edit Kost</Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    <li className="flex pt-3 pb-3 pl-3 gap-2 hover:opacity-100 items-center">
                        <RiHomeSmile2Line className="text-white" />
                        <Link to={'/admin/product'}>Order </Link>
                    </li>
                    <li className="flex pt-3 pb-3 pl-3 gap-2 hover:opacity-100 items-center">
                        <AiOutlineUser className="text-white" />
                        <Link to={'/admin/user'}>User</Link>
                    </li>
                </ul>
            </div>
            {/* Menu Slider (visible in small screens when toggled) */}
            <div className={`sm:hidden fixed top-0 left-0 w-60 h-full bg-pink-600 transform ${menuVisible ? 'translate-x-0' : '-translate-x-60'} transition-transform duration-300 ease-in-out text-white p-4 pt-16`}>
                <ul className="text-lg gap-4">
                    <li className="flex pt-3 pb-3 pl-3 gap-2 hover:opacity-100 items-center">
                        <MdOutlineSpaceDashboard className="text-white" />
                        <Link to={'/admin/home'}>Home</Link>
                    </li>
                    <li className="flex pt-3 pb-3 pl-3 gap-2 hover:opacity-100 items-center">
                        <AiOutlineHome className="text-white" />
                        <Link to={'/admin/kost'}>Kost</Link>
                    </li>
                    <li className="flex pt-3 pb-3 pl-3 gap-2 hover:opacity-100 items-center">
                        <RiHomeSmile2Line className="text-white" />
                        <Link to={'/admin/product'}>Order</Link>
                    </li>
                    <li className="flex pt-3 pb-3 pl-3 gap-2 hover:opacity-100 items-center">
                        <AiOutlineUser className="text-white" />
                        <Link to={'/admin/user'}>User</Link>
                    </li>
                </ul>
            </div>
            {/* Konten yang ditampilkan di samping kanan */}
        </nav >
    );
}
