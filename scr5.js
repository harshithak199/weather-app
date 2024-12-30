const apiKey = '9d81d907d15be00b4b5bef86658b5058';

// Function to fetch weather data
async function fetchWeather(city) {
  let url;

  if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  } else {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        await fetchWeatherData(url);
      });
      return;
    } else {
      alert("Geolocation is not supported by this browser.");
      return;
    }
  }

  await fetchWeatherData(url);
}

// Helper function to fetch and display weather data
async function fetchWeatherData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert(error.message);
  }
}

// Display weather data on the page
function displayWeather(data) {
  document.getElementById('location').textContent = `Location: ${data.name}, ${data.sys.country}`;
  document.getElementById('description').textContent = `Condition: ${data.weather[0].description}`;
  document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
  document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

// Event listener for button click
document.querySelector("button").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  fetchWeather(city);
});

// Automatically get weather data based on geolocation
window.onload = () => {
  fetchWeather();
};
