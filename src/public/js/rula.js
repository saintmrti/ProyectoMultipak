form.addEventListener("submit", (e) => {
  e.preventDefault();
  const date = dateInput.value;
  const data = {
    fecha: date,
  };

  if (!date == "") {
    ajaxPost("/api/update", data, function (error, res) {
      if (error) {
        console.error(error);
      } else {
        updateRula();
      }
    });
  }
});

function updateRula() {
  try {
    ajaxGet("/api/rula", (data) => {
      const rula = document.querySelector("#rula");
      if (data?.error) {
        console.log(data.error);
        const { fecha } = data;
        if (fecha) dateNow.innerHTML = `${fecha}`;
        rula.innerHTML = "";
      } else {
        const { dataRula, score, fecha } = data;

        if (fecha) dateNow.innerHTML = fecha;
        if (score) rula.innerHTML = `<h4>${score}</h4>`;
        else rula.innerHTML = "";

        if (dataRula) {
          Highcharts.chart("contenedor1", {
            chart: {
              type: "line",
            },
            title: {
              text: "Gráfico de brazo",
            },
            xAxis: {
              type: "datetime",
            },
            yAxis: {
              title: {
                text: "Valores de brazo",
              },
              max: 5,
              plotLines: [
                {
                  value: 4, // Valor donde se ubicará la línea roja
                  color: "red", // Color de la línea roja
                  width: 2, // Ancho de la línea roja
                  dashStyle: "dash", // Estilo de línea de la línea roja (en este caso, línea punteada)
                  // label: {
                  //   text: "Valor 2", // Texto de la etiqueta de la línea roja
                  // },
                },
              ],
            },
            series: [
              {
                name: "Brazo izquierdo",
                data: dataRula.upperArmLeft,
              },
              {
                name: "Brazo derecho",
                data: dataRula.upperArmRight,
              },
            ],
          });

          Highcharts.chart("contenedor2", {
            chart: {
              type: "line",
            },
            title: {
              text: "Gráfico de antebrazo",
            },
            xAxis: {
              type: "datetime",
            },
            yAxis: {
              title: {
                text: "Valores de antebrazo",
              },
              max: 4,
              plotLines: [
                {
                  value: 3,
                  color: "red",
                  width: 2,
                  dashStyle: "dash",
                },
              ],
            },
            series: [
              {
                name: "Antebrazo izquierdo",
                data: dataRula.lowerArmLeft,
              },
              {
                name: "Antebrazo derecho",
                data: dataRula.lowerArmRight,
              },
            ],
          });

          Highcharts.chart("contenedor3", {
            chart: {
              type: "line",
            },
            title: {
              text: "Gráfico de cuello",
            },
            xAxis: {
              type: "datetime",
            },
            yAxis: {
              title: {
                text: "Valores de cuello",
              },
              max: 4,
              plotLines: [
                {
                  value: 3,
                  color: "red",
                  width: 2,
                  dashStyle: "dash",
                },
              ],
            },
            series: [
              {
                name: "Cuello",
                data: dataRula.neck,
              },
            ],
          });

          Highcharts.chart("contenedor4", {
            chart: {
              type: "line",
            },
            title: {
              text: "Gráfico de torso",
            },
            xAxis: {
              type: "datetime",
            },
            yAxis: {
              title: {
                text: "Valores de Torso",
              },
              max: 5,
              plotLines: [
                {
                  value: 4,
                  color: "red",
                  width: 2,
                  dashStyle: "dash",
                },
              ],
            },
            series: [
              {
                name: "Torso",
                data: dataRula.trunk,
              },
            ],
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}

updateRula();
