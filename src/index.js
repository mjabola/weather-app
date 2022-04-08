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
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;

  let roundTemp = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#current-temp");

  celsiusTemperature = roundTemp;
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

  let displayIcon = document.querySelector("#icon");

  displayIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  displayIcon.setAttribute("alt", `description`);
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

function switchFarenheit(event) {
  event.preventDefault();

  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let currentTemperature = document.querySelector("#current-temp");

  celsius.classList.remove("active");
  farenheit.classList.add("active");
  currentTemperature.innerHTML = Math.round(farenheitTemperature);
}

function switchCelsius(event) {
  event.preventDefault();

  let currentTemperature = document.querySelector("#current-temp");

  currentTemperature.innerHTML = celsiusTemperature;
  celsius.classList.add("active");
  farenheit.classList.remove("active");
}

let celsiusTemperature = null;

let farenheit = document.querySelector("#farenheit-link");
farenheit.addEventListener("click", switchFarenheit);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", switchCelsius);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

let goButton = document.querySelector("#search-city");
goButton.addEventListener("submit", searchCity);
