import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import Axios from 'axios';

const VerticalBarChart = () => {
    const [selesaiDataLength, setSelesaiDataLength] = useState(0);
    const [batalDataLength, setBatalDataLength] = useState(0);

    useEffect(() => {
        Axios.get('/api/selesai')
            .then((response) => {
                setSelesaiDataLength(response.data.length);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        Axios.get('/api/batal')
            .then((response) => {
                setBatalDataLength(response.data.length);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        const chartOptions = {
            chart: {
                type: 'bar',
                height: 240,
                background: '#ffffff',
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    endingShape: 'rounded',
                    columnWidth: '55%',
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent'],
            },
            series: [
                {
                    name: 'Selesai',
                    data: [selesaiDataLength],
                },
                {
                    name: 'Batal',
                    data: [batalDataLength],
                },
            ],
            xaxis: {
                categories: ['Data'],
            },
            yaxis: {
                title: {
                    text: 'Jumlah',
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + ' data';
                    },
                },
            },
        };

        const chart = new ApexCharts(document.getElementById('vertical-bar-chart'), chartOptions);
        chart.render();

        return () => {
            chart.destroy();
        };
    }, [selesaiDataLength, batalDataLength]);

    return (
        <div className="bg-white rounded-lg flex flex-col items-center justify-center w-[445px] h-auto flex-shrink-0">
            <div className="relative">
                <h1 className="text-2xl font-bold text-center">Data Penjualan</h1>
                <div id="vertical-bar-chart" />
            </div>
        </div>
    );
};

export default VerticalBarChart;
