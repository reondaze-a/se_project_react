import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { locations, dbUrl, weatherURL } from "../../utils/constants";
import { useAuth } from "../../contexts/CurrentUserContext"
import auth from "../../utils/api/auth";

import "./App.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import weatherApi from "../../utils/api/weatherApi";
import clothingApi from "../../utils/api/clothingApi";

// Modal imports
import ItemModal from "../ModalWithForm/ItemModal/ItemModal";
import AddItemModal from "../ModalWithForm/AddItemModal/AddItemModal";
import DeleteItemModal from "../ModalWithForm/DeleteItemModal/DeleteItemModal";
import RegisterModal from "../ModalWithForm/RegisterModal/RegisterModal";
import ChangeProfileModal from "../ModalWithForm/ChangeProfileModal/ChangeProfile";
import LoginModal from "../ModalWithForm/LoginModal/LoginModal";
import LogoutModal from "../ModalWithForm/LogoutModal/LogoutModal";

const lat = locations.Columbus.latitude;
const long = locations.Columbus.longitude;

// API calls const
const weather = weatherApi(weatherURL(lat, long));
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

  // Fetch weather data on component mount
  useEffect(() => {
    weather.fetchWeatherData().then(setWeatherData).catch(console.error);
  }, []);

  // Fetch clothing items on component mount
  useEffect(() => {
    clothes
      .fetchClothingItems()
      .then(({ data }) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  // Toggle switch handler
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

  // Toggles between sign up and login
  const onSwitch = () => {
    setModalLoginState(!modalLoginState);
    setModalRegisterState(!modalRegisterState);
  };

  // Toggling like function
  const toggleLike = (id, isLiked) => {
    const apiCall = isLiked ? clothes.dislike : clothes.like;

    return apiCall(id)
      .then(({ data: updatedItem }) => {
        setClothingItems((currentItems) =>
          currentItems.map((currentItem) =>
            currentItem._id === updatedItem._id ? updatedItem : currentItem
          )
        );
        return updatedItem; // passes updated item to chain the promise
      })
      .catch((err) => {
        throw err;
      }); // throws error for the chain to catch
  };

  // check token validity and retain login state on page refresh
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
        locationName={weatherData ? weatherData.name : "Loading..."}
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
              toggleLike={toggleLike}
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
                toggleLike={toggleLike}
              />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div>404 not found</div>} />
      </Routes>

      <Footer />

      <AddItemModal
        isOpen={modalAddItemState}
        onClose={() => setModalAddItemState(false)}
        onAddItem={(item) => {
          clothes
            .addClothingItem(item)
            .then(({ data: addedItem }) => {
              setClothingItems([addedItem, ...clothingItems]);
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
