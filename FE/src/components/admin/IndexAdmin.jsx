import { useContext } from 'react';
import Clock from '../widget/Date';
import { Navigate } from 'react-router-dom'
import Gif from '../../assets/animation/Neco.gif'
import UserContext from '../user/UserContext';

export default function IndexAdmin() {
    const { user, redy } = useContext(UserContext);

    if (!redy) {
        return '...Loading';
    }
    if (!user) {
        return <Navigate to="/login" />;
    }

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
