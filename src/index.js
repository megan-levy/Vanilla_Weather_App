function showCelsiusConversion(event){
    event.preventDefault();
    let temp = document.querySelector("#currentTemp");
    let Celsius = ((temp - 32) * 5/9);
    let temperatureElement = document.querySelector("#currentTemp");
    temperatureElement.innerHTML = Math.round(Number(Celsius));
}

function displayCurrentTemperature(response) {
    let currentTemperature = document.querySelector("#currentTemp");
    let windSpeed = document.querySelector("#windSpeed");
    let humidity = document.querySelector("#precipitation");
    let description = document.querySelector("#description");

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

    windSpeed.innerHTML = `${response.data.wind.speed} MPH`;
    humidity.innerHTML = `${response.data.main.humidity}%`;
    currentTemperature.innerHTML = `${Math.round(response.data.main.temp)}`;
    description.innerHTML = `${response.data.weather[0].description}`;

}

function displayLocation(event) {
    event.preventDefault();
    let currentLocation = document.querySelector("#city");
    let formInput = document.querySelector("#inputLocation");
    currentLocation.innerHTML = `${formInput.value}`;
    let apiKey = "4a89eb9a057b7d42b2048718c9361f4a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${formInput.value}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayCurrentTemperature);
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
form.addEventListener("submit", displayLocation);

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", showCelsiusConversion);

