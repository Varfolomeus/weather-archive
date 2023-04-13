import React from 'react';
import City from './City';

const Cities = ({ citiesList, setCity }) => {
  const [cityInputValue, setcityInputValue] = React.useState('');
  const [active, setActive] = React.useState(null);
  React.useEffect(() => {
    if (cityInputValue) {
      const timer = setTimeout(() => {
        setCity(cityInputValue);
        setActive('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [cityInputValue]);

  // console.log('citiesList', citiesList);
  // console.log('city', city);

  const changeHandler = (e) => {
    setcityInputValue(e.target.value);
    e.stopPropagation();
    e.preventDefault();
  };
  // console.log(citiesList);
  return (
    <div className="citylist">
      <div>
        <form data-tooltip="interruprs less then 3s">
          <input 
            className="cheet-sheet city-search-input"
            type="text"
            id="city_name"
            placeholder="Search city"
            onChange={changeHandler}
            value={cityInputValue}
          />
        </form>
      </div>
      {citiesList &&
        citiesList.map((city, i) => (
          <City
            key={i + 'city'}
            setcityInputValue={setcityInputValue}
            activationIndex={i}
            active={active}
            setActive={setActive}
            city={city}
            setCity={setCity}
          />
        ))}
    </div>
  );
};

export default Cities;
