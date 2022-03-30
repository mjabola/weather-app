let now = new Date();

let dateTime = document.querySelector("#datetime");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let min = now.getMinutes();
if (min < 10) {
  min = `0${min}`;
}

dateTime.innerHTML = `${day}, ${hour}:${min}`;

function displayCurrentWeather(response) {
  let cityName = document.querySelector("h3");
  cityName.innerHTML = response.data.name;

  let roundTemp = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#current-temp");

  displayTemp.innerHTML = `${roundTemp}`;

  let humidity = response.data.main.humidity;
  let displayHumidity = document.querySelector("#humidity");

  displayHumidity.innerHTML = `${humidity}%`;

  let wind = response.data.wind.speed;
  let displayWind = document.querySelector("#wind");

  displayWind.innerHTML = `${wind} km/h`;

  let description = response.data.weather[0].main;
  let displayDescription = document.querySelector("#weather-info");

  displayDescription.innerHTML = `${description}`;
}

function searchCurrentLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = `d573e02a83a53078fa38c4d5f190a26a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#new-city");
  let units = `metric`;
  let apiKey = `d573e02a83a53078fa38c4d5f190a26a`;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=`;
  let apiUrl = `${apiEndpoint}${city.value}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function switchCelcius(event) {
  event.preventDefault();

  let c = document.querySelector("#current-temp");
  c.innerHTML = `17`;
}

function switchFarenheit(event) {
  event.preventDefault();

  let f = document.querySelector("#current-temp");
  f.innerHTML = `63`;
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

let goButton = document.querySelector("#search-city");
goButton.addEventListener("submit", searchCity);
