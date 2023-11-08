import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageUpload from './ImageUpload'; // Impor komponen ImageUpload yang telah diberikan sebelumnya.

export default function Kost() {
    const [formData, setFormData] = useState({
        title: '',
        address: '',
        description: '',
        moreinfo: '',
        capacity: 0,
        location: '',
        phoneNumber: 0,
        price: 0,
        photos: [],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUpload = (data) => {
        setFormData({
            ...formData,
            photos: data.getAll('photos'),
        });
    };

    async function handleSubmit(ev) {
        ev.preventDefault();
        if (!formData.title || !formData.address || !formData.description || !formData.moreinfo || !formData.capacity || !formData.location || !formData.phoneNumber || !formData.price || formData.photos.length === 0) {
            toast.error('Please fill in all the required fields and upload at least one photo', {
                position: 'top-right',
                style: {
                    whiteSpace: 'nowrap',
                },
                autoClose: 3000,
            });
            return;
        }

        try {
            const response = await axios.post('/api/kost/create', formData);
            if (response.status === 201) {
                toast.success('Saved successfully', {
                    position: 'top-right',
                    style: {
                        whiteSpace: 'nowrap',
                    },
                    autoClose: 3000,
                });
            } else {
                console.log('Gagal menyimpan data');
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
        }
    }

    return (
        <div className="bg-gray-100 h-[100] w-full">
            <h1 className='text-4xl font-bold p-5'>Add Kost</h1>
            <form onSubmit={handleSubmit}>
                {/* basic information */}
                <h1 className='font-bold text-xl mx-7'>Information about Kost</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 grid-rows-auto md:grid-rows-2 gap-[40px] bg-white m-6 p-[30px] border-solid border-[#BAC7D5] border rounded">
                    <div>
                        <h2 className="text-2xl font-bold">Title</h2>
                        <input
                            type="text"
                            name="title" // Tambahkan name untuk mengaitkan input dengan state
                            placeholder="Title, for example: My Kost"
                            className="w-full p-3 border border-gray-300 rounded"
                            value={formData.title} // Bind input value to state
                            onChange={handleInputChange} // Handle input change
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold ">Upload Image</h2>
                        <ImageUpload onUpload={handleUpload} />
                    </div>
                    <div className=''>
                        <h2 className="text-2xl font-bold">Address</h2>
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            className="w-full p-3 border border-gray-300 rounded"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="">
                        <h2 className="text-2xl font-bold">Capacity</h2>
                        <input
                            type="number" // Ubah menjadi number input
                            name="capacity"
                            placeholder="max : 2 people"
                            value={formData.capacity}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="">
                        <h2 className="text-2xl font-bold">Phone Number</h2>
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="08xxx"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="">
                        <h2 className="text-2xl font-bold">Price</h2>
                        <input
                            type="text"
                            name="price"
                            placeholder="Rp. xxx"
                            value={formData.price}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="">
                        <h2 className="text-2xl font-bold">Location</h2>
                        <input
                            type="text"
                            name="location"
                            placeholder="Semarang City"
                            value={formData.location}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                {/* description */}
                <h1 className='font-bold text-xl mx-7'>Description about Kost</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 grid-rows-auto md:grid-rows-2 gap-5 h-[1] bg-white md:h-[200px] m-6 p-[30px] border-solid gray-500 border-2 rounded">
                    <div style={{ height: "50%" }}>
                        <h2 className="text-2xl font-bold">Description</h2>
                        <textarea
                            name="description"
                            placeholder="Add Description"
                            className="w-full p-3 border border-gray-300 rounded"
                            value={formData.description}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <div style={{ height: "50%" }}>
                        <h2 className="text-2xl font-bold">More Information</h2>
                        <textarea
                            name="moreinfo"
                            placeholder="Add Information"
                            className="w-full p-3 border border-gray-300 rounded"
                            value={formData.moreinfo}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                </div>
                {/* fasility */}
                <h1 className='font-bold text-xl mx-7'>Fasility about Kost</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5  bg-white m-6 p-[30px] border-solid gray-500 border-2 rounded">
                    {/* Tambahkan input checkbox sesuai dengan fasilitas Anda */}
                </div>
                {/* button */}
                <div className="flex justify-end m-6">
                    <button
                        type="submit"
                        className="w-[231px] h-[48px] bg-pink-600 text-white font-medium rounded-sm text-[14px]"
                    >Save Data
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}