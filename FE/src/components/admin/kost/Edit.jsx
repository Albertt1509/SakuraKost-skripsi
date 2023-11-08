import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Clock from '../../widget/Date';
import Modal from './editModal'; // Pastikan Anda telah mengimpor komponen modal Anda

export default function EditKost() {
    const [kostData, setKostData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedKost, setSelectedKost] = useState(null);

    const openModal = (kost) => {
        setSelectedKost(kost);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedKost(null);
        setIsModalOpen(false);
    };

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
        <div className="bg-gray-100 h-screen w-full">
            <h1 className="font-bold text-4xl p-6">Edit Kost</h1>
            <div className="bg-white m-6 p-[30px] border-solid border-[#BAC7D5] border rounded">
                <div className="mx-5">
                    <div className="flex py-2.5 px-6 justify-between border-solid bg-white">
                        <div className="w-full md:w-1/4 p-4 flex items-center">
                            <Clock />
                        </div>
                        <div className="w-full md:w-1/4 p-4 flex items-center">
                            <div className="py-2 px-1.5625rem flex items-center gap-4 w-full rounded border-solid">
                                <input className="w-full" type="text" placeholder="Search..." />
                                <div className="relative">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="border px-0.5 py-1">NO</th>
                            <th className="border px-4 py-2">Owner</th>
                            <th className="border px-4 py-2">Location</th>
                            <th className="border px-4 py-2">Phone</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kostData.map((kost, index) => (
                            <tr key={index}>
                                <td className="border px-2 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{kost.owner}</td>
                                <td className="border px-4 py-2">{kost.location}</td>
                                <td className="border px-4 py-2">{kost.phoneNumber}</td>
                                <td className="border px-4 py-2"></td>
                                <td className="border px-4 py-2 ">
                                    <div className="flex justify-center mx-auto items-center gap-2">
                                        <button onClick={() => openModal(kost)} className=''>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="edit w-7 h-7 bg-green-400 p-1 rounded-lg">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </button>
                                        <button className=''>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 bg-red-400 p-1 rounded-lg">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>

                                        </button>
                                    </div>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} kost={selectedKost} />
        </div>
    );
}
