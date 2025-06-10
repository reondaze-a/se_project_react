export default function weatherApi(url) {

    function _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }

    function fetchWeatherData() {
        return fetch(`${url}`).then(_checkResponse)
    }

    return {fetchWeatherData, _checkResponse}
}

