import React, {Component} from 'react'
import styles from './IntroFour.scss'
import { Redirect } from "react-router-dom"
import classNames from 'classnames/bind'
import SearchDetail from "components/SearchDetail"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts"

const cx = classNames.bind(styles)

const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];
const data = [
    {name: 'Page A',  count: 1, },
    {name: 'Page B',  count: 2, },
    {name: 'Page C',  count: 4, },
    {name: 'Page D',  count: 5, },
    {name: 'Page E',  count: 3, },
    {name: 'Page F',  count: 6, },
    {name: 'Page G',  count: 2, },  
];


class IntroFour extends Component {
    state = {  }
    render() {
        return (
            <BarChart width={600} height={300} data={data}
                margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend />
                <Bar dataKey="count" stackId="a" fill="#8884d8" />
                {/* <Bar dataKey="uv" stackId="a" fill="#82ca9d" /> */}
            </BarChart>
        )
    }
}

export default IntroFour;