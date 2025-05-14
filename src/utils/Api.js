export default class weatherApi {
    constructor(url) {
        this.baseUrl = url; 
    }

     _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }

    fetchWeatherData() {
        return fetch(`${this.baseUrl}`).then(this._checkResponse)
    }
}