import React from 'react';
import Clock from '../widget/Date';
import Gif from '../../assets/animation/Neco.gif'
export default function IndexAdmin() {
    return (
        <>
            <div className="bg-gray-100 h-screen justify-center items-center w-full">
                <div className="p-5">
                    <h1 className="text-2xl font-bold">Welcome to Dashboard Admin</h1>
                    <Clock className="p-2 pt-3" />
                </div>
                <div className='flex justify-center items-center'>
                    <img src={Gif} alt="" />
                </div>
            </div >
        </>
    );
}
