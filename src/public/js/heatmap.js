form.addEventListener("submit", (e) => {
  e.preventDefault();
  const date = dateInput.value;
  const plain = plainInput.value;
  const data = {
    fecha: date,
    plano: plain,
  };

  if (!date == "") {
    if (plain === "XY") {
      ajaxPost("/api/update", data, function (error, res) {
        if (error) {
          console.error(error);
        } else {
          clearHeatmap("heatmap", "heatmap2", "/img/XY_T.png");
          updateCreatedMap();
        }
      });
    }
    if (plain === "XZ") {
      ajaxPost("/api/update", data, function (error, res) {
        if (error) {
          console.error(error);
        } else {
          clearHeatmap("heatmap2", "heatmap", "/img/XZ_T.png");
          updateCreatedMap();
        }
      });
    }
  }
});

function updateCreatedMap() {
  try {
    ajaxGet("/api/maps", (data) => {
      if (data) {
        // const maxPercent = d3.max(data, (d) => d.percent);
        const dateNow = document.querySelector("#fechaSpan");
        const { plain, lastPlain, difPlain, available, fecha } = data;

        if (fecha) dateNow.innerHTML = fecha;
        const maxPercent = 0.6;

        const colorScale = d3
          .scaleLinear()
          .domain([0, maxPercent / 2, maxPercent])
          .range(["lightgreen", "orange", "red"])
          .interpolate(d3.interpolateRgb);

        const colorScaleDif = d3
          .scaleLinear()
          .domain([-maxPercent, 0, maxPercent / 2, maxPercent])
          .range(["blue", "lightgreen", "orange", "red"])
          .interpolate(d3.interpolateRgb);

        createHeatmap(lastPlain, "#heatmap1", colorScale);
        createHeatmap(plain, "#heatmap2", colorScale);
        createHeatmap(difPlain, "#heatmap3", colorScaleDif);
        updateAvailable(available);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

function createHeatmap(data, mapId, colorScale) {
  try {
    const width = 742;
    const height = 929;
    const margin = { top: 20, right: 0, bottom: 30, left: 0 };
    const maxX = d3.max(data, (d) => d.coord[0]);
    const maxY = d3.max(data, (d) => d.coord[1]);
    const xScale = d3
      .scaleLinear()
      .domain([0, maxX])
      .range([margin.left, width - margin.right]);
    const yScale = d3
      .scaleLinear()
      .domain([0, maxY])
      .range([height - margin.bottom, margin.top]);
    const svg = d3
      .select(mapId)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `180 0 ${width - 50} ${height - 300}`)
      .style("transform", "rotate(180deg) scale(-1,1)");
    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.coord[0]))
      .attr("cy", (d) => yScale(d.coord[1]))
      .attr("r", 5)
      .attr("fill", (d) => colorScale(d.percent));
  } catch (error) {
    console.log(error);
  }
}

function clearHeatmap(addCls, removeCls, img) {
  const heatmap1 = document.getElementById("heatmap1");
  const heatmap2 = document.getElementById("heatmap2");
  const heatmap3 = document.getElementById("heatmap3");
  const content = document.querySelectorAll(".contenedor");

  heatmap1.classList.remove(removeCls);
  heatmap2.classList.remove(removeCls);
  heatmap3.classList.remove(removeCls);

  heatmap1.className = addCls;
  heatmap2.className = addCls;
  heatmap3.className = addCls;

  heatmap1.innerHTML = "";
  heatmap2.innerHTML = "";
  heatmap3.innerHTML = "";

  content.forEach(function (elemento) {
    elemento.innerHTML = "";
    elemento.innerHTML = `<img src=${img} alt="" class="imagenS">`;
  });
}

function updateAvailable({ lastDay, wendesday }) {
  try {
    const div1 = document.getElementById("textA1");
    const div2 = document.getElementById("textA2");
    const div3 = document.getElementById("textB1");
    const div4 = document.getElementById("textB2");

    div1.innerHTML = "";
    div2.innerHTML = "";
    div3.innerHTML = "";
    div4.innerHTML = "";

    div3.innerHTML = `<p id="textB1">${wendesday.eficiencia}%</p>`;
    div4.innerHTML = `<p id="textB2">${lastDay.eficiencia}%</p>`;

    switch (true) {
      case wendesday.disponibilidad > 40:
        div1.innerHTML = `<p id="textA1" class="text-success">${wendesday.disponibilidad}%</p>`;
        break;
      case wendesday.disponibilidad > 30 && wendesday.disponibilidad < 40:
        div1.innerHTML = `<p id="textA1" class="text-warning">${wendesday.disponibilidad}%</p>`;
        break;
      case wendesday.disponibilidad > 0 && wendesday.disponibilidad < 30:
        div1.innerHTML = `<p id="textA1" class="text-danger">${wendesday.disponibilidad}%</p>`;
        break;
      case wendesday.disponibilidad == 0:
        div1.innerHTML = `<p id="textA1">0%</p>`;
        break;
    }

    switch (true) {
      case lastDay.disponibilidad > 40:
        div2.innerHTML = `<p id="textA2" class="text-success">${lastDay.disponibilidad}%</p>`;
        break;
      case lastDay.disponibilidad > 30 && lastDay.disponibilidad < 40:
        div2.innerHTML = `<p id="textA2" class="text-warning">${lastDay.disponibilidad}%</p>`;
        break;
      case lastDay.disponibilidad > 0 && lastDay.disponibilidad < 30:
        div2.innerHTML = `<p id="textA2" class="text-danger">${lastDay.disponibilidad}%</p>`;
        break;
      case lastDay.disponibilidad == 0:
        div2.innerHTML = `<p id="textA2">0%</p>`;
        break;
    }
  } catch (error) {
    console.log(error);
  }
}

updateCreatedMap();
