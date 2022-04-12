function formatDate(timestamp) {
  let now = new Date(timestamp);
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
  return `Last 
  updated ${day}, ${hour}:${min}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastData = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecastData.forEach(function (dailyForecast, index) {
    if (index < 6)
      forecastHTML =
        forecastHTML +
        `
                <div class="col-2">
                  <div class="day">${formatDay(dailyForecast.dt)}</div>
                  <img src="http://openweathermap.org/img/wn/${
                    dailyForecast.weather[0].icon
                  }@2x.png" class="icon" id="icon" alt="_">
                  <div class="temp-forecast">
                    <span class="max-temp-forecast">${Math.round(
                      dailyForecast.temp.max
                    )}°</span>
                    <span class="min-temp-forecast">${Math.round(
                      dailyForecast.temp.min
                    )}°</span>
                  </div>
                </div>
              `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `d573e02a83a53078fa38c4d5f190a26a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayCurrentWeather(response) {
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;

  let roundTemp = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#current-temp");

  celsiusTemperature = roundTemp;
  displayTemp.innerHTML = `${roundTemp}`;

  let dateTime = document.querySelector("#date-time");

  dateTime.innerHTML = formatDate(response.data.dt * 1000);

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

  getForecast(response.data.coord);
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

  search(city.value);
}

function search(city) {
  let units = `metric`;
  let apiKey = `d573e02a83a53078fa38c4d5f190a26a`;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=`;
  let apiUrl = `${apiEndpoint}${city}&units=${units}&appid=${apiKey}`;
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

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

let form = document.querySelector("#search-city");
form.addEventListener("submit", searchCity);

search(`Brisbane`);
