import { _checkResponse, catchError } from "./constants";

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

  return { registerUser, loginUser };
}
