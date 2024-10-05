const apiKey = '5f8bb3c4ea287ee704488a101d27f468'; // Replace with your OpenWeatherMap API key
const locationDisplay = document.getElementById('location-display');
const weatherCondition = document.getElementById('weather-condition');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather-btn');

// Get Weather Data
function getWeatherData(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

// Display Weather Data
function displayWeatherData(data) {
    locationDisplay.textContent = `Location: ${data.name}, ${data.sys.country}`;
    weatherCondition.textContent = `Condition: ${data.weather[0].description}`;
    temperature.textContent = `Temperature: ${data.main.temp} °C`;
    humidity.textContent = `Humidity: ${data.main.humidity} %`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

// Get weather based on city name
getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                displayWeatherData(data);
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }
});

// Get user location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            getWeatherData(latitude, longitude);
        }, error => {
            locationDisplay.textContent = 'Unable to fetch your location. Please enter a city.';
            console.error('Geolocation error:', error);
        });
    } else {
        locationDisplay.textContent = 'Geolocation is not supported by this browser.';
    }
}

// Fetch weather on page load using user's location
getLocation();
