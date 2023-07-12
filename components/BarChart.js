import React from 'react';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export function BarChart() {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        axios.get(`https://proxy-server-tau-fawn.vercel.app/testtechnext1-pearl118.b4a.run/search/api/phases`)
        .then(res => {
            let result = res.data;
            let newdata = [];

            for (const item of result) {
                if (item.phase != null) newdata.push(item)
            }
            // console.log(newdata)
            
            let labels = newdata.map(e =>e.phase);
            if (newdata.length > 0 && labels.length) setIsLoading(false);

            setData({
                labels,
                datasets: [
                    {
                        label: 'entries',
                        data: newdata.map(x => x.entries),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                ],
            })

        })
        .catch(err => {
            console.log(err.message);
        });
    }, []);


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Bar Chart',
            },
        },
    };

    return <div>
        <div className=''>
            {isLoading ? (
                <div className="d-flex justify-content-center mt-3">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    <div>
                        <Bar options={options} data={data} />
                    </div>
                </>
            )}
        </div>
    </div>;
}