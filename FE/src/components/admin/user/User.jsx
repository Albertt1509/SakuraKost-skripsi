import React, { useEffect, useState } from "react"
import axios from "axios"
export default function User() {
    const [users, setUser] = useState([]);

    useEffect(() => {
        axios.get('/api/users')
            .then((response) => {
                setUser(response.data)
            })
            .catch((error) => {
                console.error(error);
            })
    }, []);
    const adminUsers = users.filter((user) => user.role === "admin");
    const regularUsers = users.filter((user) => user.role === "user");
    return (
        <>
            <div className="bg-gray-100 h-screen w-full">
                <h1 className="text-2xl font-bold p-5">Data Admin</h1>
                <div className="bg-white m-6 p-[30px] border-solid border-[#BAC7D5] border rounded">
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="border px-0.5 py-1">NO</th>
                                <th className="border px-0.5 py-1">Nama</th>
                                <th className="border px-0.5 py-1">Alamat</th>
                                <th className="border px-0.5 py-1">Role</th>
                                <th className="border px-0.5 py-1">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminUsers.map((user, index) => (
                                <tr key={user._id}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{user.name}</td>
                                    <td className="border px-4 py-2">{user.alamat}</td>
                                    <td className="border px-4 py-2">{user.role}</td>
                                    <td className="border px-4 py-2">
                                        {/* ... Action buttons ... */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h1 className="text-2xl font-bold p-5">Data Pengguna </h1>
                <div className="bg-white m-6 p-[30px] border-solid border-[#BAC7D5] border rounded">
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="border px-0.5 py-1">NO</th>
                                <th className="border px-0.5 py-1">Nama</th>
                                <th className="border px-0.5 py-1">Alamat</th>
                                <th className="border px-0.5 py-1">Role</th>
                                <th className="border px-0.5 py-1">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {regularUsers.map((user, index) => (
                                <tr key={user._id}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{user.name}</td>
                                    <td className="border px-4 py-2">{user.alamat}</td>
                                    <td className="border px-4 py-2">{user.role} </td>
                                    <td className="border px-4 py-2">
                                        <div className="flex justify-center mx-auto items-center gap-2">
                                            <button onClick='' className='update'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="edit w-7 h-7 bg-yellow-400 p-1 rounded-lg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </svg>
                                            </button>
                                            <button onClick='' className='delete'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 bg-purple-400 p-1 rounded-lg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                                </svg>
                                            </button>
                                            <button onClick='' className='delete'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 bg-green-400 p-1 rounded-lg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                                </svg>

                                            </button>
                                        </div></td>

                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}