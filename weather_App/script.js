const apiKey = "ffe81be3908481d97b9bde5343932fdd"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");
const weatherIcon = document.querySelector(".weather-icon");
const weatherInfo = document.querySelector(".weather-info");
const errorElement = document.querySelector(".error");

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("API Response:", data); // Debug log

        if (data.cod !== 200) {
            throw new Error(data.message || "City not found");
        }

        // Safely access weather data
        const temperature = data.main?.temp ?? "N/A";
        const humidity = data.main?.humidity ?? "N/A";
        const windSpeed = data.wind?.speed ?? "N/A";
        const cityName = data.name ?? "N/A";
        const weatherCondition = data.weather?.[0]?.main ?? "Clear";

        // Update DOM
        document.querySelector(".city").textContent = cityName;
        document.querySelector(".temperature").textContent = temperature !== "N/A" ? `${Math.round(temperature)}°C` : "N/A";
        document.querySelector(".humidity").textContent = humidity !== "N/A" ? `${humidity}%` : "N/A";
        document.querySelector(".wind").textContent = windSpeed !== "N/A" ? `${windSpeed} km/h` : "N/A";
        weatherIcon.innerHTML = getWeatherIcon(weatherCondition);

        weatherInfo.style.display = "block";
        errorElement.style.display = "none";
    } catch (error) {
        errorElement.textContent = error.message || "Failed to fetch weather data";
        errorElement.style.display = "block";
        weatherInfo.style.display = "none";
        console.error("Error:", error);
    }
}

function getWeatherIcon(weatherCondition) {
    const icons = {
        Clouds: '<i class="fas fa-cloud"></i>',
        Clear: '<i class="fas fa-sun"></i>',
        Rain: '<i class="fas fa-cloud-rain"></i>',
        Drizzle: '<i class="fas fa-cloud-drizzle"></i>',
        Mist: '<i class="fas fa-smog"></i>',
        Snow: '<i class="fas fa-snowflake"></i>',
        Thunderstorm: '<i class="fas fa-bolt"></i>',
    };
    return icons[weatherCondition] || '<i class="fas fa-cloud-sun"></i>';
}

// Event listeners
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (!city) {
        errorElement.textContent = "Please enter a city name";
        errorElement.style.display = "block";
        return;
    }
    checkWeather(city);
});

searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = searchBox.value.trim();
        if (!city) {
            errorElement.textContent = "Please enter a city name";
            errorElement.style.display = "block";
            return;
        }
        checkWeather(city);
    }
});

// Initialize with default city
checkWeather("London");