import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function WeatherArchive({ city, archive, citiesList, setCity, active, setActive }) {
  // console.log(city, archive);
  if (archive.length < 2) {
    archive.push(archive[0]);
  }
  return (
    <div className="archive-data">
      <div className="archive-table-wrapper">
        <h3>Archived data average for {city}</h3>
        <table className="archive-table-container">
          <tbody>
            <tr>
              <th className="archive-table">Recorded at</th>
              <th className="archive-table">Temperature, &deg;C</th>
              <th className="archive-table">Wind speed, m/s</th>
            </tr>
          </tbody>
        </table>
        <div className="data-cell">
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
      </div>
      <div className="grapf-container">
        <div
          onClick={() => {
            if (active === null || active === 0) {
              setActive(citiesList.length - 1);
              setCity(citiesList[citiesList.length - 1].city);
            } else {
              setActive((prev) => prev - 1);
              setCity(citiesList[active - 1].city);
            }
          }}
          className="lister-button-rotated90 left-side"
        >
          <div className="triangle-foreground-left"></div>
        </div>
        <div>
          <div>
            <h2 className="temperature-graph-title">Archived data change graph for {city}</h2>
            <ResponsiveContainer aspect={1.7} maxHeight={1400}>
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
                <XAxis dataKey="day" label={{ value: `Recorded at`, position: 'insideBottomRight', dy: 17 }} />
                <YAxis
                  label={{
                    value: `Temperature, °C`,
                    fill: '#3dd49a',
                    position: 'insideBottomCenter',
                    angle: -90,
                    dx: -10,
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  label={{
                    value: `Wind speed, m/s`,
                    position: 'insideBottomCenter',
                    fill: '#82ca00',
                    angle: -90,
                    dx: 10,
                  }}
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="avg_temperature"
                  stroke="#3dd49a"
                  strokeWidth={4}
                  activeDot={{ r: 8 }}
                  label={{ position: 'insideBottomLeft', fill: '#3dd49a', angle: -90, dy: -10 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="wind"
                  stroke="#82ca00"
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                  label={{ position: 'insideBottomLeft', fill: '#82ca00', angle: -90, dy: -10, dx: 13 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <h2 className="temperature-graph-title">Archived weather conditions change graph for {city}</h2>
            <ResponsiveContainer background={{ fill: 'rgba(0, 0, 0, 0.05)' }} aspect={1.7} maxHeight={1400}>
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
                <XAxis dataKey="day" label={{ value: `Recorded at`, position: 'insideBottomRight', dy: 17 }} />
                <YAxis
                  type="number"
                  // ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]}
                  tickCount={5}
                  tickFormatter={(...allArgs) => {
                    // console.log(allArgs);
                    if (allArgs[0] >= 0 && allArgs[0] < 10) return 'Freeze';
                    if (allArgs[0] >= 10 && allArgs[0] < 20) return 'Snow';
                    if (allArgs[0] >= 20 && allArgs[0] < 30) return 'Sand';
                    if (allArgs[0] >= 30 && allArgs[0] < 40) return 'Dust';
                    if (allArgs[0] >= 40 && allArgs[0] < 50) return 'Thunderstorm';
                    if (allArgs[0] >= 50 && allArgs[0] < 60) return 'Rain';
                    if (allArgs[0] >= 60 && allArgs[0] < 70) return 'Drizzle';
                    if (allArgs[0] >= 70 && allArgs[0] < 80) return 'Fog';
                    if (allArgs[0] >= 80 && allArgs[0] < 90) return 'Mist';
                    if (allArgs[0] >= 90 && allArgs[0] < 100) return 'Smoke';
                    if (allArgs[0] >= 100 && allArgs[0] < 110) return 'Haze';
                    if (allArgs[0] >= 110 && allArgs[0] < 120) return 'Clouds';
                    if (allArgs[0] >= 120) return 'Clear';
                  }}
                  domain={['dataMin-10', 'dataMax']}
                  label={{
                    value: `Weather condition`,
                    fill: '#3dd49a',
                    position: 'insideRightCenter',
                    angle: -90,
                    dx: -10,
                  }}
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="avg_weather_cond"
                  stroke="#3dd49a"
                  strokeWidth={4}
                  activeDot={{ r: 8 }}
                  // label={{ position: 'insideBottomLeft', fill: '#3dd49a', angle: -90, dy: -10 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div
          onClick={() => {
            if (active === null || active === citiesList.length - 1) {
              setActive(0);
              setCity(citiesList[0].city);
            } else {
              setActive((prev) => prev + 1);
              setCity( citiesList[active + 1].city);
            }
          }}
          className="lister-button-rotated90 right-side"
        >
          <div className="triangle-foreground-right"></div>
        </div>
      </div>
    </div>
  );
}

export default WeatherArchive;
