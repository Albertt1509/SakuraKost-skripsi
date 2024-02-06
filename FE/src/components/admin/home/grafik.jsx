import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Axios from 'axios';

const DonutChartWithAPI = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        Axios.get('/api/users')
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const userCount = userData.filter((user) => user.role === 'user').length;
    const adminCount = userData.filter((user) => user.role === 'admin').length;
    const superAdminCount = userData.filter((user) => user.role === 'superAdmin').length;

    const chartData = {
        series: [userCount, adminCount, superAdminCount],
        labels: ['User', 'Admin', 'Super Admin'],
    };

    const options = {
        chart: {
            type: 'donut',
        },
        labels: chartData.labels,
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
    };

    return (
        <div className="bg-white rounded-lg flex flex-col items-center justify-center w-[445px] h-auto flex-shrink-0">
            <h1 className="text-2xl font-bold mb-4">Data User</h1>
            <ReactApexChart options={options} series={chartData.series} type="donut" height={200} width={400} />
        </div>
    );
};

export default DonutChartWithAPI;
