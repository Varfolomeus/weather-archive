import React from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';
import Cities from './components/Cities';
import WeatherArchive from './components/WeatherArchive';

const {
  REACT_APP_SUPABASE_URL,
  REACT_APP_SUPABASE_KEY,
  REACT_APP_NINJA_API_CITY_KEY,
  REACT_APP_OPEN_WEATHER_API_KEY,
} = process.env;

function App() {
  const [citiesList, setCitiesList] = React.useState([]);
  const [weatherArchive, setWeatherArchive] = React.useState([]);
  const [isScrollingToTop, setIsScrollingToTop] = React.useState(false);
  const [city, setCity] = React.useState('');
  const [active, setActive] = React.useState({ cityNumber: null, activationEvent: null });
  const supabase = React.useMemo(() => createClient(REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY), [
    REACT_APP_SUPABASE_URL,
    REACT_APP_SUPABASE_KEY,
  ]);
  // console.log(REACT_APP_NINJA_API_CITY_KEY);
  React.useEffect(() => {
    getCitiesList().then((data) => setCitiesList(data));
  }, []);
  React.useEffect(() => {
    // console.log('effect change city');
    getCitiesarchive(city);
  }, [city]);

  const getCitytData = async (city) => {
    let { data, error } = await supabase
      .from('weather_archive')
      .select('city, timestamp,weather_object')
      .eq('city', city)
      .order('timestamp', { ascending: false })
      .limit(1);
    if (error) {
      console.log('someting wrong with data', error);
    }
    return data;
  };
  const getUpdatedCitytData = async (city) => {
    let { data, error } = await supabase
      .from('city_records')
      .select('city, day, avg_temperature, wind, avg_weather_cond, avg_weather_descr')
      .eq('city', city);
    if (error) {
      console.log('someting wrong with data', error);
    }
    return data;
  };
  // console.log('city', city);
  const getCitiesarchive = async (city) => {
    let countryCode = '';
    let parentData = [];
    // debugger;
    await getCitytData(city).then((innitialData) => (parentData = innitialData));
    // console.log('parentData', parentData);
    if (parentData.length > 0 || city !== '') {
      let gap = 0;
      // console.log('-----before comparing gap-----', parentData);
      if (!parentData.length) {
        // debugger;
        setWeatherArchive([]);
      } else {
        gap = ((new Date() - new Date(parentData[0].timestamp)) / 3600000).toFixed(2);
        countryCode = parentData[0].weather_object.sys.country;
        // console.log('gap', gap, 'countryCode', countryCode);
      }
      // console.log('gap', gap);
      if (gap > 2 && parentData.length !== 0) {
        (await getWeatherFromServer(city, countryCode)).json().then(async (data1) => {
          // debugger;
          const weatherObject = data1;
          const cityToStore = city;
          const temperatureToStore = (data1.main.temp - 273.15).toFixed(2);
          const timeStampToStore = new Date(data1.dt * 1000).toISOString().toLocaleString('zh-TW');
          let isStored = await storeDataToBase(cityToStore, temperatureToStore, timeStampToStore, weatherObject);
          if (!isStored) {
            return;
          }
          getUpdatedCitytData(city).then((data2) => {
            // debugger;
            // console.log(data2);
            setWeatherArchive(data2);
          });
        });
      } else if (gap > 2 || parentData.length === 0) {
        // debugger;
        (await getCountry(city)).json().then(async (data) => {
          if (!data.length) {
            setWeatherArchive([]);
            setCity('');
            return;
          }
          countryCode = data[0].country;
          let cityFromNinjaAPI = data[0].name;
          let checkCity = city !== cityFromNinjaAPI && city.length <= 3;
          // debugger;
          setCity(cityFromNinjaAPI);
          if (checkCity) {
            // debugger;
            return;
          }
          (await getWeatherFromServer(cityFromNinjaAPI, countryCode)).json().then(async (data1) => {
            // debugger;
            const weatherObject = data1;
            const cityToStore = cityFromNinjaAPI;
            const temperatureToStore = (data1.main.temp - 273.15).toFixed(2);
            const timeStampToStore = new Date(data1.dt * 1000).toISOString().toLocaleString('zh-TW');
            let isStored = await storeDataToBase(cityToStore, temperatureToStore, timeStampToStore, weatherObject);
            if (!isStored) {
              return;
            }
            getUpdatedCitytData(city).then((data2) => {
              // debugger;
              // console.log(data2);
              setWeatherArchive(data2);
            });
          });
        });
      } else {
        getUpdatedCitytData(city).then((data2) => setWeatherArchive(data2));
      }
    }
  };

  const storeDataToBase = async (cityToStore, temperatureToStore, timeStampToStore, weatherObject) => {
    // debugger;
    const { error } = await supabase.from('weather_archive').insert({
      city: cityToStore,
      temperature: temperatureToStore,
      timestamp: timeStampToStore,
      weather_object: weatherObject,
    });
    if (error) {
      console.log('cant store to base', error);
      return false;
    }
    // debugger;
    return true;
  };

  const getWeatherFromServer = async (city, countryCode) => {
    // debugger;
    return await fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        ',' +
        countryCode +
        '&APPID=' +
        REACT_APP_OPEN_WEATHER_API_KEY
    );
  };

  const getCountry = async (city) => {
    // debugger;
    return await fetch('https://api.api-ninjas.com/v1/city?name=' + city, {
      method: 'GET',
      headers: {
        'X-Api-Key': REACT_APP_NINJA_API_CITY_KEY,
      },
    });
  };

  const getCitiesList = async () => {
    const { data, error } = await supabase.from('distinct_city').select();
    if (error) {
      console.log('someting wrong with data', error);
    }
    // console.log(data);
    return data;
  };
  // console.log(citiesList);

  return (
    <div className="wrapper">
      <h1 className="main-header">Hello from weather archive!</h1>
      <div className="App">
        <div className="leftside">
          <h2 className="left-side-header">Cities list</h2>
          <div className="lister">
            <h3
              onClick={(e) => {
                if (active.cityNumber === null || active.cityNumber === 0) {
                  setActive({ cityNumber: citiesList.length - 1, activationEvent: e });
                  setCity(citiesList[citiesList.length - 1].city);
                  setIsScrollingToTop(false);
                } else {
                  setActive((prev) => {
                    return { cityNumber: prev.cityNumber - 1, activationEvent: e };
                  });
                  // console.log(active);
                  setCity(citiesList[active.cityNumber - 1].city);
                  setIsScrollingToTop(true);
                }
              }}
              className="lister-button"
            >
              prev
            </h3>
            <h3
              onClick={(e) => {
                if (active.cityNumber === null || active.cityNumber === citiesList.length - 1) {
                  setActive({ cityNumber: 0, activationEvent: e });
                  setCity(citiesList[0].city);
                  setIsScrollingToTop(true);
                } else {
                  setActive((prev) => {
                    return { cityNumber: prev.cityNumber + 1, activationEvent: e };
                  });
                  // console.log(active);
                  setCity(citiesList[active.cityNumber + 1].city);
                  setIsScrollingToTop(false);
                }
              }}
              className="lister-button"
            >
              next
            </h3>
          </div>
          {citiesList && (
            <Cities
              active={active}
              citiesList={citiesList}
              isScrollingToTop={isScrollingToTop}
              setIsScrollingToTop={setIsScrollingToTop}
              setActive={setActive}
              setCity={setCity}
            />
          )}
          <button
            className="button"
            onClick={() => {
              // console.log('button reload click');
              getCitiesList().then((uniqueRows) => setCitiesList(uniqueRows));
            }}
          >
            Reload cities list
          </button>
        </div>

        <div className="rightside">
          <h2 className="archive-body-header">{city ? 'Chosen city - ' + city : 'Select city'}</h2>
          {citiesList && city && weatherArchive && weatherArchive.length > 0 && (
            <WeatherArchive
              city={city}
              active={active}
              setCity={setCity}
              setIsScrollingToTop={setIsScrollingToTop}
              citiesList={citiesList}
              setActive={setActive}
              archive={weatherArchive}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
