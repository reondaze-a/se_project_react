import './WeatherCard.css'
import { CurrentTemperatureUnitContext } from '../../../contexts/CurrentTemperatureUnitContext';
import { weatherBackgrounds } from '../../../utils/constants'
import { useContext } from 'react'


const hour = new Date().getHours();
let partOfDay;

if (hour < 18 && hour >= 6) {
  partOfDay = "day";
} else {
  partOfDay = "night";
}



export default function WeatherCard({ weatherData, currentTemp }) {
    const tempData = useContext(CurrentTemperatureUnitContext);
    
    const currentWeather = weatherData ? weatherData.weather[0].main : null;
    const currentWeatherBackground = weatherBackgrounds[partOfDay][currentWeather];


    return (
        <div 
            className="weather-card"
            style={{ backgroundImage: `url(${currentWeatherBackground})` }}
        >
            <p 
                className="weather-card__temperature">{
                    weatherData ? currentTemp : 'Loading...'}
            </p>
        </div>
    )
}