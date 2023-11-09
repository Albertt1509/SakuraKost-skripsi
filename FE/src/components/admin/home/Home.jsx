import React, { useState, useEffect } from "react"
import Axios from "axios"

export default function Home() {
    const [kostData, setKostData] = useState([]);
    useEffect(() => {
        Axios.get('/api/kost')
            .then((response) => {
                setKostData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    return (
        <>
            <div className="bg-gray-100 h-[1000px] w-full ">
                <h1 className="text-4xl font-bold p-6">Home</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                    {kostData.map((kost, index) => (
                        <div key={index} className="bg-white shadow-sm rounded-lg m-4 mx-auto w-[354px] h-[368px] md:justify-self-end">
                            <nav className='flex justify-between p-4'>
                                <h1 className='font-bold text-2xl'>{kost.title}</h1>
                            </nav>
                            <div className="justify-between items-center pt-5 pl-6 pr-3">
                            </div>
                            {/*total*/}
                            <div className="flex justify-between font-bold pt-9 pl-3 pr-3">
                                <h1 className='total'>Total</h1>
                                <h1>19</h1>
                            </div>
                            <hr className="border-black ml-3 mr-3 mt-6" />
                            {/*kotak*/}
                            <div className="flex pl-3 pr-3 mt-4 ">
                                <div className=" rounded-sm w-3 h-3 bg-blue-500 mt-2"></div>
                                <h1 className='pl-2 mt-0.5'>Laki Laki</h1>
                                <h1 className='pl-2 mt-0.5 ml-auto'>8</h1>
                            </div>
                            <div className="flex pl-3 pr-3 ">
                                <div className=" rounded-sm w-3 h-3 bg-orange-300 mt-2"></div>
                                <h1 className='pl-2 mt-0.5'>Perempuan</h1>
                                <h1 className='pl-2 mt-0.5 ml-auto'>11</h1>
                            </div>
                            <div className=" flex justify-center  place-items-end p-2 text-white pt-[80px]">
                                <button className="bg-pink-600 p-2 rounded-lg">Detail</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </>
    )

}