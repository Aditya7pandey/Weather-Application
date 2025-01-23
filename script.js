document.getElementById("search-btn").addEventListener("click", fetchWeather);

function fetchWeather() {
  const city = document.getElementById("city-input").value;
  const apiKey = "5de6ecc7c7644b6ba2562756252301"; // Your API key
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  if (!city) {
    displayError("Please enter a city name!");
    return;
  }

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      displayError(error.message);
    });
}

function displayWeather(data) {
  const weatherInfo = document.getElementById("weather-info");
  const errorMessage = document.getElementById("error-message");

  // Extract data from API response
  const cityName = data.location.name;
  const temperature = data.current.temp_c;
  const condition = data.current.condition.text;
  const humidity = data.current.humidity;
  const airQuality = data.current.air_quality["pm2_5"]; // PM2.5 air quality index

  // Update the DOM
  document.getElementById("city-name").textContent = `Weather in ${cityName}`;
  document.getElementById("temperature").textContent = `Temperature: ${temperature}°C`;
  document.getElementById("description").textContent = `Condition: ${condition}`;
  document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
  
  if (airQuality) {
    const airQualityText = `Air Quality (PM2.5): ${airQuality.toFixed(2)}`;
    document.getElementById("description").textContent += ` | ${airQualityText}`;
  }

  weatherInfo.classList.remove("hidden");
  errorMessage.classList.add("hidden");
}

function displayError(message) {
  const weatherInfo = document.getElementById("weather-info");
  const errorMessage = document.getElementById("error-message");

  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
  weatherInfo.classList.add("hidden");
}
