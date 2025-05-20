import WeatherCard from './WeatherCard/WeatherCard';
import ItemCard from './ItemCard/ItemCard';
import { defaultClothingItems } from '../../utils/constants';
import './Main.css';
import './ItemCard/ItemCard.css';
import { useState } from 'react';


export default function Main({ weatherData, handleCardClick, clothingItems }) {
    
    const currentTemp = weatherData ? Math.round(weatherData.main.temp) : null;
    const weatherCondition = () => {
        if (currentTemp >= 76) {
          return 'hot';
        } else if (currentTemp >= 60) {
          return 'warm';
        } else {
          return 'cold';
        }
      }

    const filteredClothingItems = clothingItems.filter((item) => item.weather === weatherCondition());
    

    return (
        <main className="main">
            <WeatherCard 
                weatherData={weatherData}
            />
            <h2 className="card-grid__header">Today is {
                weatherData ? `${Math.round(weatherData.main.temp)}°F` : 'Loading...'
            }/ You may want to wear:</h2>
            <div className='card-grid'>
                {filteredClothingItems.map((item) => {
                    return (
                        <ItemCard
                            key={item._id}
                            name={item.name}
                            link={item.link}

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