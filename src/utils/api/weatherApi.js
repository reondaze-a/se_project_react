import { _checkResponse } from "../checkers";

export default function weatherApi(url) {
  function fetchWeatherData() {
    return fetch(`${url}`).then(_checkResponse);
  }

  return { fetchWeatherData };
}
