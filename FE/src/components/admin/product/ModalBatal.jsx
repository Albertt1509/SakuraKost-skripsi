import { useState } from 'react';

const ModalCancel = ({ isOpen, onClose, onCancel }) => {
    const [sebab, setSebab] = useState('');

    const handleCancel = () => {
        onCancel(sebab);
        onClose();
    };

    return (
        <div className={`fixed inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="bg-white w-full max-w-md p-4 rounded-md shadow-md">
                    <span className="absolute top-0 right-0 p-4 cursor-pointer" onClick={onClose}>&times;</span>
                    <h2 className="text-lg font-semibold mb-4">Alasan Pembatalan</h2>
                    <textarea
                        className="w-full p-2 border rounded"
                        rows="4"
                        placeholder="Masukkan alasan pembatalan..."
                        value={sebab}
                        onChange={(e) => setSebab(e.target.value)}
                    />
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded mt-4"
                        onClick={handleCancel}
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalCancel;
