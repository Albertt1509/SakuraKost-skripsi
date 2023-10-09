import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import UserContext from '../components/user/userContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const { setUser } = useContext(UserContext);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Handle submit logic 
    async function handleSubmit(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post('/login', { email, password });
            setUser(data)
            alert('login berhasil ')
            setRedirect(true)
        } catch (e) {
            alert('login gagal')
        }
    }
    // login done
    if (redirect) {
        return <Navigate to={'/'} />
    }
    return (
        <div className="p-2 mt-40 grow items-center justify-around">
            <div className="mb-4">
                <h1 className="text-4xl font-bold text-center p-2">Login</h1>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto" >
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                        required
                    />
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(ev) => setPassword(ev.target.value)}
                            required
                        />
                        <span
                            onClick={togglePasswordVisibility}
                            className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer ${showPassword ? 'hidden' : 'block'}`}
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </span>

                    </div>
                    <button type="submit bg-primary">Login</button>
                    <div className="flex justify-end text-sm mt-2">
                        Belum punya akun?
                        <Link to="/register" className="font-bold ml-1 underline">
                            Daftar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
