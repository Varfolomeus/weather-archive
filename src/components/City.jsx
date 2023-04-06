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
      <span> average {city.avg_temperature}</span>
    </div>
  );
}

export default City;
