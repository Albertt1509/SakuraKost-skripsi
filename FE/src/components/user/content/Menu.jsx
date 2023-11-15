import React from 'react';

const TwoColorSolidBackgroundVertical = () => {
    const containerStyle = {
        background: '#f472b6',
        height: '30vh', // Adjusted height for better visibility
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const topContainerStyle = {
        width: '100%',
        flexGrow: 1,
        position: 'relative',
    };


    return (
        <>
            <div style={containerStyle}>
                <div style={topContainerStyle}></div>
                <header className="search items-center justify-center   p-4 ">
                    <div className="search bg-white p-4 rounded-md shadow-md w-50 relative z-10" style={{ marginTop: '20%' }}>
                        <div className=" flex gap-2">
                            <div className="flex flex-col w-full">
                                <label htmlFor="tipeKos" className="mb-1">Tipe Kos</label>
                                <select
                                    id="tipeKos"
                                    className="border text-gray-400 border-gray-300 bg-white rounded-md px-4 py-2 mt-2 mb-2 w-full focus:outline-none focus:border-blue-500"
                                >
                                    <option value="putra">Kost Laki Laki</option>
                                    <option value="putri">Kost Perempuan</option>
                                    <option value="putra_putri">Kost Campuran</option>
                                </select>
                            </div>
                            <div className="flex flex-col w-full">
                                <h1 className="mb-1">Rentang Harga</h1>
                                <input type="text" className="border p-2 w-full" placeholder="Rp. 550.000" />
                            </div>
                            <div className="flex pt-[28px]">
                                <h1 className='flex justify-center items-center'>-</h1>
                            </div>
                            <div className="flex flex-col w-full pt-[28px]">
                                <input type="text" className="border p-2 w-full" placeholder="Rp. 2.550.000" />
                            </div>
                            <div className="flex pt-[30px] ">
                                <button className='bg-pink-500 p-3 w-[100px] h-[50px] rounded-lg text-white'> Cari</button>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </>

    );
};

export default TwoColorSolidBackgroundVertical;
