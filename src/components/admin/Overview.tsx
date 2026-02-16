"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export function Overview() {
    const data = [
        {
            name: "Jan",
            total: 2400,
        },
        {
            name: "Feb",
            total: 1398,
        },
        {
            name: "Mar",
            total: 9800,
        },
        {
            name: "Apr",
            total: 3908,
        },
        {
            name: "May",
            total: 4800,
        },
        {
            name: "Jun",
            total: 3800,
        },
        {
            name: "Jul",
            total: 4300,
        },
        {
            name: "Aug",
            total: 2400,
        },
        {
            name: "Sep",
            total: 1398,
        },
        {
            name: "Oct",
            total: 9800,
        },
        {
            name: "Nov",
            total: 3908,
        },
        {
            name: "Dec",
            total: 4800,
        },
    ]

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                />
                <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-white"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}
