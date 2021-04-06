import React, { useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './App.css';
import { useInterval } from './utilities/useInterval';

function App() {
  const [data, loadData] = useState(null);

  useInterval(async () => {
    console.log(`Calling backend api`);
    const resp = await axios({headers: {'Access-Control-Allow-Origin':'*'},method: 'get', url:'http://localhost:8080/api/testing'});
     resp.data.sort(function(a, b) {
       var keyA = new Date(a.time.concat("-01"));
        var keyB = new Date(b.time.concat("-01"));
       // Compare the 2 dates
       if (keyA < keyB) return -1;
       if (keyA > keyB) return 1;
       return 0;
     });
    loadData(resp.data);
  },5000);

  return (
      <LineChart width={900} height={300} data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis type ="number" tickCount ={6} domain = {[0,100]}/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="data" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
  );
}

export default App;
