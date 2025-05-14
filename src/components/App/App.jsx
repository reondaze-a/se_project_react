import { useState } from 'react'
import './App.css'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import { WeatherProvider } from '../../utils/WeatherContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <WeatherProvider>
        <Main />
      </WeatherProvider>
      <Footer />
    </>
  )
}

export default App
