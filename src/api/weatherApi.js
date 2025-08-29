import { _checkResponse } from "../utils/checkers";

export default function weatherApi(url) {
    function fetchWeatherData() {
        return fetch(`${url}`).then(_checkResponse)
    }

    return {fetchWeatherData}
}

