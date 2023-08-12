import './charts.styles.scss';
import React, { Component } from 'react';
import Chart from 'chart.js/auto';

class DoughnutChart extends Component {
    chartRef = React.createRef();
    myChart = null; // Track the chart instance

    componentDidMount() {
        this.buildChart();
    }

    componentWillUnmount() {
        if (this.myChart) {
            this.myChart.destroy(); // Destroy the chart instance when the component unmounts
        }
    }

    componentDidUpdate() {
        if (this.myChart) {
            this.myChart.destroy(); // Destroy the previous chart instance
        }
        this.buildChart();
    }

    buildChart = () => {
        const myChartRef = this.chartRef.current.getContext('2d');

        this.myChart = new Chart(myChartRef, {
            type: 'doughnut',
            data: {
                labels: ['الإناث', 'الذكور'], // Replace with your labels
                datasets: [
                    {
                        data: [1, 2], // Replace with your data values
                        backgroundColor: ['#826AED', '#3BF4FB'],
                        hoverBackgroundColor: ['#826AED', '#3BF4FB'],
                        hoverBorderColor: ['#826AED', '#3BF4FB'],
                        hoverOffset: 2,
                    },
                ],
            },
            options: {
                cutout: '65%',
                plugins: {
                    legend: {
                        position: 'bottom', // Change the position of the labels to the bottom
                    },
                },
            },
        });
    };

    render() {
        return (
            <div className='daughnut'>
                <canvas ref={this.chartRef}></canvas>
            </div>
        );
    }
}

export default DoughnutChart;
