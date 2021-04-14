
function displayForecast() {
    let forecastElement = document.querySelector("#forecast");
    
    let forecastHTML = `<div class = "row">`;
    let days = ["Thu", "Fri", "Sat", "Sun", "Mon" ];
    days.forEach(function(days) {
            forecastHTML = forecastHTML +
            `<div class = "col-2">
                <div class = "forecastDay">${days}</div>
                <img src = "" alt = "" width = "42"/>
            <div class = "forecastTemps">
                <span class = "forecastHigh">65</span>
                <span class = "forecastLow">45</span>
                </div>
            </div>`;
    });
    forecastHTML = forecastHTML + `</div`;
    forecastElement.innerHTML = forecastHTML; 
}

function displayCurrentTemperature(response) {
    let currentTemperature = document.querySelector("#currentTemp");
    let windSpeed = document.querySelector("#windSpeed");
    let humidity = document.querySelector("#precipitation");
    let description = document.querySelector("#description");
    let currentLocation = document.querySelector("#city");

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

    currentLocation.innerHTML = `${response.data.name}`;
    windSpeed.innerHTML = `${response.data.wind.speed} MPH`;
    humidity.innerHTML = `${response.data.main.humidity}%`;
    currentTemperature.innerHTML = `${Math.round(response.data.main.temp)}`;
    description.innerHTML = `${response.data.weather[0].description}`;
    displayForecast();

}
function search(city) {
    let apiKey = "4a89eb9a057b7d42b2048718c9361f4a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayCurrentTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let formInput = document.querySelector("#inputLocation");
    search(formInput.value);
}

let now = new Date();
let hour = now.getHours();
let minute = now.getMinutes();
let days = [
"Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday"
];
let day = days[now.getDay()];
if (minute < 10) {
    minute = `0${minute}`;
} 


let dateTime = document.querySelector("#dateTime");
dateTime.innerHTML = `Last updated on ${day} at ${hour}:${minute}`;

let form = document.querySelector("#searchEngine");
form.addEventListener("submit", handleSubmit);

function showCelsiusConversion(event){
    event.preventDefault();
    let id = document.querySelector("#celsius");
    let temperatureElement = document.querySelector("#currentTemp");
    let Celsius = (parseFloat( temperatureElement.innerText) - 32) * 5/9;
    temperatureElement.innerText = Math.round(Celsius);
}
function showFarenheitConversion(event){
    event.preventDefault();
    id = document.querySelector("#farenheit");
    let temperatureElement = document.querySelector("#currentTemp");
    let Farenheit = (parseFloat(temperatureElement.innerText)* 9/5) + 32;
    temperatureElement.innerText = Math.round(Farenheit);
}

let farenheitLink = document.querySelector("#celsius");
farenheitLink.addEventListener("click", showCelsiusConversion);

let celsiuslink = document.querySelector("#farenheit");
celsiuslink.addEventListener("click", showFarenheitConversion);

search("Cincinnati");
displayForecast();