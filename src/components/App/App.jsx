import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import weatherApi from "../../utils/weatherApi";
import clothingApi from "../../utils/clothingApi";
import auth from "../../utils/auth";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { Routes, Route } from "react-router-dom";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { apiKey, locations, defaultClothingItems } from "../../utils/constants";
import { useAuth } from "../../contexts/AuthContext";
import LoginModal from "../LoginModal/LoginModal";

const home = "/se_project_react";

const lat = locations.Columbus.latitude;
const long = locations.Columbus.longitude;

// API calls with uniform
const weather = weatherApi(
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`
);
const clothes = clothingApi("http://localhost:3001");
const userData = auth("http://localhost:3001");

function App() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [modalRegisterState, setModalRegisterState] = useState(false);
  const [modalLoginState, setModalLoginState] = useState(false);
  const [modalAddItemState, setModalAddItemState] = useState(false);
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

  // Registering function
  const onRegister = (user) => {
    return userData
      .registerUser(user)
      .then(() => {
        console.log("Register successful!");
        setIsLoggedIn(true);
      })
      .catch((err) => {
        throw err; // Throws error for modal to catch
      });
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  // Login function
  const onLogin = (user) => {
    return userData
      .loginUser(user)
      .then(() => {
        console.log("Login successful!");
        setIsLoggedIn(true);
      })
      .catch((err) => {
        throw err; // Throws error for modal to catch
      });
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <Header
        openAddItemModal={() => setModalAddItemState(true)}
        openRegisterModal={() => setModalRegisterState(true)}
        openLoginModal={() => setModalLoginState(true)}
        path={home}
      />

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
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile
                clothingItems={clothingItems}
                handleCardClick={(item) => {
                  setModalItem(item);
                  setModalItemState(true);
                }}
                openModal={() => setModalFormState(true)}
              />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
      {/* <ModalWithForm isOpen={modalFormState} closeModal={() => setModalFormState(false)}/> */}
      <AddItemModal
        isOpen={modalAddItemState}
        onClose={() => setModalAddItemState(false)}
        onAddItem={(item) => {
          clothes
            .addClothingItem(item)
            .then(() => {
              setClothingItems([item, ...clothingItems]);
              setModalAddItemState(false);
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
      <RegisterModal
        isOpen={modalRegisterState}
        onClose={() => setModalRegisterState(false)}
        onRegister={onRegister}
      />
      <LoginModal
        isOpen={modalLoginState}
        onClose={() => setModalLoginState(false)}
        onLogin={onLogin}
      />
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
