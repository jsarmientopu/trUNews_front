import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function StatisticsGraph (statistics: any) {

    let categories = statistics.statistics.map((item: { category: any; }) => item.category);
    let views = statistics.statistics.map((item: { views: any; }) => item.views);
    let totalViews = views.reduce((a: any, b: any) => a + b, 0);

    const [dataSample, setDataSample] = useState({
        options: {
        chart: {
            id: "basic-bar"
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded',
                dataLabels: {
                    position: 'top'
                }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val: number) {
                return Math.floor(val*100 / totalViews) + "%";
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: categories,
            title: {
                text: 'Categories'
            },
        },
        yaxis: {
            title: {
                text: 'Views'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val: number) {
                    return val + " views"
                }
            }
        },
        theme: {
            palette: 'palette2'
        }
        },
        series: [
        {
            name: "Views",
            data: views,
        },
        ],
    });

    return (
        <div>
            <Chart
            options={dataSample.options}
            series={dataSample.series}
            type="bar"
            width="500"
        />
        </div> 
    );
}