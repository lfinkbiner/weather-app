function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours =`0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
   let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  return days[day];
}

function displayForecast(response){
  let forecast = (response.data.daily);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index){
    if (index < 6){ forecastHTML = forecastHTML + `
                <div class="col-2">
                    <div class="weather-forecast-date">${formatDay(forecastDay.dt)}
                    </div>
                    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42" />
                    <div class="weather-forecast-temperatures">
                        <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}
                        °</span>
                        <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}
                        °</span>
                    </div>
                </div>`;
  }
});
  forecastHTML = forecastHTML + `</div>`
  forecastElement.innerHTML=forecastHTML;
}

function getForecast(coordinates){
  let apiKey ="80b63ee33ac52921966d0561121cb9ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function showWeather(response) {
  let city = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let date = formatDate(response.data.dt * 1000);
  let icon = response.data.weather[0].icon;

  let temperatureElement = document.querySelector("#temp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let dateElement = document.querySelector("#date");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = Math.round(response.data.main.temp);

  cityElement.innerHTML = `${city}`;
  temperatureElement.innerHTML = `${temp}`;
  descriptionElement.innerHTML = `${description}`;
  humidityElement.innerHTML = `${humidity}`;
  dateElement.innerHTML =`${date}`;
  windElement.innerHTML = `${wind}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}



function citySearch(city) {
  let apiKey = "80b63ee33ac52921966d0561121cb9ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function submitCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  citySearch(cityInputElement.value);
}

function showFahrTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  celLink.classList.remove("active");
  fahrLink.classList.add("active");
  let fahrTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrTemp);
}

function showCelTemp(event) {
  event.preventDefault();
  celLink.classList.add("active");
  fahrLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = celsiusTemperature;
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", submitCity);

let fahrLink = document.querySelector("#fahr-link");
fahrLink.addEventListener("click", showFahrTemp);

let celLink = document.querySelector("#cel-link");
celLink.addEventListener("click", showCelTemp);

function showPosition(position) {
  let apiKey = "80b63ee33ac52921966d0561121cb9ef";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function currentCity() {;
  navigator.geolocation.getCurrentPosition(showPosition);
}

currentCity();
displayForecast();

