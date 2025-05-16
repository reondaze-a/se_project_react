import { useState } from 'react'
import './App.css'
import Header from '../Header/Header'
import Main from '../Main/Main'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import Footer from '../Footer/Footer'

import { WeatherProvider } from '../../utils/WeatherContext'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Header openModal={() => setIsModalOpen(true)} />
      <WeatherProvider>
        <Main />
      </WeatherProvider>
      <Footer />
      <ModalWithForm isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}/>
    </>
  )
}

export default App
