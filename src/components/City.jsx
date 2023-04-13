import React from 'react';

function City({ city, activationIndex, active, setActive, setcityInputValue, setCity }) {
  const setCity1 = (city) => {
    // console.log(city);
    setActive(activationIndex);
    setCity(city);
    setcityInputValue('');
  };
  return (
    <div
      className={activationIndex === active ? 'active-record city' : 'city'}
      onClick={() => {
        setCity1(city.city);
      }}
    >
      <span>{city.city}</span>
      <span> | ~ {city.avg_temperature} &deg;C</span>
    </div>
  );
}

export default City;
