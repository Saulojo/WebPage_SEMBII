const apiUrl = 'https://webapigerenciamento.azure-api.net/api/retValues';
const subscriptionKey = 'e99b7b66314e4b7abdf478ad0263f785';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; 

google.charts.load('current', {'packages':['line']});
let acelerometer_data = [];
let gyroscope_data = [];
let magnetometer_data = [];

let chart_ac;
let chart_gy;
let chart_ma;
let time = 0;

google.charts.setOnLoadCallback(initializeCharts);

function initializeCharts(){
    let data_ac = new google.visualization.DataTable();
    let data_gy = new google.visualization.DataTable();
    let data_ma = new google.visualization.DataTable();

    initializeChart('curve_chart_accelerometer', 'Acelerômetro', data_ac);
    initializeChart('curve_chart_gyroscope', 'Giroscópio', data_gy);
    initializeChart('curve_chart_magnetometer', 'Magnetômetro', data_ma);

    setInterval(() => fetchData(data_ac, data_gy, data_ma), 500);
}

function details_click(tytle){
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

    const element = document.getElementById(id_element);

    const isvisible = element.style.visibility === "visible";

    if (isvisible){
        element.style.visibility = "hidden";


    }else{
        element.style.visibility = "visible";

        
    }

}

function ShowDataFromApi(response){
    const ax = response._acelerometersensor[0];
    const ay = response._acelerometersensor[1];
    const az = response._acelerometersensor[2];

    const gx = response._giroscopesensor[0];
    const gy = response._giroscopesensor[1];
    const gz = response._giroscopesensor[2];

    const mx = response._magnetometersensor[0];
    const my = response._magnetometersensor[1];
    const mz = response._magnetometersensor[2];

    document.getElementById("accelerometer_x").innerHTML = "Valor X:" + ax + "m/s²";
    document.getElementById("accelerometer_y").innerHTML = "Valor Y:" + ay + "m/s²";
    document.getElementById("accelerometer_z").innerHTML = "Valor Z:" + az + "m/s²";


    document.getElementById("gyroscope_x").innerHTML = "Valor X:" + gx + "rad/s";
    document.getElementById("gyroscope_y").innerHTML = "Valor Y:" + gy + "rad/s";
    document.getElementById("gyroscope_z").innerHTML = "Valor Z:" + gz + "rad/s";



    document.getElementById("magnetometer_x").innerHTML = "Valor X:" + mx + "µT";
    document.getElementById("magnetometer_y").innerHTML = "Valor Y:" + my + "µT";
    document.getElementById("magnetometer_z").innerHTML = "Valor Z:" + mz + "µT";


}
function add_data(time,x,y,z,data,charta,name){
    data.addRow([
        time,
        x,
        y,
        z
    ]);
    
    charta.draw(data, google.charts.Line.convertOptions({
        chart: {
            title: name,
            subtitle: 'Em X, Y e Z'
        },
        width: '50%',
        height: '40%'
    }));
}

async function fetchData(data_ac, data_gy, data_ma) {
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
        
 
        
        const sensorData = await response.json();
        ShowDataFromApi(sensorData)
        time += 0.5;
        add_data(time,sensorData._acelerometersensor[0],sensorData._acelerometersensor[1],sensorData._acelerometersensor[2],data_ac,chart_ac,'Acelerômetro')
        add_data(time,sensorData._giroscopesensor[0],sensorData._giroscopesensor[1],sensorData._giroscopesensor[2],data_gy,chart_gy,'Giroscópio')
        add_data(time,sensorData._magnetometersensor[0],sensorData._magnetometersensor[1],sensorData._magnetometersensor[2],data_ma,chart_ma,'Magnetômetro')
        

        
        

    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}



function initializeChart(id,name,data) {


    data.addColumn('number', 'Tempo');
    data.addColumn('number', name + ' X');
    data.addColumn('number', name + ' Y');
    data.addColumn('number', name + ' Z');


    var options = {
      chart: {
        title: name,
        subtitle: 'Em X, Y e Z'
      },
      width: 500,
      height: 390
    };

    let chart = new google.charts.Line(document.getElementById(id));
    chart.draw(data, google.charts.Line.convertOptions(options));

    if (name === 'Acelerômetro') {
        chart_ac = chart;
    } else if (name === 'Giroscópio') {
        chart_gy = chart;
    } else if (name === 'Magnetômetro') {
        chart_ma = chart;
    }
  }

setInterval(fetchData, 500);