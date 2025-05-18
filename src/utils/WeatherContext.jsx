import React, { createContext, useState, useEffect } from 'react';
import weatherApi from './Api.js';
import { apiKey, locations } from './constants.js';
const lat = locations.Columbus.latitude;
const long = locations.Columbus.longitude;

export const WeatherContext = createContext();
const api = weatherApi(
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`
);


export function WeatherProvider({ children }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    api.fetchWeatherData()
      .then(setWeatherData)
      .catch(console.error);
  }, []);

  return (
    <WeatherContext.Provider value={weatherData}>
      {children}
    </WeatherContext.Provider>
  );
}
