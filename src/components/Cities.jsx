import React from 'react';
import City from './City';

const Cities = ({ active, setActive, isScrollingToTop, setIsScrollingToTop, citiesList, setCity }) => {
  const listRef = React.useRef();
  const scrollDown = (active) => {
    let paddingForScroll=5;
    // console.log('setIsScrollingToTop',setIsScrollingToTop);
    // console.log('isSrollingToTop', isScrollingToTop);
    // setting padding in rows for scrollIntoView to make visible strings between activated element and top-bottom borders
    let listNumber = active.cityNumber;
    if (active.cityNumber + (isScrollingToTop ? -paddingForScroll : paddingForScroll) < paddingForScroll) {
      listNumber = 0;
    } else if (active.cityNumber + (isScrollingToTop ? -paddingForScroll : paddingForScroll) > citiesList.length - paddingForScroll) {
      listNumber = citiesList.length;
    } else {listNumber = (active.cityNumber + (isScrollingToTop ? -paddingForScroll : paddingForScroll))}
    // console.log('listNumber',listNumber);
    listRef.current.children[listNumber].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
    active.activationEvent.stopPropagation();
    // listRef.current.children[active].addEventListener('scroll', () => console.log('rrrrr'));
  };
  const [cityInputValue, setcityInputValue] = React.useState('');
  React.useEffect(() => {
    if (cityInputValue) {
      const timer = setTimeout(() => {
        setCity(cityInputValue);
        setActive({ cityNumber: null, activationEvent: null });
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
            setIsScrollingToTop={setIsScrollingToTop}
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
