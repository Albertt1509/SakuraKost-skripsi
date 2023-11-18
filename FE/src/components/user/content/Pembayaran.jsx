import { useParams } from 'react-router-dom';
import { dummyData } from './KostList';
export default function Pembayran() {
    const { id } = useParams();
    const kost = dummyData.find((item) => item.id === parseInt(id, 10));

    if (!kost) {
        return <div> Kost Tidak Ditemukan</div>;
    }
    const phoneNumber = '0895613308484';

    // You can customize the message by changing the text after '&text='
    const message = 'Hello, I would like to chat with you!';

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <>
            <div className="flex justify-end p-6 ">
                <div className="flex flex-col bg-white w-[65vh] h-[50vh] p-4 shadow-lg">
                    <h1 className='font-bold text-2xl'>{kost.harga} /Bulan</h1>
                    <div className='mt-5 flex-grow'>
                        <h2 className="text-sm">Tanggal Pemesanan</h2>
                        <input
                            type="date"
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex justify-center items-center mb-9">
                        <h1 className='text-sm text-center  '>Ajukan Pertanyaan Jika Ada Hal yang Ingin Ditanyakan</h1>
                    </div>
                    <div className="flex justify-center bg-pink-400 p-2 text-white mb-3 gap-2 rounded-lg">
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                            <button className=" text-white rounded">
                                Chat di WhatsApp
                            </button>
                        </a>
                        <div className="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex justify-center w-full gap-2">
                        <div className="bg-pink-400 p-2 w-full flex justify-center items-center gap-2 text-white rounded-lg">
                            <button className="ml-2">Pesan</button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                            </svg>
                        </div>
                        <div className="bg-pink-400 p-2 w-full flex gap-2 justify-center text-white rounded-lg">
                            <button className="ml-2">Bayar</button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}