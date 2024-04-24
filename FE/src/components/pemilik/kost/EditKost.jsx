import { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import Clock from '../../widget/Date';
import DeleteModal from './DeleteModal';
import Modal from './EditModal';
import UserContext from '../../user/UserContext';

export default function EditKost() {
    const [kostData, setKostData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedKost, setSelectedKost] = useState(null);
    const [isDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const { user } = useContext(UserContext);
    const openDeleteModal = (kost) => {
        setDeleteTarget(kost);
        setIsOpenDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setDeleteTarget(null);
        setIsOpenDeleteModal(false);
    };

    const openModal = (kost) => {
        setSelectedKost(kost);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedKost(null);
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (user) {
            let kostTitle = '';
            switch (user.name) {
                case 'adminOBH':
                    kostTitle = '65e6b4ac574143ff5f31bc65';
                    break;
                case 'adminHappy':
                    kostTitle = '65e6bc7410f1effb8cc32ea2';
                    break;
                case 'adminValentine':
                    kostTitle = '65e6beff10f1effb8cc32f0e';
                    break;
                case 'adminYesOke':
                    kostTitle = '65e7d8ce2394e01f68a74c2d';
                    break;
                case 'adminWinnie':
                    kostTitle = '662134a148e726063d89cc40';
                    break;
                case 'adminJurasic':
                    kostTitle = '6621e3a63eb96c836c06d32e';
                    break;
                case 'adminHebron':
                    kostTitle = '6621e5323eb96c836c06d330';
                    break;
                case 'admin':
                    kostTitle = '6627ec1c5a715d9b543d8e25';
                    break;

            }

            Axios.get('/api/kost')
                .then((response) => {
                    const filteredKostData = response.data.filter((kost) => kost._id === kostTitle);
                    setKostData(filteredKostData);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [user]);


    return (
        <div className="bg-gray-100 h-screen w-full">
            <h1 className="font-bold text-4xl p-6">Lihat Kost</h1>
            <div className="bg-white m-6 p-[30px] border-solid border-[#BAC7D5] border rounded">
                <div className="mx-5">
                    <div className="flex py-2.5 px-6 justify-between border-solid bg-white">
                        <div className="w-full md:w-1/4 p-4 flex items-center">
                            <Clock />
                        </div>
                        {user && <h1 className='font-bold p-6'>{user.name}</h1>}
                    </div>
                </div>
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="border px-0.5 py-1">NO</th>
                            <th className="border px-4 py-2">Pemilik</th>
                            <th className="border px-4 py-2">Lokasi</th>
                            <th className="border px-4 py-2">No Handphone</th>
                            <th className="border px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kostData.map((item, index) => (
                            <tr key={index}>
                                <td className="border px-2 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{item.owner}</td>
                                <td className="border px-4 py-2">{item.location}</td>
                                <td className="border px-4 py-2">{item.phoneNumber}</td>
                                <td className="border px-4 py-2 ">
                                    <div className="flex justify-center mx-auto items-center gap-2">
                                        <button onClick={() => openModal(item)} className='update'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="edit w-7 h-7 bg-green-400 p-1 rounded-lg">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </button>
                                        <button onClick={() => openDeleteModal(item)} className='delete'>
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
            <DeleteModal isOpen={isDeleteModal} onClose={closeDeleteModal} targetKost={deleteTarget} />
            <Modal isOpen={isModalOpen} onClose={closeModal} kost={selectedKost} />
        </div>
    );
}
