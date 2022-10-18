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

let searchCity = document.querySelector("form");
searchCity.addEventListener("submit", newCity);

function displayCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let getCurrentWeather = document.querySelector("#currentlocation");
getCurrentWeather.addEventListener("click", displayCurrentWeather);

function currentWeather(response) {
  let maintemp = document.querySelector("#maintemp");
  maintemp.innerHTML = `${Math.round(response.data.main.temp)}`;
  let maincity = document.querySelector("#maincity");
  maincity.innerHTML = response.data.name;
}

function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `5f472b7acba333cd8a035ea85a0d4d4c`;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(weatherUrl).then(currentWeather);
}
