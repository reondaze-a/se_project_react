import WeatherCard from './WeatherCard/WeatherCard';
import ItemCard from './ItemCard/ItemCard';
import { defaultClothingItems } from '../../utils/constants';
import './Main.css';
import { useContext } from 'react';
import { WeatherContext } from '../../utils/WeatherContext';

export default function Main() {
    const weatherData = useContext(WeatherContext);

    const currentTemp = weatherData ? Math.round(weatherData.main.temp) : null;

    return (
        <main className="main">
            <WeatherCard />
            <h2 className="card-grid__header">Today is {
                weatherData ? `${Math.round(weatherData.main.temp)}°F` : 'Loading...'
            }/ You may want to wear:</h2>
            <div className='card-grid'>
                {defaultClothingItems.map((item) => {
                    return (
                        <ItemCard
                            key={item._id}
                            name={item.name}
                            link={item.link}
                        />
                    )
                })}
            </div>
        </main>
    )
}