import { useEffect, useState } from 'react'
import './App.css'
import Header from '../Header/Header'
import Main from '../Main/Main'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import Footer from '../Footer/Footer'
import ItemModal from '../ItemModal/ItemModal'
import weatherApi from '../../utils/Api'
import { apiKey, locations, defaultClothingItems } from '../../utils/constants'

const lat = locations.Columbus.latitude;
const long = locations.Columbus.longitude;
const api = weatherApi(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`
  );

function App() {
  const [modalFormState, setModalFormState] = useState(false)
  const [modalItemState, setModalItemState] = useState(false)
  const [weatherData, setWeatherData] = useState(null)
  const [modalItem, setModalItem] = useState(null)

  useEffect(() => {
    api.fetchWeatherData()
      .then(setWeatherData)
      .catch(console.error);
  }, []);

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

  const filteredClothingItems = defaultClothingItems.filter((item) => item.weather === weatherCondition());
  

  return (
    <>
      <Header openModal={() => setModalFormState(true)} />
      <Main 
        weatherData={weatherData}
        clothingItems={filteredClothingItems}
        handleCardClick={(item) => {
          setModalItem(item);
          setModalItemState(true);
        }}
      />
      <Footer />
      <ModalWithForm isOpen={modalFormState} closeModal={() => setModalFormState(false)}/>
      <ItemModal
        isOpen={modalItemState}
        closeModal={() => setModalItemState(false)}
        name={modalItem ? modalItem.name : 'Loading...'}
        link={modalItem ? modalItem.link : 'Loading...'}
        weather={weatherData ? weatherData.weather[0].main : 'Loading...'}
      />
    </>
  )
}

export default App
