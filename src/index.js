function currentDay() {
  let now = new Date();
  let p = document.querySelector("p");
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
  let minute = now.getMinutes();
  p.innerHTML = `${day} ${hour}:${minute}`;
}
currentDay();

function showWeather(response) {
  let city = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#city");
  let h2 = document.querySelector("#temp");
  h1.innerHTML = `${city}`;
  h2.innerHTML = `${temp}°F`;
}

function citySearch(cityId) {
  let apiKey = "80b63ee33ac52921966d0561121cb9ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityId}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function submitCity(event) {
  event.preventDefault();
  let cityId = document.querySelector("#city-input").value;
  citySearch(cityId);
}

function showPosition(position) {
  let apiKey = "80b63ee33ac52921966d0561121cb9ef";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function currentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", currentCity);

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", submitCity);
