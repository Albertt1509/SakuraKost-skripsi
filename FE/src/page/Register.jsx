import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Register() {
    // see password
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    //logic input data to database
    const [name, setName] = useState('');
    const [alamat, setAlamat] = useState('');
    const [email, setEmail] = useState('');
    const [nohp, setNoHp] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [gender, setGender] = useState('');

    async function registerUser(ev) {
        ev.preventDefault();
        if (password.length < 8 || !/\d/.test(password)) {
            setPasswordError('Password harus memiliki minimal 8 karakter dan mengandung angka.');
            return;
        }

        try {
            await axios.post('/api/register', { name, email, password, alamat, nohp, gender });
            alert('Registrasi berhasil');
        } catch (e) {
            alert('Registrasi gagal');
        }
    }
    return (
        <div className="bg-white p-4 bg-opacity-40 rounded max-w-md shadow-md mx-auto w-full mt-40 ">
            <div className="grow flex items-center justify-around ">
                <div className="mb-4">
                    <h1 className="text-4xl font-bold text-center p-2 mb-5">Register</h1>
                    <form className="max-w-md mx-auto " onSubmit={registerUser}>
                        <input
                            type="text"
                            placeholder={'Nama'}
                            value={name}
                            onChange={ev => setName(ev.target.value)}
                        />
                        <input
                            type="email"
                            placeholder={'Email'}
                            value={email}
                            onChange={ev => setEmail(ev.target.value)}
                        />
                        <input
                            type="text"
                            placeholder={'Alamat'}
                            value={alamat}
                            onChange={ev => setAlamat(ev.target.value)}
                        />
                        <select
                            value={gender}
                            onChange={(ev) => setGender(ev.target.value)}
                            className="border text-gray-400 border-gray-300 bg-white rounded-md px-4 py-3 mt-2 mb-2 w-full focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Pilih Jenis Kelamin</option>
                            <option value="male">Laki-laki</option>
                            <option value="female">Perempuan</option>
                        </select>
                        <input
                            type="text"
                            placeholder={'No Handphone'}
                            value={nohp}
                            onChange={ev => setNoHp(ev.target.value)}
                        />
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value), setPasswordError(''); }}
                                required
                            />
                            <span
                                onClick={togglePasswordVisibility}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    fontSize: '20px',
                                    cursor: 'pointer',
                                }}
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </span>
                        </div>
                        <button className='mt-5 flex bg-pink-600 w-full justify-center p-1 rounded-lg text-white'>Daftar</button>
                        {passwordError && <p className="text-red-500">{passwordError}</p>}
                        <div className="flex justify-end text-sm mt-2">
                            Sudah punya akun?
                            <Link to={'/login'} className="font-bold ml-1 underline "> Masuk</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
