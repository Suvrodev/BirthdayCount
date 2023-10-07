import React from "react";
import Marquee from "react-fast-marquee";
import './About.css'
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
} from "recharts";
import { Helmet } from "react-helmet-async";
const data = [
  {
    name: "HTML",
    total: 100,
    max: 100,
    min: 80,
    avg: 90,
  },
  {
    name: "CSS",
    total: 100,
    max: 98,
    min: 80,
    avg: 91,
  },
  {
    name: "Tailwind",
    total: 100,
    max: 90,
    min: 80,
    avg: 85,
  },
  {
    name: "React",
    total: 100,
    max: 80,
    min: 60,
    avg: 70,
  },
  {
    name: "Express",
    total: 100,
    max: 80,
    min: 70,
    avg: 75,
  },
  {
    name: "MongoDB",
    total: 100,
    max: 90,
    min: 80,
    avg: 85,
  },
];

const About = () => {
  return (
    <div>
       <Helmet>
                 <title>About || Birthday</title>
        </Helmet>
      <div className="Marque flex gap-5 bg-orange-600 p-2 m-5 rounded-md">
        <button className="btn btn-error text-white">Update</button>
        <Marquee speed={100} autoFill={true}>
          You can Add Your Friend, and update and delete, You can Search, And
          show your friend ascending and descending order which depend on
          ratting,Pagination will be added
        </Marquee>
      </div>
      
      <div className="chart   ">
        <ComposedChart
            className="ComposedChart"
            width={1000}
            height={400}
            data={data}
            margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
            }}
        >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" className="XAxis" />
            <YAxis className="YAxis" />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="min" fill="#8884d8" stroke="#8884d8" />
            <Bar dataKey="max" barSize={40} fill="#413ea0" />
            <Line type="monotone" dataKey="total" stroke="#ff7300" />
            <Scatter dataKey="avg" fill="red" />
        </ComposedChart>
      </div>
    </div>
  );
};

export default About;
