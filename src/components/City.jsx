import React from 'react';

function City({ city, activationIndex, active, scrollDown, setActive, setIsScrollingToTop, setcityInputValue, setCity }) {
  if (activationIndex === active.cityNumber) {
    scrollDown(active);
  }
// console.log('setIsScrollingToTop',setIsScrollingToTop);
  const setCity1 = (city, e) => {
    setActive({ cityNumber: activationIndex, activationEvent: e });
    setCity(city);
    setcityInputValue('');
    scrollDown({ cityNumber: activationIndex, activationEvent: e });
  };
  return (
    <div
      className={activationIndex === active.cityNumber ? 'active-record city' : 'city'}
      onClick={(e) => {
        setCity1(city.city, e);
        e.stopPropagation();
        setIsScrollingToTop(prev=> {if (activationIndex !== active.cityNumber) {
          return activationIndex < active.cityNumber
        } else return prev;
      })
      }}
    >
      <span>{city.city}</span>
      <span> | ~ {city.avg_temperature} &deg;C</span>
    </div>
  );
}

export default City;
