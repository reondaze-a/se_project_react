import WeatherCard from './WeatherCard/WeatherCard';
import ItemCard from './ItemCard/ItemCard';
import { defaultClothingItems } from '../../utils/constants';
import './Main.css';
import './ItemCard/ItemCard.css';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import { useState, useContext } from 'react';


export default function Main({ weatherData, handleCardClick, clothingItems }) {

    const tempData = useContext(CurrentTemperatureUnitContext);
    const defaultTemp = weatherData ? Math.round(weatherData.main.temp) : null;
    const weatherCondition = () => {
        if (defaultTemp >= 76) {
          return 'hot';
        } else if (defaultTemp >= 60) {
          return 'warm';
        } else {
          return 'cold';
        }
      }
    
    const temperatureCelsius = defaultTemp ? Math.round((defaultTemp - 32) * 5 / 9) : null;
    
    const currentTemp = tempData.currentTemperatureUnit === 'F' ? `${defaultTemp}°F` : `${temperatureCelsius}°C`;

    const filteredClothingItems = clothingItems.filter((item) => item.weather === weatherCondition());
    
    return (
        <main className="main">
            <WeatherCard 
                weatherData={weatherData}
                currentTemp={currentTemp}
            />
            <h2 className="card-grid__header">Today is {
                weatherData ? currentTemp : 'Loading...'
            }/ You may want to wear:</h2>
            <div className='card-grid'>
                {filteredClothingItems.map((item) => {
                    return (
                        <ItemCard
                            key={item._id}
                            name={item.name}
                            link={item.imageUrl}

                            isOpen={() => {
                                handleCardClick(item);
                            }}
                        />
                    )
                })}
            </div>
        </main>
    )
}