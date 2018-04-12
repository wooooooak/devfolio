import React from 'react'
import styles from './SkillChart.scss'
import { Redirect } from "react-router-dom"
import classNames from 'classnames/bind'
import MediaQuery from 'react-responsive';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts"

const cx = classNames.bind(styles)

const SkillChart = ({chartData}) => {
    console.log(chartData);
    return (
        <div className={cx('skillChartContent')}>
            <p>종합</p>
            <MediaQuery query="(min-device-width: 1224px)">
                <BarChart 
                    className = {cx('barChart')}
                    width={700} height={300} data={chartData}
                    margin={{top: 20, right: 30, left: 0, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend />
                    <Bar dataKey="project" stackId="a" fill="#8884d8" />
                    {/* <Bar dataKey="uv" stackId="a" fill="#82ca9d" /> */}
                </BarChart>
            </MediaQuery>
            <MediaQuery query="(max-device-width: 1224px)">
                <BarChart 
                    className = {cx('barChart')}
                    width={300} height={300} data={chartData}
                    margin={{top: 20, right: 30, left: 0, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend />
                    <Bar dataKey="project" stackId="a" fill="#8884d8" />
                    {/* <Bar dataKey="uv" stackId="a" fill="#82ca9d" /> */}
                </BarChart>
            </MediaQuery>
        </div>
    )
}

export default SkillChart;
