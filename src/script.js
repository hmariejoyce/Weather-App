let now = new Date();

let h4 = document.querySelector("#currenttime");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let minutes = String(now.getMinutes()).padStart(2, "0");
let hours = now.getHours() % 12 || 12;
let ampm = now.getHours() >= 12 ? "PM" : "AM";

h4.innerHTML = `${day}, ${month} ${date} ${hours}:${minutes} ${ampm}`;

function displayForecast() {
  console.log(response.data.daily);
  let forecastElement = document.querySelector(".fivedays");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2"> ${day}
      <br />
      <span
      ><img
         src="https://openweathermap.org/img/wn/01d@2x.png"
         alt="sunny"
      /></span>
      <br />
      <div class="temp">83°F</div>
      </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  apiKey = `2980ff43226d67e53abfcdb6d457dcc8`;
  apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function newCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchcity-text-input");
  let maincity = document.querySelector("#maincity");
  maincity.innerHTML = `${searchInput.value}`;
  search(searchInput.value);
}

function search(city) {
  let apiKey = `5f472b7acba333cd8a035ea85a0d4d4c`;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(weatherUrl).then(currentWeather);
}

function displayCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let getCurrentWeather = document.querySelector("#currentlocation");
getCurrentWeather.addEventListener("click", displayCurrentWeather);

function currentWeather(response) {
  let maintemp = document.querySelector("#maintemp");
  let maincity = document.querySelector("#maincity");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#mainicon");

  fahrenheitTemperature = response.data.main.temp;

  maintemp.innerHTML = Math.round(fahrenheitTemperature);
  maincity.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `5f472b7acba333cd8a035ea85a0d4d4c`;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(weatherUrl).then(currentWeather);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let maintemp = document.querySelector("#maintemp");
  let celsiusTemperature = (fahrenheitTemperature - 32) * (5 / 9);
  maintemp.innerHTML = Math.round(celsiusTemperature);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let maintemp = document.querySelector("#maintemp");
  maintemp.innerHTML = Math.round(fahrenheitTemperature);
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

let fahrenheitTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let searchCity = document.querySelector("form");
searchCity.addEventListener("submit", newCity);

search("Virginia Beach");
