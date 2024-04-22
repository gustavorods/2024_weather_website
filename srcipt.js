document.querySelector('#submit ').addEventListener('click', async (event) => {
    // verificando se exite um nome
    const writeBar = document.querySelector('#writeBar').value;

    if(!writeBar) {
        alert('Você precisa digitar uma cidade...');
        return;
    }


    // Pegando os dados 
    const apiKey = "40bf2c04916cd990ff1c3ee9b851806f";
    const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(writeBar)}&appid=${apiKey}&units=metric&lang=pt_br`;

    const result  = await fetch(urlApi);
    const json = await result.json();

    //Apresentando os dados
    showData(json)
    console.log(json)
} )

function showData (data) {
    // Nome da Cidade
    let cityName = document.querySelector("#cityName");
    let cityTemp = document.querySelector("#temp");
    let cityMinTemp = document.querySelector("#minTemp");
    let cityMaxTemp = document.querySelector("#maxTemp");
    let moisture = document.querySelector("#moisture");
    let wind = document.querySelector("#wind");
    let description = document.querySelector("#description");
    let imageWeatherConditions = document.querySelector("#weatherConditions");
    cityName.innerHTML = data.name; 
    cityTemp.innerHTML = `${parseInt(data.main.temp)} <sup>°C </sup>`;
    cityMinTemp.innerHTML = `${parseInt(data.main.temp_min)} <sup>°C </sup>`;
    cityMaxTemp.innerHTML = `${parseInt(data.main.temp_max)} <sup>°C </sup>`;
    moisture.innerHTML = `${parseInt(data.main.humidity)}%`;
    wind.innerHTML = `${parseInt(data.wind.speed)}km/h`;
    description.innerHTML = `${data.weather[0].description}`;
    imageWeatherConditions.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
}   


