import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Axios from 'axios';

const BarChartWithAPI = () => {
    const [kostDataLength, setKostDataLength] = useState(0);

    useEffect(() => {
        Axios.get('/api/kost')
            .then((response) => {
                setKostDataLength(response.data.length);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const chartData = {
        series: [
            {
                name: 'Kost',
                data: [kostDataLength],
            },
        ],
        options: {
            chart: {
                height: 150,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    columnWidth: '25%',
                    endingShape: 'rounded',
                },
            },
            dataLabels: {
                enabled: true,
            },
            xaxis: {
                categories: ['Kos'],
                labels: {
                    show: false,
                },
            },
            fill: {
                colors: ['#5e35b1'],
            },
        },
    };

    return (
        <div className="w-full">
            <div className="bg-white rounded-lg flex flex-col items-center justify-center w-[445px] h-auto flex-shrink-0">
                <h1 className="text-2xl font-bold mb-4">Data Jumlah Kos</h1>
                <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={188} />
            </div>
        </div>
    );
};

export default BarChartWithAPI;
