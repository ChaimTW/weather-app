let temperature = document.getElementById('temperature');
let description = document.getElementById('description');
let input = document.getElementById('input');
let locationPlaceHolder = document.getElementById('location');
let image = document.getElementById('image-container');
let form = document.getElementById('city-picker');
const button = document.getElementById('submit');

function kelvinToCelsius(kelvin){
    return kelvin - 273;
}

function getWeather(location){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=bccd70430a08b833f23abf307f5ca9d9`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            temperature.textContent = Math.floor(kelvinToCelsius(data.main.temp));
            description.textContent = data.weather[0].description;
            locationPlaceHolder.textContent = data.name + ', ' + data.sys.country;
            image.innerHTML = `<img src="./icons/${data.weather[0].icon}.png" alt="unknown" id="icon"></img>`
        });
}

button.onclick = function(){
    getWeather(input.value);
}
