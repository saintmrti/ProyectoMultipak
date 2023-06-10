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
        createGraphics();
      }
    });
  }
});

function incomodidadUmbrales(element) {
  if (element <= 70) {
    return "#4caf50";
  } else if (element > 70 && element < 80) {
    return "#ff9800";
  } else {
    return "#f44336";
  }
}

function estiramientosUmbrales(element) {
  if (element >= 275) {
    return "#4caf50";
  } else if (element > 200 && element < 275) {
    return "#ff9800";
  } else {
    return "#f44336";
  }
}

function disponibilidadUmbrales(element) {
  if (element >= 40) {
    return "#4caf50";
  } else if (element > 30 && element < 40) {
    return "#ff9800";
  } else {
    return "#f44336";
  }
}

function createGraphics() {
  try {
    ajaxGet("/api/efficiency", (data) => {
      const textBox = document.querySelector("#no-data");
      const div1 = document.querySelector("#contenedor1");
      const div2 = document.querySelector("#contenedor2");
      const div3 = document.querySelector("#contenedor3");
      if (data?.error) {
        console.log(data.error);
        const { fecha } = data;
        if (fecha) dateNow.innerHTML = `${fecha}`;
        textBox.innerHTML = "Lo sentimos, no hay datos para mostrar";
        div1.innerHTML = "";
        div2.innerHTML = "";
        div3.innerHTML = "";
      } else {
        textBox.innerHTML = "";
        const { maxDiscomfort, estiraminetos, disponibilidad, fecha } = data;

        if (fecha) dateNow.innerHTML = `${fecha}`;

        // Crear la gráfica de barras con Highcharts
        Highcharts.chart("contenedor1", {
          chart: {
            type: "column",
          },
          title: {
            text: "Incomodidad",
          },
          xAxis: {
            type: "datetime",
          },
          yAxis: {
            title: {
              text: "Valor en %",
            },
            max: 100,
            plotLines: [
              {
                value: 80, // Valor donde se ubicará la línea roja
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
              name: "Incomodidad",
              data: maxDiscomfort,
              color: function () {
                let max_DISCOMFORT = this.y;
                return incomodidadUmbrales(max_DISCOMFORT);
              },
              // Configurar el evento afterAnimate para actualizar el color al pasar el cursor por encima
              events: {
                afterAnimate: function () {
                  let points = this.points;
                  for (let i = 0; i < points.length; i++) {
                    let point = points[i];
                    let max_DISCOMFORT = point.y;
                    point.color = incomodidadUmbrales(max_DISCOMFORT);
                    point.update();
                  }
                },
              },
            },
          ],
        });

        Highcharts.chart("contenedor2", {
          chart: {
            type: "column",
          },
          title: {
            text: "Estiramientos",
          },
          xAxis: {
            type: "datetime",
          },
          yAxis: {
            title: {
              text: "Cantidad de Estiramientos",
            },
            // max: 100,
            // plotLines: [
            //   {
            //     value: 80, // Valor donde se ubicará la línea roja
            //     color: "red", // Color de la línea roja
            //     width: 2, // Ancho de la línea roja
            //     dashStyle: "dash", // Estilo de línea de la línea roja (en este caso, línea punteada)
            //     // label: {
            //     //   text: "Valor 2", // Texto de la etiqueta de la línea roja
            //     // },
            //   },
            // ],
          },
          series: [
            {
              name: "Estiramientos",
              data: estiraminetos,
              color: function () {
                let value = this.y;
                return estiramientosUmbrales(value);
              },
              // Configurar el evento afterAnimate para actualizar el color al pasar el cursor por encima
              events: {
                afterAnimate: function () {
                  let points = this.points;
                  for (let i = 0; i < points.length; i++) {
                    let point = points[i];
                    let value = point.y;
                    point.color = estiramientosUmbrales(value);
                    point.update();
                  }
                },
              },
            },
          ],
        });

        Highcharts.chart("contenedor3", {
          chart: {
            type: "column",
          },
          title: {
            text: "Disponibilidad",
          },
          xAxis: {
            type: "datetime",
          },
          yAxis: {
            title: {
              text: "Valor en %",
            },
            max: 100,
            plotLines: [
              {
                value: 30, // Valor donde se ubicará la línea roja
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
              name: "Dispobilidad",
              data: disponibilidad,
              color: function () {
                let value = this.y;
                return disponibilidadUmbrales(value);
              },
              // Configurar el evento afterAnimate para actualizar el color al pasar el cursor por encima
              events: {
                afterAnimate: function () {
                  let points = this.points;
                  for (let i = 0; i < points.length; i++) {
                    let point = points[i];
                    let value = point.y;
                    point.color = disponibilidadUmbrales(value);
                    point.update();
                  }
                },
              },
            },
          ],
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}

createGraphics();
