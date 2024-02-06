import { useEffect, useState } from "react"
import axios from "axios"

export default function User() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/api/users')
            .then((response) => {
                setUsers(response.data)
            })
            .catch((error) => {
                console.error(error);
            })
    }, []);

    const superAdminUsers = users.filter((user) => user.role === "superAdmin");
    const adminUsers = users.filter((user) => user.role === "admin");
    const regularUsers = users.filter((user) => user.role === "user");

    return (
        <>
            <div className="bg-gray-100 h-screen w-full">
                <h1 className="text-2xl font-bold p-5">Data Super Admin</h1>
                <div className="bg-white m-6 p-[30px] border-solid border-[#BAC7D5] border rounded">
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="border px-0.5 py-1">NO</th>
                                <th className="border px-0.5 py-1">Nama</th>
                                <th className="border px-0.5 py-1">Alamat</th>
                                <th className="border px-0.5 py-1">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {superAdminUsers.map((user, index) => (
                                <tr key={user._id}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{user.name}</td>
                                    <td className="border px-4 py-2">{user.alamat}</td>
                                    <td className="border px-4 py-2">{user.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h1 className="text-2xl font-bold p-5">Data Admin</h1>
                <div className="bg-white m-6 p-[30px] border-solid border-[#BAC7D5] border rounded">
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="border px-0.5 py-1">NO</th>
                                <th className="border px-0.5 py-1">Nama</th>
                                <th className="border px-0.5 py-1">Alamat</th>
                                <th className="border px-0.5 py-1">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminUsers.map((user, index) => (
                                <tr key={user._id}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{user.name}</td>
                                    <td className="border px-4 py-2">{user.alamat}</td>
                                    <td className="border px-4 py-2">{user.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h1 className="text-2xl font-bold p-5">Data Pengguna</h1>
                <div className="bg-white m-6 p-[30px] border-solid border-[#BAC7D5] border rounded">
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="border px-0.5 py-1">NO</th>
                                <th className="border px-0.5 py-1">Nama</th>
                                <th className="border px-0.5 py-1">Alamat</th>
                                <th className="border px-0.5 py-1">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {regularUsers.map((user, index) => (
                                <tr key={user._id}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{user.name}</td>
                                    <td className="border px-4 py-2">{user.alamat}</td>
                                    <td className="border px-4 py-2">{user.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
