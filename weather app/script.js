const cityInput = document.getElementById('city_input');
const submitButton = document.getElementById('add');
const cityOutput = document.getElementById('city_output');
const temperatureOutput = document.getElementById('city_temp');
const windOutput = document.getElementById('win_val');
const visibilityOutput = document.getElementById('vis_val');
const feelsLikeOutput = document.getElementById('fl_val');
const uvIndexOutput = document.getElementById('uv_val');
const sunriseOutput = document.getElementById('sr_val');
const sunsetOutput = document.getElementById('ss_val');
const pressureOutput = document.getElementById('pre_val');
const humidityOutput = document.getElementById('hum_val');
const weatherimg = document.getElementById('weather_icon');

function weather(event) {
    event.preventDefault();

    submitButton.addEventListener('click', () => {
        const city = cityInput.value;

        if (city.trim() !== '') {
            getWeather(city);
        }
        else {
            clearWeatherData();
            cityOutput.textContent = 'Please enter a city.';
        }
    });
}

function clearWeatherData() {
    cityOutput.textContent = '';
    temperatureOutput.textContent = '';
    windOutput.textContent = '';
    visibilityOutput.textContent = '';
    feelsLikeOutput.textContent = '';
    uvIndexOutput.textContent = '';
    sunriseOutput.textContent = '';
    sunsetOutput.textContent = '';
    pressureOutput.textContent = '';
    humidityOutput.textContent = '';
    weatherimg.src = '';
}

function getWeather(city) {
    const apiKey = '48a924307b7e8b4027fb365fbbeb03df';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                clearWeatherData();
                cityOutput.textContent = 'City not found.';
            }
            else {
                const temperature = data.main.temp;
                const windSpeed = data.wind.speed;
                const visibility = data.visibility;
                const feelsLike = data.main.feels_like;
                const uvIndex = data.uvi;
                const sunriseTimestamp = data.sys.sunrise * 1000;
                const sunsetTimestamp = data.sys.sunset * 1000;
                const pressure = data.main.pressure;
                const humidity = data.main.humidity;
                const weatherCondition = data.weather[0].main;


                cityOutput.textContent = `${city}`;
                temperatureOutput.textContent = `${temperature} °C`;
                windOutput.textContent = `${windSpeed}m/s`;
                visibilityOutput.textContent = `${visibility}m`;
                feelsLikeOutput.textContent = `${feelsLike} °C`;
                uvIndexOutput.textContent = `${uvIndex}`;
                sunriseOutput.textContent = `${new Date(sunriseTimestamp).toLocaleTimeString()}`;
                sunsetOutput.textContent = `${new Date(sunsetTimestamp).toLocaleTimeString()}`;
                pressureOutput.textContent = `${pressure}hPa`;
                humidityOutput.textContent = `${humidity}%`;
                setWeatherConditionImage(weatherCondition);

            }
        })

        .catch(error => {
            console.log('Error:', error);
            clearWeatherData();
            cityOutput.textContent = 'An error occurred. Please try again later.';
        });
}

function setWeatherConditionImage(condition) {
    let weatherimg = '';
    
    switch (condition) {
        case 'Clear':
            weatherimg = 'https://img.icons8.com/?size=2x&id=LCaNITHMJBQL&format=png';
            break;
        case 'Clouds':
            weatherimg = 'https://img.icons8.com/?size=2x&id=650&format=png';
            break;
        case 'Rain':
            weatherimg = 'https://img.icons8.com/?size=2x&id=18563&format=png';
            break;
        case 'Thunderstorm':
            weatherimg = 'https://img.icons8.com/?size=2x&id=41144&format=png';
            break;
        case 'Snow':
            weatherimg = 'https://img.icons8.com/?size=2x&id=664&format=png';
            break;
        case 'Mist':
            weatherimg = 'https://img.icons8.com/?size=2x&id=7358&format=png';
            break;
        case 'Fog':
            weatherimg = 'https://img.icons8.com/?size=2x&id=674&format=png';
            break;
        case 'Haze':
            weatherimg = 'https://img.icons8.com/?size=2x&id=672&format=png';
            break;
            
        default:
            weatherimg = 'https://img.icons8.com/?size=2x&id=648&format=png';
            break;
        }
        
        weather_icon.src = weatherimg;
    }
