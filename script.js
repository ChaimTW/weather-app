let temperature = document.getElementById('temperature');
let description = document.getElementById('description');
let input = document.getElementById('input');
let locationPlaceHolder = document.getElementById('location');
let image = document.getElementById('image-container');
let form = document.getElementById('city-picker');
let forecastDayOne = document.getElementById('forecast-day-one');
let forecastDayTwo = document.getElementById('forecast-day-two');
let forecastDayThree = document.getElementById('forecast-day-three');
let forecastDayFour = document.getElementById('forecast-day-four');
let forecastOne = document.getElementById('forecast-1');
let forecastTwo = document.getElementById('forecast-2');
let forecastThree = document.getElementById('forecast-3');
let forecastFour = document.getElementById('forecast-4');
const button = document.getElementById('submit');

function kelvinToCelsius(kelvin){
    return kelvin - 273;
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const today = new Date()
let dayPlusOne = new Date(today)
let dayPlusTwo = new Date(today)
let dayPlusThree = new Date(today)
let dayPlusFour = new Date(today)
dayPlusOne.setDate(dayPlusOne.getDate() + 1)
dayPlusTwo.setDate(dayPlusTwo.getDate() + 2)
dayPlusThree.setDate(dayPlusThree.getDate() + 3)
dayPlusFour.setDate(dayPlusFour.getDate() + 4)

console.log(days[dayPlusFour.getDay()].substring(0,3))

forecastDayOne.textContent = days[dayPlusOne.getDay()].substring(0,3)
forecastDayTwo.textContent = days[dayPlusTwo.getDay()].substring(0,3)
forecastDayThree.textContent = days[dayPlusThree.getDay()].substring(0,3)
forecastDayFour.textContent = days[dayPlusFour.getDay()].substring(0,3)

function getWeather(location){
    let lon;
    let lat;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=bccd70430a08b833f23abf307f5ca9d9`)
        .then(response => response.json())
        .then(data => {
            temperature.textContent = Math.floor(kelvinToCelsius(data.main.temp));
            description.textContent = data.weather[0].description;
            locationPlaceHolder.textContent = data.name + ', ' + data.sys.country;
            image.innerHTML = `<img src="./icons/${data.weather[0].icon}.png" alt="unknown" id="icon"></img>`
            lon = data.coord.lon;
            lat = data.coord.lat;
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=bccd70430a08b833f23abf307f5ca9d9`)
                .then(response => response.json())
                .then(data => {
                    forecastOne.src = `./icons/${data.daily[0].weather[0].icon}.png`
                    forecastTwo.src = `./icons/${data.daily[1].weather[0].icon}.png`
                    forecastThree.src = `./icons/${data.daily[2].weather[0].icon}.png`
                    forecastFour.src = `./icons/${data.daily[3].weather[0].icon}.png`
                })
        });
}

button.onclick = function(){
    getWeather(input.value);
}

input.addEventListener("keyup", function(e){
    if(e.key === 'Enter'){
        getWeather(input.value);
    }
})