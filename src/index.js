function currentDay() {
  let now = new Date();
  let dayElement = document.querySelector("#day");
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
  dayElement.innerHTML = `${day} ${hour}:${minute}`;
}
currentDay();

function showWeather(response) {
  let city = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let icon = response.data.weather[0].icon;
  let h1 = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temp");
  let descriptionElement= document.querySelector("#description");
  let humidityElement= document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement =document.querySelector("#icon");

  celsiusTemperature = Math.round(response.data.main.temp);

  h1.innerHTML = `${city}`;
  temperatureElement.innerHTML = `${temp}`;
  descriptionElement.innerHTML = `${description}`;
  humidityElement.innerHTML= `${humidity}`;
  windElement.innerHTML=`${wind}`;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
}

function citySearch(cityId) {
  let apiKey = "80b63ee33ac52921966d0561121cb9ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityId}&appid=${apiKey}&units=metric`;
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function currentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showFahrTemp(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  celLink.classList.remove("active");
  fahrLink.classList.add("active");
  let fahrTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML= Math.round(fahrTemp);
}

function showCelTemp(event){
  event.preventDefault();
  celLink.classList.add("active");
  fahrLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = celsiusTemperature;
}
let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", currentCity);

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", submitCity);

let celsiusTemperature = null;

let fahrLink = document.querySelector("#fahr-link");
fahrLink.addEventListener("click", showFahrTemp);

let celLink = document.querySelector("#cel-link");
celLink.addEventListener("click", showCelTemp);