import { RiParkingLine } from 'react-icons/ri'
import { LiaTshirtSolid } from 'react-icons/lia'
import { MdOutlineCleaningServices } from 'react-icons/md'
import { BiSolidDog } from 'react-icons/bi'
import { MdPower } from 'react-icons/md'
import { MdOutlineWaterDrop } from 'react-icons/md'
const IconsFitur = {
    wifi: (
        <label className='border border-full rounded-lg shadow-sm bg-white w-[100px] items-center text-center p-2 '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
            </svg>
            <span className='text-sm'>Wifi</span>
        </label>
    ),
    parking: (
        <label className='border border-full rounded-lg shadow-sm bg-white w-[100px] items-center text-center p-2 '>
            <RiParkingLine className="w-6 h-6 mx-auto" />
            <span className='text-sm'>parkir</span>
        </label>
    ),
    laundry: (
        <label className='border border-full rounded-lg shadow-sm bg-white w-[100px] items-center text-center p-2 '>
            <LiaTshirtSolid className="w-6 h-6 mx-auto" />
            <span className='text-sm'>Cuci Pakaian</span>
        </label>
    ),
    servant: (
        <label className='border border-full rounded-lg shadow-sm bg-white w-[100px] items-center text-center p-2 '>
            <MdOutlineCleaningServices className="w-6 h-6 mx-auto" />
            <span className='text-sm'>Petugas Kebersihan</span>
        </label>
    ),
    free: (
        <label className='border border-full rounded-lg shadow-sm bg-white w-[100px] items-center text-center p-2 '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
            </svg>
            <span className='text-sm'>Bebas</span>
        </label>
    ),
    fullRoom: (
        <label className='border border-full rounded-lg shadow-sm bg-white w-[100px] items-center text-center p-2 '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <span className='text-sm'>Fasilitas Lengkap</span>
        </label>
    ),
    pet: (
        <label className='border border-full rounded-lg shadow-sm bg-white w-[100px] items-center text-center p-2 '>
            < BiSolidDog className='w-6 h-6 mx-auto' />
            <span className='text-sm'>Boleh Membawa Peliharaan</span>
        </label>
    ),
    energy: (
        <label className='border border-full rounded-lg shadow-sm bg-white w-[100px] items-center text-center p-2 '>
            < MdPower className='w-6 h-6 mx-auto' />
            <span className='text-sm'>Listrik</span>
        </label>
    ),
    water: (
        <label className='border border-full rounded-lg shadow-sm bg-white w-[100px] items-center text-center p-2 '>
            < MdOutlineWaterDrop className='w-6 h-6 mx-auto' />
            <span className='text-sm'>Air</span>
        </label>
    ),


};

export default IconsFitur;
