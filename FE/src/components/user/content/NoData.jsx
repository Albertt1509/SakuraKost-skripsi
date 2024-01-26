import React from 'react';
import Aris from '../../../assets/animation/aris.gif'
const NoDataNotification = () => (
    <div className="flex flex-col items-center justify-center h-full">
        <img
            src={Aris}
            alt="Not Available GIF"
            className="w-40 h-40"
        />
        <p className="text-red-500 font-bold text-lg mb-4">Kos tidak tersedia</p>
    </div>
);
export default NoDataNotification;
