import { Link, useParams } from "react-router-dom";

export default function KostPage() {
    const { action } = useParams()
    return (
        <div className="">
            {action !== 'new' && (
                <div className="text-center mt-5">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-lg " to={'/account/kost/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                        </svg>
                        Add Kost
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div className="max-w-md mx-auto bg-white bg-opacity-50 shadow-md  mt-5  p-6 rounded-lg">
                    <form action="" className="space-y-4">
                        <h2 className="text-2xl font-bold">Title</h2>
                        <input
                            type="text"
                            placeholder="Title, for example: My Kost"
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                        <h2 className="text-2xl font-bold">Address</h2>
                        <input
                            type="text"
                            placeholder="Address"
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                        <h2 className="text-2xl font-bold">Upload Image</h2>
                        <p className="text-xs text-gray-500">You can upload more photos</p>
                        <button className="w-20 h-20 border bg-white rounded-lg flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                        </button>
                        <h2 className="text-2xl font-bold">Description</h2>
                        <input
                            type="text"
                            placeholder="Add your address"
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                    </form>
                </div>

            )}
            my kost
        </div>
    )
}