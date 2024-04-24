import { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import UserContext from '../../user/UserContext';
import { RiParkingLine } from 'react-icons/ri'
import { LiaTshirtSolid } from 'react-icons/lia'
import { MdOutlineCleaningServices } from 'react-icons/md'
import { BiSolidDog } from 'react-icons/bi'
import { MdPower } from 'react-icons/md'
import { MdOutlineWaterDrop } from 'react-icons/md'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AddKost() {
    const [kostData, setKostData] = useState({
        title: '',
        address: '',
        location: '',
        photos: [],
        capacity: '',
        owner: '',
        link: '',
        kamar: '',
        jenis: '',
        price: '',
        statusKamar: '',
        rekening: '',
        phoneNumber: '',
        description: '',
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
    const { user } = useContext(UserContext);

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

            Axios.get(`/api/kost/${kostTitle}`)
                .then((response) => {
                    setKostData((prevState) => ({
                        ...prevState,
                        ...response.data,
                    }));
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [user]);

    // Update editedKost state when input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            // Handle checkbox input for boolean properties
            setKostData((prevState) => ({
                ...prevState,
                [name]: checked,
            }));
        } else {
            setKostData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    // Update photos
    const handlePhotoChange = (e) => {
        const { name, files } = e.target;
        const selectedPhotos = Array.from(files);
        setKostData((prevState) => ({
            ...prevState,
            [name]: selectedPhotos,
        }));
    };

    // Save updated data
    const handleSave = async () => {
        try {
            const formData = new FormData();
            for (const key in kostData) {
                if (key === 'photos') {
                    for (let i = 0; i < kostData[key].length; i++) {
                        formData.append('photos', kostData[key][i]);
                    }
                } else {
                    formData.append(key, kostData[key]);
                }
            }

            await Axios.post(`/api/kost/${kostData._id}`, formData);
            toast.success('Data Telah Disimpan', {
                position: 'top-right',
                style: {
                    whiteSpace: 'nowrap',
                },
                autoClose: 3000,
            });
            // You can add a success message or redirect to another page here
        } catch (error) {
            console.error(error, 'Failed to update data');
            // Handle error
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bg-gray-100 h-screen w-full">
                <h1 className="font-bold text-4xl p-6">Tambah Kost</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 grid-rows-auto md:grid-rows-2 gap-[40px] bg-white m-6 p-[30px] border-solid border-[#BAC7D5] border rounded">
                    <div>
                        <h2 className="text-2xl font-bold">Judul Kost</h2>
                        <input
                            type="text"
                            name='title'
                            placeholder="Judul, contoh: Bersih Kost"
                            className="w-full p-3 border border-gray-300 rounded"
                            value={kostData.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Alamat</h2>
                        <input
                            type="text"
                            name='address'
                            placeholder="Alamat lengkap kost"
                            className="w-full p-3 border border-gray-300 rounded"
                            value={kostData.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Lokasi Berdasarkan Map</h2>
                        <input
                            type="text"
                            placeholder="Tempelkan Link Google MAP Kos Anda"
                            className="w-full p-3 border border-gray-300 rounded"
                            value={kostData.link}
                            onChange={handleInputChange}
                            name="link"
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Pemilik</h2>
                        <input
                            type="text"
                            name='owner'
                            placeholder="Subekti"
                            className="w-full p-3 border border-gray-300 rounded"
                            value={kostData.owner}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Lokasi Kost</h2>
                        <input
                            type="text"
                            name="location"
                            placeholder="Semarang Kota"
                            value={kostData.location}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Kapasitas</h2>
                        <input
                            type="text"
                            name="capacity"
                            placeholder="max : 2 orang"
                            value={kostData.capacity}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">No Handphone</h2>
                        <input
                            type="text"
                            placeholder="+62"
                            name="phoneNumber"
                            value={kostData.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Harga</h2>
                        <input
                            name="price"
                            type="text"
                            placeholder="Rp. xxx /bulan"
                            value={kostData.price}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Jumlah Kamar</h2>
                        <input
                            type="text"
                            name='kamar'
                            placeholder="Jumlah Kamar"
                            value={kostData.kamar}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Nomor Rekening</h2>
                        <input
                            type="text"
                            name='rekening'
                            placeholder=" nomor rekening anda"
                            value={kostData.rekening}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Tipe Kost</h2>
                        <select
                            value={kostData.jenis}
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
                            value={kostData.statusKamar}
                            name='statusKamar'
                            onChange={handleInputChange}
                            className="border text-gray-400 border-gray-300 bg-white rounded-md px-2 py-2 mt-2 mb-2 w-full focus:outline-none focus:border-blue-500"
                        >
                            <option value='' disabled selected>Pilih Status</option>
                            <option value="Penuh">Penuh</option>
                            <option value="tersedia">Tersedia</option>

                        </select>
                    </div>
                    <div className="">
                        <label className="text-2xl font-bold">Unggah Gambar:</label>
                        <input
                            type="file"
                            name="photos"
                            onChange={handlePhotoChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            multiple
                        />
                        <small>unggah minimal 5 foto</small>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 grid-rows-auto md:grid-rows-2 gap-5 h-[1] bg-white md:h-[200px] m-6 p-[30px] border-solid gray-500 border-2 rounded">
                    <div style={{ height: "50%" }}>
                        <h2 className="text-2xl font-bold">Deskripsi</h2>
                        <textarea
                            type="text"
                            value={kostData.description}
                            onChange={handleInputChange}
                            name='description'
                            placeholder="Tambah Deskripsi Kost"
                            className="w-full p-3 border border-gray-300 rounded"
                        ></textarea>
                    </div>
                </div>
                <div className="bg-white m-6 p-[30px] border-solid gray-500 border-2 rounded">
                    <div className="">
                        <h2 className='text-2xl font-bold flex flex-row pb-5'> Fasilitas</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        <label className='border border-lg shadow-sm bg-white w-full items-center text-center '>
                            <input
                                type="checkbox"
                                name="wifi"
                                checked={kostData.wifi}
                                onChange={handleInputChange}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                            </svg>
                            <span className='text-sm'>Wifi</span>
                        </label>
                        <label className='border border-lg shadow-sm bg-white w-full items-center text-center ' >
                            <input
                                type="checkbox"
                                name="parking"
                                checked={kostData.parking}
                                onChange={handleInputChange}
                            />
                            <RiParkingLine className="w-6 h-6 mx-auto" />
                            <span className='text-sm'>Area Parkir</span>
                        </label>
                        <label className='border border-lg shadow-sm bg-white w-full items-center text-center ' >
                            <input
                                type="checkbox"
                                name="kitchen"
                                checked={kostData.kitchen}
                                onChange={handleInputChange}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                            </svg>
                            <span>Dapur Bersama</span>
                        </label>
                        <label className='border border-lg shadow-sm bg-white w-full items-center text-center ' >
                            <input type="checkbox"
                                name="laundry"
                                checked={kostData.laundry}
                                onChange={handleInputChange}
                            />
                            <LiaTshirtSolid className="w-6 h-6 mx-auto" />
                            <span className='text-sm'>Cuci Pakaian</span>
                        </label>
                        <label className='border border-lg shadow-sm bg-white w-full items-center text-center ' >
                            <input type="checkbox"
                                name="servant"
                                checked={kostData.servant}
                                onChange={handleInputChange} />
                            <MdOutlineCleaningServices className="w-6 h-6 mx-auto" />
                            <span className='text-sm'>Pelayanan Kebersihan</span>
                        </label>
                        <label className='border border-lg shadow-sm bg-white w-full items-center text-center ' >
                            <input type="checkbox"
                                name='free'
                                checked={kostData.free}
                                onChange={handleInputChange} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                            </svg>
                            <span className=''>Bebas Dimasuki</span>
                        </label>
                        <label className='border border-lg shadow-sm bg-white w-full items-center text-center ' >
                            <input type="checkbox"
                                name='fullRoom'
                                checked={kostData.fullRoom}
                                onChange={handleInputChange} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            <span className=''>Fasilitas Lengkap</span>
                        </label>
                        <label className='border border-lg shadow-sm bg-white w-full items-center text-center ' >
                            <input type="checkbox"
                                name='pet'
                                checked={kostData.pet}
                                onChange={handleInputChange} />
                            <BiSolidDog className='w-6 h-6 mx-auto' />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                            <span className=''>Boleh Membawa Peliharaan</span>
                        </label>
                        <label className='border border-lg shadow-sm bg-white w-full items-center text-center ' >
                            <input type="checkbox"
                                name='energy'
                                checked={kostData.energy}
                                onChange={handleInputChange} />
                            <MdPower className='w-6 h-6 mx-auto' />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                            <span className=''>Listrik</span>
                        </label>
                        <label className='border border-lg shadow-sm bg-white w-full items-center text-center ' >
                            <input type="checkbox"
                                name='water'
                                checked={kostData.water}
                                onChange={handleInputChange} />
                            <MdOutlineWaterDrop className='w-6 h-6 mx-auto' />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                            <span className=''>Air</span>
                        </label>
                    </div>
                </div>
                <div className="flex justify-end m-6">
                    <button
                        onClick={handleSave}
                        className="w-[231px] h-[48px] bg-pink-600 text-white font-medium rounded-sm text-[14px]"
                    >
                        Simpan
                    </button>
                </div>

            </div >
        </>
    );
}
