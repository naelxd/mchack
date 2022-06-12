var densityCanvas = document.getElementById("diagramm");

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;


var densityData = {
  label: 'Количество пришедших клиентов за 2022 год',
  data: [5427, 5243, 5514, 3933, 1326, 687, 1271, 1638]
};

var barChart = new Chart(densityCanvas, {
  type: 'bar',
  data: {
    labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    datasets: [densityData]
  }
});