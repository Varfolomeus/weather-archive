import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function WeatherArchive({ city, archive }) {
  // console.log(city, archive);
  if (archive.length < 2) {
    archive.push(archive[0]);
  }
  return (
    <div>
      Archived data for {city}
      <table className="archive-table-container">
        <tbody>
          <tr>
            <th className="archive-table left-column">Recorded at</th>
            <th className="archive-table">Temperature, &deg;C</th>
          </tr>
        </tbody>
      </table>
      <div className="archive-table-wrapper">
        <table className="archive-table-container">
          <tbody>
            {archive.map((rec, i) => (
              <tr className="archive-table-container" key={i + 'rec'}>
                <td className="archive-table">{rec.day}</td>
                <td className="archive-table">{rec.avg_temperature}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="temperature-graph-title">Temperature change graph for {city}</h2>
      <LineChart
        width={800}
        height={350}
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
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="avg_temperature" stroke="#3dd49a" strokeWidth={4} activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
}

export default WeatherArchive;
