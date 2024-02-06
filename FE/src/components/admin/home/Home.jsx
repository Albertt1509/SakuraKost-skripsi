import Chart from './chart'
import Grafik from './grafik'
import Jumlah from './jumlah'
import Data from './Data'

export default function Home() {
    return (
        <div className="bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold p-6">Home</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                <Chart />
                <Grafik />
                <Jumlah />
            </div>
            <div className="p-6 pt-5 flex">
                <Data />
            </div>
        </div>
    )
}
