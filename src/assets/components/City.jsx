import React from 'react';
import { weatherContext } from '../../App';

function City({cityInfo, activationIndex, scrollDown, setcityInputValue }) {
  const { setCity, active, setActive, setIsScrollingToTop } = React.useContext(weatherContext);
  if (activationIndex === active.cityNumber) {
    scrollDown(active);
  }
  // console.log('setIsScrollingToTop',setIsScrollingToTop);
  const setCity1 = (cityInfo, e) => {
    setActive({ cityNumber: activationIndex, activationEvent: e });
    setCity(cityInfo);
    setcityInputValue('');
    scrollDown({ cityNumber: activationIndex, activationEvent: e });
  };
  return (
    <div
      className={activationIndex === active.cityNumber ? 'active-record city' : 'city'}
      onClick={(e) => {
        setCity1(cityInfo.city, e);
        e.stopPropagation();
        setIsScrollingToTop((prev) => {
          if (activationIndex !== active.cityNumber) {
            return activationIndex < active.cityNumber;
          } else return prev;
        });
      }}
    >
      <span>{cityInfo.city}</span>
      <span> | ~ {cityInfo.avg_temperature} &deg;C</span>
    </div>
  );
}

export default City;
