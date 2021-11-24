import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Countries } from './Countries.js';
import { Filter } from './Filter.js';
import { Country } from './Country';

const App = () => {

  const [ countries, setCountries ] = useState([]);
  const [ citiesWeather, setCitiesWeather ] = useState([]);
  const [ newFilter, setNewFilter ] = useState({value:'', state: false});
  const [ showButton, setShowButton ] = useState({value:'', state: false});
  const [params, setParams] = useState({
    key: process.env.REACT_APP_WEATHER_API_KEY,
    q: 'auto:ip'
  })

  useEffect(() => {

    const eventHandler = response => {
      setCountries(response.data)
    }      

    const eventHandler2 = response => {
      setCitiesWeather(response.data)
    } 

    const promise = axios.get('https://restcountries.com/v2/all')
    promise.then(eventHandler)

    const promise2 = axios.get('http://api.weatherapi.com/v1/current.json', {params})
    promise2.then(eventHandler2).catch(error => {
    });
      
  }, [params])


  const handleChangeFilter = (event) => {
    event.preventDefault();
    
    const country = countryFiltered[0]

    const filter = {
      value: event.target.value,
      state: (() => !(newFilter.state))
    }

    const showButtonToAdd = {
      ...showButton,
      state: false
    }

    setNewFilter(filter);
    setShowButton(showButtonToAdd);  
    console.log(country)
    setParams({...params, q: country.capital}) 
  };

  const countryFilter = (country) => (country.name.toLowerCase().startsWith(newFilter.value.toLowerCase()))

  const countryFiltered = countries.filter(countryFilter);

  const handleShowButton = (country) => {
    return () => {
      const showButtonToAdd = {
        value: country,
        state: true
      }
      
      setShowButton(showButtonToAdd);
      console.log(country.capital)
      setParams({...params, q: country.capital})
    }
  }
   
  return (
    <div>
      <Filter setValue={handleChangeFilter} text={newFilter.value} />
      {countryFiltered.length < 10 || newFilter.state === true ? (
        showButton.state ? (
          <Country key={showButton.value} country={showButton.value} weather={citiesWeather} />
        ) : (
        countryFiltered.length === 1 ? (
          countryFiltered.map((country) => (
            <Country key={country.name} country={country} weather={citiesWeather} />
          ))
        ) : (
        countries
        .filter((country) => {
          if(newFilter.state === false)return false;
          return countryFilter(country)
        })
        .map((country) => (
          <div key={country.name}>
            <Countries {...country} />
            <button onClick={handleShowButton(country)}>show</button>
          </div>
        ))
        ))) : (
          <p>Too many matches, specify another filter</p>
        )            
      } 
    </div>
  )

}

export default App;
