import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Galery() {
    const { id } = useParams();
    const [kost, setKost] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get(`/api/kost/${id}`)
            .then(response => {
                setKost(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    if (!kost) {
        return <div>Loading...</div>;
    }

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <>
            <h1 className='font-bold text-4xl mb-3'>{kost.title}</h1>
            <div className="w-full flex">
                <div className="w-full md:w-1/2 flex ">
                    <div className="w-full">
                        <img
                            src={`${kost.photos[0]}`}
                            className="w-full h-[73vh] object-cover"
                            onClick={handleModalOpen}
                        />
                    </div>
                </div>
                <div className="hidden md:flex w-1/4 pl-4  flex-col">
                    <div
                        id="red-one"
                        className="bg-cover bg-center flex-grow"
                        style={{
                            backgroundImage: `url(${kost.photos[1]})`,
                            width: '100%',
                            height: '200px',
                        }}
                        onClick={handleModalOpen}
                    >
                    </div>
                    <div
                        id="red-two"
                        className="bg-cover bg-center mt-4 flex-grow"
                        style={{
                            backgroundImage: `url(${kost.photos[2]})`,
                            width: '100%',
                            height: '200px',
                        }}
                        onClick={handleModalOpen}
                    >
                    </div>
                </div>
                <div className="hidden md:flex w-1/4 pl-4 rounded-lg  flex-col">
                    <div
                        className="bg-cover bg-center flex-grow"
                        style={{
                            backgroundImage: `url(${kost.photos[3]})`,
                            width: '100%',
                            height: '200px',
                        }}
                        onClick={handleModalOpen}
                    >
                    </div>
                    <div
                        id="red-two"
                        className="bg-cover bg-center mt-4 flex-grow"
                        style={{
                            backgroundImage: `url(${kost.photos[4]})`,
                            width: '100%',
                            height: '200px',
                        }}
                        onClick={handleModalOpen}
                    >
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg w-full max-w-2xl overflow-y-auto">
                        <div className="flex justify-end">
                            <button
                                className="text-2xl cursor-pointer"
                                onClick={handleModalClose}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="flex flex-wrap">
                            {kost.photos.map((photo, index) => (
                                <div key={index} className="w-full md:w-1/3 lg:w-1/4 mb-4 px-2">
                                    <img
                                        src={`${photo}`}
                                        className="w-full h-32 "
                                        alt={`Photo ${index + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
