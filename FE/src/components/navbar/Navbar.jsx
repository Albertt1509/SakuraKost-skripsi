import { useContext, useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import UserContext from "../user/userContext";
import Icon from '../../assets/polder/icon.png';

export default function Navbar() {
    const { user } = useContext(UserContext);
    const [scrolled, setScrolled] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const closeMenu = () => {
        setMenuVisible(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            setScrolled(isScrolled);
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navbarClasses = ` ${scrolled ? 'from-pink-500' : 'from-pink-100'}  fixed top-0 z-50  w-full`;

    return (
        <nav className={navbarClasses} >
            <header className=" flex  justify-between fixed top-0 z-50 p-4 w-full">
                <div className="hidden lg:flex items-center text-lg gap-4 justify-between">
                    <img
                        src={Icon}
                        alt=""
                        className='w-20 h-20 '
                    />

                    <Link to={'/'} className="flex items-center gap-1">
                        <span className="font-bold">Sakura Kost</span>
                    </Link>
                </div>
                {/* menu (visible on sm screen) */}
                <div className="hidden lg:flex items-center text-lg gap-4 justify-between">
                    <ul className="lg:flex items-center text-lg gap-4">
                        <li className="p-2 font-bold"> Dimana</li>
                        <div className="">|</div>
                        <a href="#kapan" className="p-2 font-bold">Kapan</a>
                        <div className="">|</div>
                        <a href="" className="p-2 font-bold">Siapa</a>
                    </ul>
                    <button className="border-primary p-3 rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-7 h-7 bg-pink-400 p-1 rounded-full text-white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </button>
                </div>
                <div className="login hidden lg:flex items-center text-lg gap-4 justify-between">
                    <Link to={user ? '/account' : '/login'} className="flex gap-2 rounded-lg p-3 items-center">
                        {!!user && <>{user.name}</>}
                        <div className=" p-1 flex items-center rounded-full bg-pink-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-white"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                />
                            </svg>
                        </div>
                    </Link>
                    {/* booking */}
                    <Link to={'/simpan'}>
                        <div className="booking p-1 text-white flex items-center rounded-full bg-pink-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                            </svg>
                        </div>
                    </Link>
                </div>
                {/* slide bar */}
                <div className={`sm:hidden fixed top-0 left-0 w-60 h-full bg-pink-600 transform ${menuVisible ? 'translate-x-0' : '-translate-x-60'} transition-transform duration-300 ease-in-out text-white p-4 pt-16`}>
                    <ul>
                        <li className="flex pt-3 pb-3 pl-3 gap-2 hover:opacity-100 items-center">
                            <Link to=''>Dimana</Link>
                        </li>
                        <a href="#kapan" className="flex pt-3 pb-3 pl-3 gap-2 hover:opacity-100 items-center">
                            Kapan
                        </a>
                        <li className="flex pt-3 pb-3 pl-3 gap-2 hover:opacity-100 items-center">
                            <Link to=''>Siapa</Link>
                        </li>
                        {/* Your existing user/account section */}
                        <Link to={user ? '/account' : '/login'} className="flex gap-2 rounded-lg p-3 items-center">
                            {!!user && <>{user.name}</>}
                            <div className=" p-1 flex items-center">
                                Login
                            </div>
                        </Link>

                        <div className="keranjang flex pt-3 pb-3 pl-3 gap-2 hover:opacity-100 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </div>
                    </ul>
                </div>
            </header>
            {/* button */}
            <div className="sm:hidden flex justify-between items-center">
                <div>
                    <img src={Icon} alt="" className="w-20 h-20" />
                </div>
                <div>
                    <button onClick={toggleMenu} className="bg-white p-1 rounded-lg mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
}