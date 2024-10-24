const apiUrl = 'https://webapisembiisa.azure-api.net/api/retValues';
const subscriptionKey = '69a0140e7c9d45678eab08d48d3c903f';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; 

function details_click(tytle){
    console.log(tytle);
    let id_element;
    let id_card

    switch (tytle){
        case 'accelerometer':
            id_element = "details_accelerometer"
            id_card = "accelerometer_card"
            break;
        case 'gyroscope':
            id_element = "details_gyroscope"
            id_card = "gyroscope_card"
            break;
        case 'magnetometer':
            id_element = "details_magnetometer"
            id_card = "magnetometer_card"
            break;
    }
    const element = document.getElementById(id_element);
    const card = document.getElementById(id_card);
    
    const isvisible = element.style.visibility === "visible";

    if (isvisible){
        element.style.visibility = "hidden";
        card.style.height = "50%";

    }else{
        element.style.visibility = "visible";
        card.style.width = "100%";
        card.style.height = "100%";
        
    }
}

function graphic_click(tytle){

    let id_element;

    console.log(tytle)
    switch (tytle){
        case 'accelerometer':
            id_element = "graphic_accelerometer"
            break;
        case 'gyroscope':
            id_element = "graphic_gyroscope"
            break;
        case 'magnetometer':
            id_element = "graphic_magnetometer"
            break;
    }
    console.log(id_element)
    const element = document.getElementById(id_element);

    const isvisible = element.style.visibility === "visible";

    if (isvisible){
        element.style.visibility = "hidden";


    }else{
        element.style.visibility = "visible";

        
    }

}

function ShowDataFromApi(response){

    document.getElementById("accelerometer_x").innerHTML = "Valor X:" + response._acelerometersensor[0] + "m/s²";
    document.getElementById("accelerometer_y").innerHTML = "Valor Y:" + response._acelerometersensor[1] + "m/s²";
    document.getElementById("accelerometer_z").innerHTML = "Valor Z:" + response._acelerometersensor[2] + "m/s²";

    document.getElementById("gyroscope_x").innerHTML = "Valor X:" + response._giroscopesensor[0] + "rad/s";
    document.getElementById("gyroscope_y").innerHTML = "Valor Y:" + response._giroscopesensor[1] + "rad/s";
    document.getElementById("gyroscope_z").innerHTML = "Valor Z:" + response._giroscopesensor[2] + "rad/s";

    document.getElementById("magnetometer_x").innerHTML = "Valor X:" + response._magnetometersensor[0] + "µT";
    document.getElementById("magnetometer_y").innerHTML = "Valor Y:" + response._magnetometersensor[1] + "µT";
    document.getElementById("magnetometer_z").innerHTML = "Valor Z:" + response._magnetometersensor[2] + "µT";

}


async function fetchData() {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey,
                'Origin': 'http://127.0.0.1:5500'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        
 
        
        const data = await response.json();
        ShowDataFromApi(data)

    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

setInterval(fetchData, 500);