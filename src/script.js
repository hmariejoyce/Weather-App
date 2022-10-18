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
