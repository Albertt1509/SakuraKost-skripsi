import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiParkingLine } from 'react-icons/ri'
import { LiaTshirtSolid } from 'react-icons/lia'
import { MdOutlineCleaningServices } from 'react-icons/md'
import { BiSolidDog } from 'react-icons/bi'
import { MdPower } from 'react-icons/md'
import { MdOutlineWaterDrop } from 'react-icons/md'

// import data
export default function Kost() {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [moreinfo, setMoreInfo] = useState('');
    const [capacity, setCapacity] = useState('');
    const [location, setLocation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [price, setPrice] = useState('');
    const [owner, setOwner] = useState('');
    const [photos, setPhotos] = useState(null);
    const [wifi, setWifi] = useState(false);
    const [parking, setParking] = useState(false);
    const [kitchen, setKitchen] = useState(false);
    const [laundry, setLaundry] = useState(false);
    const [servant, setServant] = useState(false);
    const [free, setFree] = useState(false);
    const [fullRoom, setFullRoom] = useState(false);
    const [pet, setPet] = useState(false);
    const [energy, setEnergy] = useState(false);
    const [water, setWater] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);


    // to image post
    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        setPhotos(selectedFile);

        const imageUrl = URL.createObjectURL(selectedFile);
        setImagePreview(imageUrl);
    };
    // for data fill
    async function handleSubmit(ev) {
        ev.preventDefault();
        if (!title || !owner || !address || !description || !moreinfo || !capacity || !location || !phoneNumber || !price || !photos) {
            toast.error('Tolong isi semua bagian ', {
                position: 'top-right',
                style: {
                    whiteSpace: 'nowrap',
                },
                autoClose: 3000,
            });
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('address', address);
        formData.append('description', description);
        formData.append('moreinfo', moreinfo);
        formData.append('capacity', capacity);
        formData.append('location', location);
        formData.append('phoneNumber', phoneNumber);
        formData.append('price', price);
        formData.append('owner', owner);
        formData.append('photos', photos);
        formData.append('wifi', wifi ? '1' : '0');
        formData.append('parking', parking ? '1' : '0');
        formData.append('laundry', laundry ? '1' : '0');
        formData.append('servant', servant ? '1' : '0');
        formData.append('kitchen', kitchen ? '1' : '0');
        formData.append('free', free ? '1' : '0');
        formData.append('fullRoom', fullRoom ? '1' : '0');
        formData.append('pet', pet ? '1' : '0');
        formData.append('energy', energy ? '1' : '0');
        formData.append('water', water ? '1' : '0');
        try {
            const response = await axios.post('/api/kost', formData);
            if (response.status === 200 || response.status === 201) {
                toast.success('Data Berhasil disimpan', {
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
                setTitle('');
                setAddress('');
                setDescription('');
                setMoreInfo('');
                setCapacity('');
                setLocation('');
                setOwner('');
                setPhoneNumber('');
                setPrice('');
                setPhotos(null);
                setWifi(false);
                setParking(false);
                setKitchen(false);
                setLaundry(false);
                setServant(false);
                setFree(false);
                setFullRoom(false);
                setPet(false);
                setEnergy(false);
                kitchen(false);
                setWater(false);

            } else {
                toast.error('Gagal menyimpan data', {
                    position: 'top-right',
                    style: {
                        whiteSpace: 'nowrap',
                    },
                    autoClose: 3000,
                });

            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
        }
    }

    return (
        <div className="bg-gray-100 h-[100] w-full">
            <h1 className='text-4xl font-bold p-5'>Tambah Kost Kost</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* basic information */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 grid-rows-auto md:grid-rows-2 gap-[40px] bg-white m-6 p-[30px] border-solid border-[#BAC7D5] border rounded">
                    <div>
                        <h2 className="text-2xl font-bold">Judul Kost</h2>
                        <input
                            type="text"
                            placeholder="Judul, contoh: Bersih Kost"
                            className="w-full p-3 border border-gray-300 rounded"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Alamat</h2>
                        <input
                            type="text"
                            placeholder="Alamat lengkap kost"
                            className="w-full p-3 border border-gray-300 rounded"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Pemilik</h2>
                        <input
                            type="text"
                            placeholder="Subekti"
                            className="w-full p-3 border border-gray-300 rounded"
                            value={owner}
                            onChange={(e) => setOwner(e.target.value)}
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Lokasi Kost</h2>
                        <input
                            type="text"
                            placeholder="Semarang Kota"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Kapasitas</h2>
                        <input
                            type="text"
                            placeholder="max : 2 orang"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">No Handphone</h2>
                        <input
                            type="text"
                            placeholder="08xxx"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Harga</h2>
                        <input
                            type="text"
                            placeholder="Rp. xxx"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Jumlah Kamar</h2>
                        <input
                            type="text"
                            placeholder="Jumlah Kamar belum dicoding"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    {/* Upload Image */}
                    <div>
                        <h2 className="text-2xl font-bold ">Unggah Gambar</h2>
                        <input
                            type="file"
                            name="photos"
                            className="w-full p-2 border mt-2 border-gray-300 rounded"
                            onChange={handleImageChange}
                        />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Selected Image"
                                style={{ maxWidth: '50px', display: 'flex justify-content-center ' }} // Adjust the size as needed
                            />
                        )}
                    </div>
                </div>
                {/* description */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 grid-rows-auto md:grid-rows-2 gap-5 h-[1] bg-white md:h-[200px] m-6 p-[30px] border-solid gray-500 border-2 rounded">
                    <div style={{ height: "50%" }}>
                        <h2 className="text-2xl font-bold">Deskripsi</h2>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Tambah Deskripsi Kost"
                            className="w-full p-3 border border-gray-300 rounded"
                        ></textarea>
                    </div>
                    <div style={{ height: "50%" }}>
                        <h2 className="text-2xl font-bold">Informasi Tambahan</h2>
                        <textarea
                            value={moreinfo}
                            onChange={(e) => setMoreInfo(e.target.value)}
                            placeholder="Contoh informasi tambahan : Dilarang membawa teman untuk menginap"
                            className="w-full p-3 border border-gray-300 rounded"
                        ></textarea>
                    </div>
                </div>
                {/* fasility */}
                <div className=" bg-white m-6 p-[30px] border-solid gray-500 border-2 rounded">
                    <div className="">
                        <h2 className='text-2xl font-bold flex flex-row pb-5'> Fasilitas</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 ">
                        <label className='border border-lg shadow-sm bg-white w-full items-center text-center '>
                            <input
                                type="checkbox"
                                checked={wifi}
                                onChange={(e) => setWifi(e.target.checked)}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                            </svg>
                            <span className='text-sm'>Wifi</span>
                        </label>
                        <label className='border border-lg shadow-sm bg-white w-full items-center text-center ' >
                            <input
                                type="checkbox"
                                checked={parking}
                                onChange={(e) => setParking(e.target.checked)}
                            />
                            <RiParkingLine className="w-6 h-6 mx-auto" LuParkingCircle />
                            <span className='text-sm'>Area Parkir</span>
                        </label>
                        <label className='border border-lg shadow-sm bg-white w-full items-center text-center ' >
                            <input
                                type="checkbox"
                                checked={kitchen}
                                onChange={(e) => setKitchen(e.target.checked)}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                            </svg>
                            <span>Dapur Bersama</span>
                        </label>
                        <label className='border border-lg shadow-sm bg-white w-full items-center text-center ' >
                            <input type="checkbox"
                                checked={laundry}
                                onChange={(e) => setLaundry(e.target.checked)}
                            />
                            <LiaTshirtSolid className="w-6 h-6 mx-auto" />
                            <span className='text-sm'>Cuci Pakaian</span>
                        </label>
                        <label className='border border-lg shadow-sm bg-white w-full items-center text-center ' >
                            <input type="checkbox"
                                checked={servant}
                                onChange={(e) => setServant(e.target.checked)} />
                            <MdOutlineCleaningServices className="w-6 h-6 mx-auto" />
                            <span className='text-sm'>Pelayanan Kebersihan</span>
                        </label>
                        <label className='border border-lg shadow-sm bg-white w-full items-center text-center ' >
                            <input type="checkbox"
                                checked={free}
                                onChange={(e) => setFree(e.target.checked)} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                            </svg>
                            <span className=''>Bebas Dimasuki</span>
                        </label>
                        <label className='border border-lg shadow-sm bg-white w-full items-center text-center ' >
                            <input type="checkbox"
                                checked={fullRoom}
                                onChange={(e) => setFullRoom(e.target.checked)} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            <span className=''>Fasilitas Lengkap</span>
                        </label>
                        <label className='border border-lg shadow-sm bg-white w-full items-center text-center ' >
                            <input type="checkbox"
                                checked={pet}
                                onChange={(e) => setPet(e.target.checked)} />
                            <BiSolidDog className='w-6 h-6 mx-auto' />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                            <span className=''>Boleh Membawa Peliharaan</span>
                        </label>
                        <label className='border border-lg shadow-sm bg-white w-full items-center text-center ' >
                            <input type="checkbox"
                                checked={energy}
                                onChange={(e) => setEnergy(e.target.checked)} />
                            <MdPower className='w-6 h-6 mx-auto' />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                            <span className=''>Listrik</span>
                        </label>
                        <label className='border border-lg shadow-sm bg-white w-full items-center text-center ' >
                            <input type="checkbox"
                                checked={water}
                                onChange={(e) => setWater(e.target.checked)} />
                            <MdOutlineWaterDrop className='w-6 h-6 mx-auto' />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                            <span className=''>Air</span>
                        </label>
                    </div>
                </div>

                {/* button */}
                <div className="flex justify-end m-6">
                    <button
                        type="submit"
                        className="w-[231px] h-[48px] bg-pink-600 text-white font-medium rounded-sm text-[14px]"
                    >Simnpan
                    </button>
                </div>
                {/* cl button */}
            </form>
            <ToastContainer />
        </div>
    );
}
