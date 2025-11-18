// Wetter-API Integration mit localStorage-Caching
const CACHE_KEY = 'weatherData';
const CACHE_TIMESTAMP_KEY = 'weatherDataTimestamp';
const CACHE_DURATION = 30 * 60 * 1000; // 30 Minuten in Millisekunden

function displayWeather(data) {
    const weatherWidget = document.getElementById('weatherWidget');
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    weatherWidget.innerHTML = `
        <div class="weather-content">
            <div class="weather-icon">
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
            </div>
            <div class="weather-info">
                <div class="weather-temp">${temp}°C</div>
                <div class="weather-location">Bern</div>
            </div>
        </div>
    `;
}

function displayError() {
    const weatherWidget = document.getElementById('weatherWidget');
    weatherWidget.innerHTML = `
        <div class="weather-content weather-error">
            <div class="weather-info">
                <div class="weather-temp">--°C</div>
                <div class="weather-location">Bern</div>
            </div>
        </div>
    `;
}

function isCacheValid() {
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    if (!timestamp) return false;

    const age = Date.now() - parseInt(timestamp);
    return age < CACHE_DURATION;
}

function getCachedWeather() {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
}

function setCachedWeather(data) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
}

async function fetchWeatherFromAPI() {
    try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Bern,CH&units=metric&lang=de&appid=aa60dcf25b93205ccfab20ebb7d7ffe2');
        const data = await response.json();

        // Daten im Cache speichern
        setCachedWeather(data);
        displayWeather(data);
    } catch (error) {
        console.error('Fehler beim Laden der Wetterdaten:', error);
        displayError();
    }
}

async function loadWeather() {
    // Prüfen, ob gültige Cache-Daten vorhanden sind
    if (isCacheValid()) {
        const cachedData = getCachedWeather();
        if (cachedData) {
            // Sofort gecachte Daten anzeigen
            displayWeather(cachedData);
            return;
        }
    }

    // Keine gültigen Cache-Daten -> API abrufen
    await fetchWeatherFromAPI();
}

// Wetter beim Laden der Seite abrufen
loadWeather();

// Automatische Aktualisierung nach 30 Minuten
setInterval(() => {
    fetchWeatherFromAPI();
}, CACHE_DURATION);
