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

    console.log(json)
} )


