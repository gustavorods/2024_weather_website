document.querySelector('#submit ').addEventListener('click', async (event) => {
    // checking if a name exists
    const writeBar = document.querySelector('#writeBar').value;

    if(!writeBar) {
        alert('Você precisa digitar uma cidade...');
        return;
    }


    // getting the data of weather
    let weatherinfos = await request(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(document.querySelector('#writeBar').value)}&appid=40bf2c04916cd990ff1c3ee9b851806f&units=metric&lang=pt_br`)
    let countryFlag = document.querySelector(".countryFlag")

    //Apresentando os dados
    showData(weatherinfos, countryFlag)
} )

// Show the data
function showData (data, flag) {
    let cityName = document.querySelector("#cityName");
    let cityTemp = document.querySelector("#temp");
    let cityMinTemp = document.querySelector("#minTemp");
    let cityMaxTemp = document.querySelector("#maxTemp");
    let moisture = document.querySelector("#moisture");
    let wind = document.querySelector("#wind");
    let description = document.querySelector("#description");
    let imageWeatherConditions = document.querySelector("#weatherConditions");
    cityName.innerHTML = data.name; 
    flag.innerHTML = `<img src="https://flagsapi.com/${data.sys.country}/flat/64.png" class="countryFlag">`
    cityTemp.innerHTML = `${parseInt(data.main.temp)} <sup>°C </sup>`;
    cityMinTemp.innerHTML = `${parseInt(data.main.temp_min)} <sup>°C </sup>`;
    cityMaxTemp.innerHTML = `${parseInt(data.main.temp_max)} <sup>°C </sup>`;
    moisture.innerHTML = `${parseInt(data.main.humidity)}%`;
    wind.innerHTML = `${parseInt(data.wind.speed)}km/h`;
    description.innerHTML = `${data.weather[0].description}`;
    imageWeatherConditions.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
}   


// making request
async function request(url) {
    const result  = await fetch(url);
    const json = await result.json();
    return json
}

