
document.getElementById('fetchWeatherBtn').addEventListener('click', fetchWeather);

function fetchWeather() {
    const location = document.getElementById('locationInput').value;
    if (!location) {
        alert('Please enter a location');
        return;
    }
    
    const apiKey = '9ef7f93be156ab5bbca80ae99bb13a52'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching the weather data:', error));
}

function displayWeather(data) {
    if (data.cod !== 200) {
        alert('Location not found');
        return;
    }

    const weatherIcons = {
        'Clear': 'fas fa-sun',
        'Clouds': 'fas fa-cloud',
        'Rain': 'fas fa-cloud-showers-heavy',
        'Drizzle': 'fas fa-cloud-rain',
        'Thunderstorm': 'fas fa-poo-storm',
        'Snow': 'fas fa-snowflake',
        'Mist': 'fas fa-smog',
        'Smoke': 'fas fa-smog',
        'Haze': 'fas fa-smog',
        'Dust': 'fas fa-smog',
        'Fog': 'fas fa-smog',
        'Sand': 'fas fa-smog',
        'Ash': 'fas fa-smog',
        'Squall': 'fas fa-wind',
        'Tornado': 'fas fa-wind'
    };

    const weather = data.weather[0].main;
    const iconClass = weatherIcons[weather] || 'fas fa-question';

    const weatherDataDiv = document.getElementById('weatherData');
    weatherDataDiv.innerHTML = `
        <div><i class="${iconClass} icon"></i><strong>Location:</strong> ${data.name}, ${data.sys.country}</div>
        <div><i class="fas fa-thermometer-half icon"></i><strong>Temperature:</strong> ${data.main.temp} °C</div>
        <div><i class="fas fa-cloud icon"></i><strong>Weather:</strong> ${data.weather[0].description}</div>
        <div><i class="fas fa-tint icon"></i><strong>Humidity:</strong> ${data.main.humidity} %</div>
        <div><i class="fas fa-wind icon"></i><strong>Wind Speed:</strong> ${data.wind.speed} m/s</div>
    `;
}
