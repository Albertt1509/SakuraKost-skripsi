import { useContext, useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import UserContext from "../../components/user/UserContext";
import Icon from '../../assets/polder/icon.png';

export default function Navbar() {
    const { user } = useContext(UserContext);
    const [scrolled, setScrolled] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
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
                        <span className="font-bold">Sakura Kos</span>
                    </Link>
                </div>
                {/* menu (visible on sm screen) */}
                <div className="hidden lg:flex items-center text-lg gap-4 justify-between">
                    <ul className="lg:flex items-center text-lg gap-4">
                        <li className="p-2 font-bold"> Dimana</li>
                        <div className="">|</div>
                        <li className="p-2 font-bold">Kapan</li>
                        <div className="">|</div>
                        <li className="p-2 font-bold">Siapa</li>
                    </ul>
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
                    <Link to={'/favorite'}>
                        <div className="booking p-1 text-white flex items-center rounded-full bg-pink-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                            </svg>
                        </div>
                    </Link>
                    <Link to={'/status'}>
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
                            <a href="/"> Sakura</a>
                        </li>
                        <a href="/favorite" className="flex pt-3 pb-3 pl-3 gap-2 hover:opacity-100 items-center">
                            Favorite
                        </a>
                        <li className="flex pt-3 pb-3 pl-3 gap-2 hover:opacity-100 items-center">
                            <a href="/status"> Status Pembayaran</a>
                        </li>
                        {/* Your existing user/account section */}
                        <Link to={user ? '/account' : '/login'} className="flex gap-2 rounded-lg p-3 items-center">
                            {!!user && <>{user.name}</>}
                            <div className=" p-1 flex items-center">
                                Login
                            </div>
                        </Link>

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