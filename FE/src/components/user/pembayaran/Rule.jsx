
const Rule = () => {
    return (
        <div className=" p-6 rounded-mdd">
            <h1 className="font-bold text-2xl mb-4">Penting Untuk Diperhatikan</h1>
            <ul className="list-decimal ml-6">
                <li className="mb-2"> Perhatikan untuk nama kos yang akan dipesan</li>
                <li className="mb-2"> Pilih jenis pembayaran yang akan digunakan</li>
                <li className="mb-2"> Jika menggunakan transfer bank, maka lakukan pembayaran dan kirim bukti pembayaran</li>
                <li className="mb-2"> Pastikan foto selfie adalah orang yang akan menempati kamar yang dipesan</li>
                <li className="mb-2"> Jika sudah yakin dengan pilihan maka klik button bayar</li>
                <li className="mb-2"> Data pembayaran akan masuk ke menu pembayaran
                    yang ada di pojok kanan atas</li>
            </ul>
        </div>
    );
};

export default Rule;
