import React, {useState, useEffect} from 'react'; //Basic imports + specific things we need

import { fetchDailyData } from '../../api'; //Exit the folder twice
import styles from './Chart.module.css';

import {Line, Bar} from 'react-chartjs-2';

const Chart = ({data: {confirmed, deaths, recovered}, country}) => {
    
    const [dailyData, setDailyData] = useState([]); //Define the state named "dailyData" as an array

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        
        fetchAPI(); //Calling a function for it to work
    },[]);

    const lineChart = (
        dailyData.length ?( //Conditional operator
        //LINE gives a linear graph
            <Line data={{ 
                labels: dailyData.map(({date}) => date),
                datasets: [{
                    data: dailyData.map(({confirmed}) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                }, {
                    data: dailyData.map(({deaths}) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true,
                }]
        }}/>) : null 

    );
    
    console.log(confirmed, recovered, deaths)

    const barChart = (
        confirmed ? (<Bar
        data={{
            labels: ['Infected', 'Recovered', 'Deaths'],
            datasets: [{
                label: 'People',
                backgroundColor: [ 
                 'rgba(0, 0, 255, 0.5)',
                 'rgba(0, 255, 0, 0.5)',
                 'rgba(255, 0, 0, 0.5)',
                ],
                data:  [confirmed.value, recovered.value, deaths.value]
            }]
        }} options={{
            legend: {display: false},
            title: {display: true, text: `Curent state in ${country}`},
        }}/>) : null 
    )

    return (
        <div className={styles.container}>
           {country ? barChart : lineChart}
        </div>
    )
}

export default Chart; //The basis of each component
