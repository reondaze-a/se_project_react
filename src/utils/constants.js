const apiKey = '2bac2b36ac8b9909f37bd9018804f657';

const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  }
]

const locations = {
  "Columbus": {
    latitude: 39.983334,
    longitude: -82.983330,
  },
  "New York": {
    latitude: 40.712776,
    longitude: -74.005974,
  },
  "Los Angeles": {
    latitude: 34.052235,
    longitude: -118.243683,
  },
  "Chicago": {
    latitude: 41.878113,
    longitude: -87.629799,
  },
};

const weatherBackgrounds = {
  "day": {
    "Fog": new URL('../assets/weather-backgrounds/day-fog.png', import.meta.url).href,
    "Clear": new URL('../assets/weather-backgrounds/day-clear.png', import.meta.url).href,
    "Clouds": new URL('../assets/weather-backgrounds/day-cloudy.png', import.meta.url).href,
    "Rain": new URL('../assets/weather-backgrounds/day-rain.png', import.meta.url).href,
    "Snow": new URL('../assets/weather-backgrounds/day-snow.png', import.meta.url).href,
    "Thunderstorm": new URL('../assets/weather-backgrounds/day-storm.png', import.meta.url).href,
    "Mist": new URL('../assets/weather-backgrounds/day-fog.png', import.meta.url).href,
  },
  "night": {
    "Fog": new URL('../assets/weather-backgrounds/night-fog.png', import.meta.url).href,
    "Clear": new URL('../assets/weather-backgrounds/night-clear.png', import.meta.url).href,
    "Clouds": new URL('../assets/weather-backgrounds/night-cloudy.png', import.meta.url).href,
    "Rain": new URL('../assets/weather-backgrounds/night-rain.png', import.meta.url).href,
    "Snow": new URL('../assets/weather-backgrounds/night-snow.png', import.meta.url).href,
    "Thunderstorm": new URL('../assets/weather-backgrounds/night-storm.png', import.meta.url).href,
    "Mist": new URL('../assets/weather-backgrounds/night-fog.png', import.meta.url).href,
  },
};

export { apiKey, defaultClothingItems, locations, weatherBackgrounds };