import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Modal = ({ isOpen, onClose, kost }) => {
    const [editedKost, setEditedKost] = useState({ ...kost });

    useEffect(() => {
        // Update the editedKost state when kost prop changes
        setEditedKost({ ...kost });
    }, [kost]);


    //update photos
    const handlePhotoChange = (e) => {
        const { name, files } = e.target;

        // Mengambil file-file yang dipilih
        const selectedPhotos = Array.from(files);

        // Mengupdate editedKost.photos dengan array file-file yang dipilih
        setEditedKost((prevState) => ({
            ...prevState,
            [name]: selectedPhotos,
        }));
    };
    //save update data
    const handleSave = async () => {
        try {
            const formData = new FormData();
            for (const key in editedKost) {
                if (key === 'photos') {
                    for (let i = 0; i < editedKost[key].length; i++) {
                        formData.append('photos', editedKost[key][i]);

                    }
                } else {
                    formData.append(key, editedKost[key]);
                }
            }

            await axios.put(`/api/kost/${editedKost._id}`, formData);
            toast.success('Data Telah Disimpan', {
                position: 'top-right',
                style: {
                    whiteSpace: 'nowrap',
                },
                autoClose: 3000,
            });
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput) {
                fileInput.value = '';
            }
            setEditedKost({
                title: '',
                address: '',
                location: '',
                photos: [],
                capacity: '',
                owner: '',
                kamar: '',
                jenis: '',
                price: '',
                statusKamar: '',
                rekening: '',
                phoneNumber: '',
                description: '',
                moreinfo: '',
                wifi: false,
                parking: false,
                kitchen: false,
                laundry: false,
                servant: false,
                free: false,
                fullRoom: false,
                pet: false,
                energy: false,
                water: false,
            });
        } catch (error) {
            console.error(error, 'gagal dalam memperbaharui data');
        }
    };
    //input change data
    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === 'checkbox') {
            // Handle checkbox input for boolean properties
            setEditedKost((prevState) => ({
                ...prevState,
                [name]: checked,
            }));
        } else if (type === 'file') {
            if (files && files[0]) {
                setEditedKost((prevState) => ({
                    ...prevState,
                    [name]: null,
                }));
            }
        } else {
            setEditedKost((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
    return (
        <>
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 sm:pt-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        {/*  */}
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Kost</h3>
                                        <div className="mt-2 p-3" style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                                            <div className="mt-2 w-[400px] justify-center">
                                                {/* input data */}
                                                <div className="mb-2">
                                                    <label className="block text-sm font-medium text-gray-700">Judul:</label>
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        value={editedKost.title}
                                                        onChange={handleInputChange}
                                                        className="w-full p-2 border border-gray-300 rounded"
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="block text-sm font-medium text-gray-700">Alamat:</label>
                                                    <input
                                                        type="text"
                                                        name="address"
                                                        value={editedKost.address}
                                                        onChange={handleInputChange}
                                                        className="w-full p-2 border border-gray-300 rounded"
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="block text-sm font-medium text-gray-700">Lokasi:</label>
                                                    <input
                                                        type="text"
                                                        name="location"
                                                        value={editedKost.location}
                                                        onChange={handleInputChange}
                                                        className="w-full p-2 border border-gray-300 rounded"
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="block text-sm font-medium text-gray-700">Foto:</label>
                                                    <input
                                                        type="file"
                                                        name="photos"
                                                        onChange={handlePhotoChange}
                                                        className="w-full p-2 border border-gray-300 rounded"
                                                        multiple
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-2">
                                                <label className="block text-sm font-medium text-gray-700">Kapasitas:</label>
                                                <input
                                                    type="text"
                                                    name="capacity"
                                                    value={editedKost.capacity}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="block text-sm font-medium text-gray-700">Pemilik:</label>
                                                <input
                                                    type="text"
                                                    name="owner"
                                                    value={editedKost.owner}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="block text-sm font-medium text-gray-700">Harga:</label>
                                                <input
                                                    type="text"
                                                    name="price"
                                                    value={editedKost.price}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="block text-sm font-medium text-gray-700">Jumlah Kamar:</label>
                                                <input
                                                    type="text"
                                                    name="kamar"
                                                    value={editedKost.kamar}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="block text-sm font-medium text-gray-700">Nomor Rekening:</label>
                                                <input
                                                    type="text"
                                                    name="rekening"
                                                    value={editedKost.rekening}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="block text-sm font-medium text-gray-700">No Handphone:</label>
                                                <input
                                                    type="text"
                                                    name="phoneNumber"
                                                    value={editedKost.phoneNumber}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className='mb-2'>
                                                <h2 className="block text-sm font-medium text-gray-700">Tipe Kost</h2>
                                                <select
                                                    value={editedKost.jenis}
                                                    name='jenis'
                                                    onChange={handleInputChange}
                                                    className="border text-gray-400 border-gray-300 bg-white rounded-md px-2 py-2 mt-2 mb-2 w-full focus:outline-none focus:border-blue-500"
                                                >
                                                    <option value="">Pilih Kost</option>
                                                    <option value="Laki-Laki">Kost Laki-laki</option>
                                                    <option value="Perempuan">Kost Perempuan</option>
                                                    <option value="Campuran">Kost Campuran</option>
                                                </select>
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold">Status Kos</h2>
                                                <select
                                                    value={editedKost.statusKamar}
                                                    name='statusKamar'
                                                    onChange={handleInputChange}
                                                    className="border text-gray-400 border-gray-300 bg-white rounded-md px-2 py-2 mt-2 mb-2 w-full focus:outline-none focus:border-blue-500"
                                                >
                                                    <option value='' disabled selected>Pilih Status</option>
                                                    <option value="Penuh">Penuh</option>
                                                    <option value="tersedia">Tersedia</option>

                                                </select>
                                            </div>
                                            <div className="mb-2">
                                                <label className="block text-sm font-medium text-gray-700">Deskripsi:</label>
                                                <textarea
                                                    type="text"
                                                    name="description"
                                                    value={editedKost.description}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="block text-sm font-medium text-gray-700">Informasi Tambahan:</label>
                                                <textarea
                                                    type="text"
                                                    name="moreinfo"
                                                    value={editedKost.moreinfo}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                />
                                            </div>
                                            {/* fasility */}
                                            <div className="mt-2 justify-center">
                                                <label className="block text-lg font-bold text-gray-700 mb-3">Fasilitas</label>
                                                <div className="mb-2 grid grid-cols-3 grid-rows-3 gap-2">
                                                    <div className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            name="wifi"
                                                            checked={editedKost.wifi}
                                                            onChange={handleInputChange}
                                                            className="mr-2"
                                                        />
                                                        <label className="block text-sm font-medium text-gray-700">WiFi</label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            name="parking"
                                                            checked={editedKost.parking}
                                                            onChange={handleInputChange}
                                                            className="mr-2"
                                                        />
                                                        <label className="block text-sm font-medium text-gray-700">Area Parkir</label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            name="kitchen"
                                                            checked={editedKost.kitchen}
                                                            onChange={handleInputChange}
                                                            className="mr-2"
                                                        />
                                                        <label className="block text-sm font-medium text-gray-700">Dapur Bersama</label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            name="energy"
                                                            checked={editedKost.energy}
                                                            onChange={handleInputChange}
                                                            className="mr-2"
                                                        />
                                                        <label className="block text-sm font-medium text-gray-700">Listrik</label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            name="water"
                                                            checked={editedKost.water}
                                                            onChange={handleInputChange}
                                                            className="mr-2"
                                                        />
                                                        <label className="block text-sm font-medium text-gray-700">Air</label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            name="laundry"
                                                            checked={editedKost.laundry}
                                                            onChange={handleInputChange}
                                                            className="mr-2"
                                                        />
                                                        <label className="block text-sm font-medium text-gray-700">Tempat Cucian</label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            name="servant"
                                                            checked={editedKost.servant}
                                                            onChange={handleInputChange}
                                                            className="mr-2"
                                                        />
                                                        <label className="block text-sm font-medium text-gray-700">Petugas Kebersihan</label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            name="free"
                                                            checked={editedKost.free}
                                                            onChange={handleInputChange}
                                                            className="mr-2"
                                                        />
                                                        <label className="block text-sm font-medium text-gray-700">Bebas Dimasuki</label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            name="fullRoom"
                                                            checked={editedKost.fullRoom}
                                                            onChange={handleInputChange}
                                                            className="mr-2"
                                                        />
                                                        <label className="block text-sm font-medium text-gray-700">Fasilitas Lengkap</label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            name="pet"
                                                            checked={editedKost.pet}
                                                            onChange={handleInputChange}
                                                            className="mr-2"
                                                        />
                                                        <label className="block text-sm font-medium text-gray-700">Peliharaan</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        onClick={onClose}
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pink-600 text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Save
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </>
    );
};

export default Modal;
