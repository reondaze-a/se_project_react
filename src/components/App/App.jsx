import { useEffect, useState } from "react";
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
import ChangeProfileModal from "../ChangeProfileModal/ChangeProfile";
import { Routes, Route } from "react-router-dom";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { apiKey, locations } from "../../utils/constants";
import { useAuth } from "../../contexts/AuthContext";
import LoginModal from "../LoginModal/LoginModal";
import LogoutModal from "../LogoutModal/LogoutModal";

const lat = locations.Columbus.latitude;
const long = locations.Columbus.longitude;

const dbUrl = "http://localhost:3001"; // Local backend (or codesandbox url)

// API calls with uniform
const weather = weatherApi(
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`
);
const clothes = clothingApi(dbUrl);
const userData = auth(dbUrl);

function App() {
  const { setIsLoggedIn, setCurrentUser, setLoading } = useAuth();

  const [modalRegisterState, setModalRegisterState] = useState(false);
  const [modalLoginState, setModalLoginState] = useState(false);
  const [modalLogoutState, setModalLogoutState] = useState(false);
  const [modalAddItemState, setModalAddItemState] = useState(false);
  const [modalItemState, setModalItemState] = useState(false);
  const [modalDeleteItemState, setModalDeleteItemState] = useState(false);
  const [modalChangeProfileState, setModalChangeProfileState] = useState(false);
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
      .then(({ data }) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  // Registering function
  const onRegister = (user) => {
    return userData
      .registerUser(user)
      .then(({ data }) => {
        console.log("Register successful!");
        setIsLoggedIn(true);
        setCurrentUser(data);
      })
      .catch((err) => {
        throw err; // Throws error for modal to catch
      });
  };

  // Login function
  const onLogin = (user) => {
    return userData
      .loginUser(user)
      .then(({ token }) => {
        console.log("Login successful!");
        localStorage.setItem("jwt", token);
        return userData.getUserData(token);
      })
      .then(({ data }) => {
        setIsLoggedIn(true);
        setCurrentUser(data);
      })
      .catch((err) => {
        throw err; // Throws error for modal to catch
      });
  };

  const onSwitch = () => {
    setModalLoginState(!modalLoginState);
    setModalRegisterState(!modalRegisterState);
  };

  // Retain login state on refresh
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      setCurrentUser(null);
      setLoading(false); // Ensure loading is set to false if no JWT
      return;
    }

    userData
      .getUserData(jwt)
      .then(({ data }) => {
        setIsLoggedIn(true);
        setCurrentUser(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false)); // Ensure loading is set to false after the check
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <Header
        openAddItemModal={() => setModalAddItemState(true)}
        openRegisterModal={() => setModalRegisterState(true)}
        openLoginModal={() => setModalLoginState(true)}
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
            <ProtectedRoute>
              <Profile
                clothingItems={clothingItems}
                handleCardClick={(item) => {
                  setModalItem(item);
                  setModalItemState(true);
                }}
                openModal={() => setModalAddItemState(true)}
                updateProfile={() => setModalChangeProfileState(true)}
                logOutModal={() => setModalLogoutState(true)}
              />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />

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
        owner={modalItem ? modalItem.owner : null}
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
        onSwitch={onSwitch}
      />
      <LoginModal
        isOpen={modalLoginState}
        onClose={() => setModalLoginState(false)}
        onLogin={onLogin}
        onSwitch={onSwitch}
      />
      <LogoutModal
        isOpen={modalLogoutState}
        closeModal={() => setModalLogoutState(false)}
      />
      <ChangeProfileModal
        isOpen={modalChangeProfileState}
        onClose={() => setModalChangeProfileState(false)}
        onChangeProfile={(data) => {
          const token = localStorage.getItem("jwt");
          return userData
            .updateUserData(token, data)
            .then(({ data }) => {
              setCurrentUser(data);
            })
            .catch((err) => {
              throw err; // Throws error for modal to catch
            });
        }}
      />
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
