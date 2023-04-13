import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function WeatherArchive({ city, archive }) {
  // console.log(city, archive);
  if (archive.length < 2) {
    archive.push(archive[0]);
  }
  return (
    <div>
     <h3 className='archive-body-header'>Archived data average for {city}</h3> 
      <table className="archive-table-container">
        <tbody>
          <tr>
            <th className="archive-table">Recorded at</th>
            <th className="archive-table">Temperature, &deg;C</th>
            <th className="archive-table">Wind speed, m/s</th>
          </tr>
        </tbody>
      </table>
      <div className='data-cell'>
        <table className="archive-table-container archive-table-body">
          <tbody>
            {archive.map((rec, i) => (
              <tr key={i + 'rec'}>
                <td className="archive-table">{rec.day}</td>
                <td className="archive-table">{rec.avg_temperature}</td>
                <td className="archive-table">{rec.wind}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="temperature-graph-title">Archived data change graph for {city}</h2>
      <ResponsiveContainer aspect={1.7}>
        <LineChart
          data={archive}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="avg_temperature" stroke="#3dd49a" strokeWidth={4} activeDot={{ r: 8 }} />
          <Line yAxisId="right" type="monotone" dataKey="wind" stroke="#82ca00" strokeWidth={3} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeatherArchive;
