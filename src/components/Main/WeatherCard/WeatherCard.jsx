import './WeatherCard.css'
import dayClear from '../../../assets/weather-backgrounds/day-clear.png'
import { apiKey, locations, weatherBackgrounds } from '../../../utils/constants'
import { useContext } from 'react'
import { WeatherContext } from '../../../utils/WeatherContext'

const hour = new Date().getHours();
let partOfDay;

if (hour < 18 && hour >= 6) {
  partOfDay = "day";
} else {
  partOfDay = "night";
}



export default function WeatherCard() {
    const weatherData = useContext(WeatherContext)
    
    const currentWeather = weatherData ? weatherData.weather[0].main : null;
    const currentWeatherBackground = weatherBackgrounds[partOfDay][currentWeather];


    return (
        <div 
            className="weather-card"
            style={{ backgroundImage: `url(${currentWeatherBackground})` }}
        >
            <p 
                className="weather-card__temperature">{
                    weatherData ? `${Math.round(weatherData.main.temp)}°F` : 'Loading...'}
            </p>
        </div>
    )
}