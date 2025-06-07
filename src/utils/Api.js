export default function weatherApi(url) {

    function checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }

    function fetchWeatherData() {
        return fetch(`${url}`).then(checkResponse)
    }

    return {fetchWeatherData}
}

