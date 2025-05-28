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
  const [clothingItems, setClothingItems] = useState(defaultClothingItems)
  const [modalItem, setModalItem] = useState(null)
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F')

  useEffect(() => {
    api.fetchWeatherData()
      .then(setWeatherData)
      .catch(console.error);
  }, []);


  return (
    <>
      <Header openModal={() => setModalFormState(true)} />
      <Main 
        weatherData={weatherData}
        clothingItems={clothingItems}
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
        weather={modalItem ? modalItem.weather : 'Loading...'}
      />
    </>
  )
}

export default App
