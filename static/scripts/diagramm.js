var lineCanvas = document.getElementById("line-diagramm");
var pieCanvasGender = document.getElementById("pie-diagramm-gender");
var pieCanvasCities = document.getElementById("pie-diagramm-cities");
const form = document.querySelector('form');
const select = document.getElementById("select");

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;


showLineChart = function(densityData) {
    var barChart = new Chart(lineCanvas, {
      type: 'bar',
      data: {
        labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        datasets: [densityData]
      }
    });
}

showPieChart = function(densityData) {
    var pieChart = new Chart(pieCanvasGender, {
      type: 'pie',
      data: {
        labels: ['Муж', 'Жен'],
        datasets: [densityData]
      }
    });
}

showPieChartHalf = function(densityData, cities) {
    var pieChart = new Chart(pieCanvasCities, {
      type: 'doughnut',
      data: {
        labels: cities,
        datasets: [densityData]
      }
    });
}

window.onload = async function() {
    let response = await fetch('/analyse', {
            method: 'POST'
        })

    let response_json = await response.json();

    console.log(Object.keys(response_json.cities))

    var LineData = {
      label: 'Количество пришедших клиентов за 2022 год',
      data: response_json.ad_analytics['2022'],
      backgroundColor: [
        "#2B506E",
        "#2B506E",
        "#2B506E",
        "#2B506E",
        "#2B506E",
        "#2B506E",
        "#2B506E",
        "#2B506E",
        "#2B506E",
        "#2B506E",
        "#2B506E",
        "#2B506E",
      ]
    };

    var PieData = {
      label: 'Количество мужчин и женщин',
      data: response_json.gender,
      backgroundColor: [
        "#6384FF",
        "#FF6384"
      ]
    }

    var PieHalfData = {
      label: 'Топ Городов',
      data: Object.values(response_json.cities),
      backgroundColor: [
                "#FF6384",
                "#63FF84",
                "#84FF63",
                "#8463FF",
                "#6384FF",
                "#2B506E"
            ]
    }

    showLineChart(LineData)

    showPieChart(PieData)

    showPieChartHalf(PieHalfData, Object.keys(response_json.cities))

    form.addEventListener('submit', e => {
        e.preventDefault();
        LineData.label = `Количество пришедших клиентов за ${select.value} год`
        LineData.data = response_json.ad_analytics[select.value]
        showLineChart(LineData)
    })
}




