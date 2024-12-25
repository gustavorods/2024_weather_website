// Adds a click event listener to the submit button
document.querySelector('#submit').addEventListener('click', async () => {
    await buttonSearchWeather();
})

// Function to fetch weather data
async function fetchWeatherData(city) {
    const apiKey = '40bf2c04916cd990ff1c3ee9b851806f';
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const url = `${baseUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=pt_br`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Error fetching data from the API.');
    }

    return await response.json();
}

// Function to display weather data on the interface
function displayWeatherData(data, flagElement) {
    // Maps the HTML elements
    const elements = {
        cityName: document.querySelector("#cityName"),
        cityTemp: document.querySelector("#temp"),
        cityMinTemp: document.querySelector("#minTemp"),
        cityMaxTemp: document.querySelector("#maxTemp"),
        moisture: document.querySelector("#moisture"),
        wind: document.querySelector("#wind"),
        description: document.querySelector("#description"),
        weatherIcon: document.querySelector("#weatherConditions"),
        flagInput: document.querySelector(".countryFlag"),
    };

    // Fills the elements with the data
    elements.cityName.textContent = data.name;
    elements.flagInput.textContent = flagElement;
    elements.cityTemp.innerHTML = `${Math.round(data.main.temp)} <sup>°C</sup>`;
    elements.cityMinTemp.innerHTML = `${Math.round(data.main.temp_min)} <sup>°C</sup>`;
    elements.cityMaxTemp.innerHTML = `${Math.round(data.main.temp_max)} <sup>°C</sup>`;
    elements.moisture.textContent = `${data.main.humidity}%`;
    elements.wind.textContent = `${data.wind.speed} km/h`;
    elements.description.textContent = data.weather[0].description;
    elements.weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
}

// Function to find the country flag 
async function findCountryFlag(countryName) {
    // Making requests to country API
    let req
    try {
        req = await fetch('https://restcountries.com/v3.1/all');
    }
    catch(error) {
        console.log(`Error trying to make request ${error}`);
    }

    // Transforming the response into JSON
    let json = await req.json();

    // Finding respective flag
    for (let country in json) {
        let nameCountryReq = json[country].name.common;
        
        if(nameCountryReq == countryName) {
            return json[country].flag;
        }
    };
}

async function buttonSearchWeather() {
       // Gets the input value and and removing spaces from the end and beginning to avoid errors
       let cityInput = document.querySelector('#writeBar').value;
       cityInput.trim();
   
       // Checks if the input is empty
       if (!cityInput) {
           alert('You need to enter a city...');
           return;
       }
   
       try {
           // Fetches the weather data
           const weatherData = await fetchWeatherData(cityInput);
           
           // Obtains the flag 
           let flag = null;
           try {
               flag = await findCountryFlag(cityInput);
           } catch (error) {
               console.error("Error fetching country flag:", error);
           }
       
           // Displays the weather data on the interface
           displayWeatherData(weatherData, flag);
       } catch (error) {
           console.error('Error fetching weather data:', error);
           alert('Unable to retrieve weather data. Please try again.');
       }
       
}