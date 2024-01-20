const Modal = ({ visible, onConfirm, onCancel }) => {
    if (!visible) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-md">
                <h1 className="text-xl font-bold mb-4">Konfirmasi Pembayaran</h1>
                <p>Apakah Anda yakin ingin melanjutkan pembayaran?</p>
                <div className="mt-4 flex justify-end">
                    <button className="bg-pink-500 p-2 rounded-lg text-white mr-2" onClick={onConfirm}>
                        Bayar
                    </button>
                    <button className="bg-gray-300 p-2 rounded-lg" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
