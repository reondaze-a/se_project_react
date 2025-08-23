import { _checkResponse } from "./constants";

export default function weatherApi(url) {
    function fetchWeatherData() {
        return fetch(`${url}`).then(_checkResponse)
    }

    return {fetchWeatherData}
}

