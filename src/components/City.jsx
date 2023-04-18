import React from 'react';

function City({
  city,
  activationIndex,
  active,
  scrollDown,
  setActive,
  setcityInputValue,
  setCity,
}) {
  if (activationIndex === active) {
    scrollDown(active);
  }

  const setCity1 = (city, e) => {
    setActive(activationIndex);
    setCity(city);
    setcityInputValue('');
    scrollDown(activationIndex);
  };
  return (
    <div
      className={activationIndex === active ? 'active-record city' : 'city'}
      onClick={(e) => {
        setCity1(city.city, e);
      }}
    >
      <span>{city.city}</span>
      <span> | ~ {city.avg_temperature} &deg;C</span>
    </div>
  );
}

export default City;
