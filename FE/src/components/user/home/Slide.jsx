import React from 'react';

const Slide = ({ image, address }) => {
    return (
        <div className="bg-gray-200 shadow-sm rounded-lg m-4 mx-auto w-[354px] h-[368px] md:justify-self-end">
            <nav className="flex justify-between p-4">
                <img src={image} alt="" />
            </nav>
            <div className="justify-between items-center pt-5 pl-6 pr-3">
                <h1 className="text-sm font-bold p-2">{address}</h1>
            </div>
            <div className="flex justify-end place-items-end p-2 text-white">
                <button className="bg-pink-600 p-2 rounded-lg">Detail</button>
            </div>
        </div>
    );
};

export default Slide;
