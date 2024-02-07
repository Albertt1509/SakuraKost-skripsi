import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import UserContext from "../components/user/UserContext";
import '../App.css';

export default function Login() {

    const { setUser } = useContext(UserContext);

    //logic code login account
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    //alert
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    // Handle submit logic 
    async function handleSubmit(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post('/api/login', { email, password });
            setUser(data);

            // Simpan token JWT ke penyimpanan lokal (localStorage)
            localStorage.setItem('token', data.token);

            setAlertMessage('Login berhasil');
            setAlertType('success');
            setShowAlert(true);
            setRedirect(data.role === 'superAdmin' || data.role === 'admin' ? '/admin' : '/');
        } catch (e) {
            setAlertMessage('Username dan Password yang Anda Masukkan Salah, Coba Lagi');
            setAlertType('error');
            setShowAlert(true);
        }
    }

    // login done
    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div className=" w-full h-screen">
            <div className="bg-white  p-4 rounded shadow-md mt-40 max-w-md mx-auto w-full">
                <h1 className="text-4xl font-bold text-center p-4">Login</h1>
                {showAlert && (
                    <div className={`message-box message-box-${alertType} show`}>
                        <i className={`fa fa-${alertType === 'success' ? 'check' : 'ban'} fa-2x`}></i>
                        <span className="message-text"><strong>{alertType === 'success' ? 'Success' : 'Error'}:</strong> {alertMessage}</span>
                        <i className="fa fa-times fa-2x exit-button" onClick={() => setShowAlert(false)}></i>
                    </div>
                )}
                <form onSubmit={handleSubmit} className='mt-5'>
                    <div className="gap-5">
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
                    </div>
                    <button className='mt-5 flex bg-pink-600 w-full justify-center p-1 rounded-lg text-white' type="submit">Login</button>
                    <div className="flex justify-end text-sm mt-5">
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
