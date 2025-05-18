import WeatherCard from './WeatherCard/WeatherCard';
import ItemCard from './ItemCard/ItemCard';
import { defaultClothingItems } from '../../utils/constants';
import './Main.css';
import './ItemCard/ItemCard.css';
import { useState } from 'react';


export default function Main({ weatherData, handleCardClick, clothingItems }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalItem, setModalItem] = useState(null);




    return (
        <main className="main">
            <WeatherCard 
                weatherData={weatherData}
            />
            <h2 className="card-grid__header">Today is {
                weatherData ? `${Math.round(weatherData.main.temp)}°F` : 'Loading...'
            }/ You may want to wear:</h2>
            <div className='card-grid'>
                {clothingItems.map((item) => {
                    return (
                        <ItemCard
                            key={item._id}
                            name={item.name}
                            link={item.link}

                            isOpen={() => {
                                setIsModalOpen(true);
                                handleCardClick(item);
                            }}
                        />
                    )
                })}
            </div>
        </main>
    )
}