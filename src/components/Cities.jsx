import React from 'react';
import City from './City';

const Cities = ({ active, setActive, citiesList, setCity }) => {
  const listRef = React.useRef();
  const scrollDown = (active) => {
    listRef.current.children[active].scrollIntoView({ behavior: 'smooth', block: "center", inline: "start" });
  };
  const [cityInputValue, setcityInputValue] = React.useState('');
  React.useEffect(() => {
    if (cityInputValue) {
      const timer = setTimeout(() => {
        setCity(cityInputValue);
        setActive('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [cityInputValue]);

  const changeHandler = (e) => {
    setcityInputValue(e.target.value);
    e.stopPropagation();
    e.preventDefault();
  };
  // console.log(citiesList);
  return (
    <div className="citylist" ref={listRef}>
      <div>
        <form data-tooltip="interruptions less than 3 s">
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
            scrollDown={scrollDown}
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
