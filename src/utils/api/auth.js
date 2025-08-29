import { _checkResponse, catchError } from "../checkers";

export default function auth(url) {
  function registerUser({ name, avatar, email, password }) {
    return fetch(`${url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, avatar, email, password }),
    })
      .then(_checkResponse)
      .catch(catchError);
  }

  function loginUser({ email, password }) {
    return fetch(`${url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(_checkResponse)
      .catch(catchError);
  }

  function getUserData(token) {
    return fetch(`${url}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(_checkResponse)
      .catch(catchError);
  }

  function updateUserData(token, { name, avatar }) {
    return fetch(`${url}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, avatar }),
    })
      .then(_checkResponse)
      .catch(catchError);
  }

  return { registerUser, loginUser, getUserData, updateUserData };
}
