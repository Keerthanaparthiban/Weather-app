const apiKey = 'a55e102beeb2e059a11798410a6ad9d7';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();
  console.log(data);

  if (response.status == 404) {
    document.querySelector('.error').style.display = "block";
    document.querySelector('.weather').style.display = "none";
  } else {
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + " °C";
    document.querySelector('.humidity').innerHTML = data.main.humidity + " %";
    document.querySelector('.wind').innerHTML = data.wind.speed + " kmph";
    document.querySelector('.temp-description').innerHTML = data.weather[0].description;

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = 'assets/clouds.png';
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = 'assets/clear.png';
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = 'assets/snow.png';
    }
    else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = 'assets/drizzle.png';
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = 'assets/mist.png';
    }
    else if (data.weather[0].main == "Haze") {
      weatherIcon.src = 'assets/haze.png';
    }
    else if (data.weather[0].main == "Smoke") {
      weatherIcon.src = 'assets/smoke.png';
    }
    else if (data.weather[0].main == "Thunderstorm") {
      weatherIcon.src = 'assets/thunderstorm.png';
    }
    else if (data.weather[0].main == "Fog") {
      weatherIcon.src = 'assets/fog.png';
    }
    else if (data.weather[0].main == "Dust") {
      weatherIcon.src = 'assets/dust.png';
    }
    else if (data.weather[0].main == "Tornado") {
      weatherIcon.src = 'assets/tornado.png';
    }
    else if (data.weather[0].main == "Rain") {
      weatherIcon.src = 'assets/rain.png';
    }
    else if (data.weather[0].main == "Squall") {
      weatherIcon.src = 'assets/squalls.png';
    }
    else if (data.weather[0].main == "Sand") {
      weatherIcon.src = 'assets/sand.png';
    }

    document.querySelector('.weather').style.display = 'block';
    document.querySelector('.error').style.display = 'none'
  }
}

async function getCurrentCityWeather() {
  try {
    // Get current location coordinates
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Request city name using reverse geocoding API
        const reverseGeocodingUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;
        const reverseGeocodingResponse = await fetch(reverseGeocodingUrl);
        const reverseGeocodingData = await reverseGeocodingResponse.json();

        // Get the city name from the reverse geocoding response
        const cityName = reverseGeocodingData[0]?.name;

        if (cityName) {
          // Display the current city name
          document.querySelector('.city').innerHTML = cityName;

          // Fetch and display the weather for the current city
          checkWeather(cityName);
        }
      });
    }
  } catch (error) {
    console.error('Error occurred while getting current city weather:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Call getCurrentCityWeather to display the weather for the current city when the page loads
  getCurrentCityWeather();
});
// Add event listener to the search box to execute checkWeather when a new city is searched
searchBtn.addEventListener('click', () => {
  checkWeather(searchBox.value);
});
