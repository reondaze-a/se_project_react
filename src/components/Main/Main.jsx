import WeatherCard from './WeatherCard/WeatherCard';
import ItemCard from './ItemCard/ItemCard';
import ItemModal from '../ItemModal/ItemModal';
import { defaultClothingItems } from '../../utils/constants';
import './Main.css';
import './ItemCard/ItemCard.css';
import { useState, useContext } from 'react';
import { WeatherContext } from '../../utils/WeatherContext';

export default function Main() {
    const weatherData = useContext(WeatherContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalItem, setModalItem] = useState(null);

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

    const filteredClothingItems = defaultClothingItems.filter((item) => {
        return item.weather === weatherCondition();
    });


    return (
        <main className="main">
            <WeatherCard />
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
                                setIsModalOpen(true);
                                setModalItem(item);
                            }}
                        />
                    )
                })}
            </div>
            <ItemModal 
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                name={modalItem ? modalItem.name : 'Loading...'}
                link={modalItem ? modalItem.link : 'Loading...'}
                weather={modalItem ? modalItem.weather : 'Loading...'}
            />
        </main>
    )
}