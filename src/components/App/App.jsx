import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import weatherApi from "../../utils/weatherApi";
import clothingApi from "../../utils/clothingApi";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
import { Routes, Route } from "react-router-dom";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { apiKey, locations, defaultClothingItems } from "../../utils/constants";

const home = "/se_project_react";

const lat = locations.Columbus.latitude;
const long = locations.Columbus.longitude;
const weather = weatherApi(
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`
);

const clothes = clothingApi("http://localhost:3001");

function App() {
  const [modalFormState, setModalFormState] = useState(false);
  const [modalItemState, setModalItemState] = useState(false);
  const [modalDeleteItemState, setModalDeleteItemState] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [modalItem, setModalItem] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  useEffect(() => {
    weather.fetchWeatherData().then(setWeatherData).catch(console.error);
  }, []);

  useEffect(() => {
    clothes
      .fetchClothingItems()
      .then((data) => {
        setClothingItems(data.sort((a, b) => b.createdAt - a.createdAt));
      })
      .catch(console.error);
  }, []);

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  return (
    <>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header openModal={() => setModalFormState(true)} path={home} />

        <Routes>
          <Route
            path={"/"}
            element={
              <Main
                weatherData={weatherData}
                clothingItems={clothingItems}
                handleCardClick={(item) => {
                  setModalItem(item);
                  setModalItemState(true);
                }}
              />
            }
          />
          <Route
            path={"/profile"}
            element={
              <Profile
                clothingItems={clothingItems}
                handleCardClick={(item) => {
                  setModalItem(item);
                  setModalItemState(true);
                }}
                openModal={() => setModalFormState(true)}
              />
            }
          />
        </Routes>

        <Footer />
        {/* <ModalWithForm isOpen={modalFormState} closeModal={() => setModalFormState(false)}/> */}
        <AddItemModal
          isOpen={modalFormState}
          onClose={() => setModalFormState(false)}
          onAddItem={(item) => {
            clothes
              .addClothingItem(item)
              .then(() => {
                setClothingItems([item, ...clothingItems]);
                setModalFormState(false);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        />
        <ItemModal
          isOpen={modalItemState}
          closeModal={() => setModalItemState(false)}
          name={modalItem ? modalItem.name : "Loading..."}
          link={modalItem ? modalItem.imageUrl : "Loading..."}
          weather={modalItem ? modalItem.weather : "Loading..."}
          openDeleteModal={() => {
            setModalDeleteItemState(true);
          }}
        />
        <DeleteItemModal
          isOpen={modalDeleteItemState}
          closeModal={() => setModalDeleteItemState(false)}
          item={modalItem}
          onDelete={() => {
            clothes
              .deleteClothingItem(modalItem._id)
              .then(() => {
                setClothingItems(
                  clothingItems.filter((item) => item._id !== modalItem._id)
                );
                setModalDeleteItemState(false);
                setModalItemState(false);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        />
      </CurrentTemperatureUnitContext.Provider>
    </>
  );
}

export default App;
