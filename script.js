document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "aa99306b2d17a9259193a07393be1218"; 
    const gifApiKey = "mjfAEKD9PZf9hOuBX0gJ7BS9Z6IhtUuC"; 
    const giphyContainer = document.querySelector('.gif_weather');

    function fetchWeather(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === "404") {
                    throw new Error("City not found");
                }

                const weatherCondition = data.weather[0].description;
                const temperature = data.main.temp;
                const feelsLike = data.main.feels_like;
                const humidity = data.main.humidity;
                const rain = data.rain ? data.rain["1h"] : 0;
                const windSpeed = data.wind.speed;
                const cityName = data.name;
                const countryName = data.sys.country;

                document.querySelector('.location').textContent = `${cityName}, ${countryName}`;
                document.querySelector('.weather-condition').textContent = weatherCondition.charAt(0).toUpperCase() + weatherCondition.slice(1);
                document.querySelector('.main-temp').textContent = `${temperature.toFixed(1)}°C`;
                document.querySelector('.feels-like .extra-info').textContent = `${feelsLike.toFixed(1)}°C`;
                document.querySelector('.humidity .extra-info').textContent = `${humidity}%`;
                document.querySelector('.rain .extra-info').textContent = `${rain.toFixed(1)} mm`;
                document.querySelector('.wind-speed .extra-info').textContent = `${windSpeed.toFixed(1)} km/hr`;

                const weatherIcon = document.querySelector('.weather-icon');
                const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
                weatherIcon.src = iconUrl;
                weatherIcon.alt = weatherCondition;

                searchGiphy(weatherCondition);
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
            });
    }

    function searchGiphy(query) {
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${gifApiKey}&q=${query} weather&limit=1`)
            .then(response => response.json())
            .then(data => {
                giphyContainer.innerHTML = '';
                if (data.data.length > 0) {
                    const gif = data.data[0];
                    const img = document.createElement('img');
                    img.src = gif.images.original.url;
                    giphyContainer.appendChild(img);
                }
            })
            .catch(error => {
                console.error("Error fetching GIFs:", error);
            });
    }

    const city = "Mumbai";
    fetchWeather(city);

    document.querySelector('.search-icon').addEventListener('click', () => {
        const searchInput = document.querySelector('.search-bar').value;
        if (searchInput) {
            fetchWeather(searchInput);
        }
    });

    document.querySelector('.search-bar').addEventListener('keyup', (event) => {
        if (event.key === "Enter") {
            const searchInput = document.querySelector('.search-bar').value;
            if (searchInput) {
                fetchWeather(searchInput);
                document.querySelector('.search-bar').value = "";
            }
        }
    });

    document.querySelector('.toggle-unit').addEventListener('click', () => {
        const tempElement = document.querySelector('.main-temp');
        const feelsLikeElement = document.querySelector('.feels-like .extra-info');
        let currentTemp = parseFloat(tempElement.textContent);
        let currentFeelsLike = parseFloat(feelsLikeElement.textContent);
        const isCelsius = tempElement.textContent.includes('°C');

        if (isCelsius) {
            tempElement.textContent = `${(currentTemp * 9/5 + 32).toFixed(1)}°F`;
            feelsLikeElement.textContent = `${(currentFeelsLike * 9/5 + 32).toFixed(1)}°F`;
        } else {
            tempElement.textContent = `${((currentTemp - 32) * 5/9).toFixed(1)}°C`;
            feelsLikeElement.textContent = `${((currentFeelsLike - 32) * 5/9).toFixed(1)}°C`;
        }
    });
});
