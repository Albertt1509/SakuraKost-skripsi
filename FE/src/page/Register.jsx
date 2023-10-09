import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'
export default function Register() {
    //lihat password
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    //connect api
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    async function registerUser(ev) {
        ev.preventDefault();
        try {
            await axios.post('/register',
                { name, email, password })
            alert('Registrasi berhasil')
        } catch (e) {
            alert('Registrasi gagal')
        }
    }
    return (
        <div className="p-2 mt-4 grow flex items-center justify-around">
            <div className="mb-4">
                <h1 className="text-4xl font-bold text-center p-2">Register</h1>
                <form action="" className="max-w-md mx-auto " onSubmit={registerUser} >
                    <input
                        type="text"
                        placeholder={'nama'}
                        value={name}
                        onChange={ev => setName(ev.target.value)} />
                    <input
                        type="email"
                        placeholder={'contoh123@gmail.com'}
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password} onChange={ev => setPassword(ev.target.value)}
                            onClick={togglePasswordVisibility}
                            className="password-toggle" />
                        <span
                            onClick={togglePasswordVisibility}
                            className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer ${showPassword ? 'hidden' : 'block'}`}
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </span>

                    </div>
                    <button>Daftar</button>
                    <div className="flex justify-end text-sm mt-2">Sudah punya akun?
                        <Link to={'/login'} className="font-bold ml-1 underline "> Masuk</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}