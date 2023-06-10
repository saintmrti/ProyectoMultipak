const { getEfficiency } = require("../../database/queries/efficiency");

module.exports = generateEfficiency = async (fecha) => {
  try {
    const series = await getEfficiency(fecha);

    if (series && series.length > 0) {
      const maxDiscomfort = series
        .map((item) =>
          item.max_DISCOMFORT > 0
            ? {
                x: new Date(item.fecha).getTime() - 3600000,
                y: item.max_DISCOMFORT,
              }
            : null
        )
        .filter((item) => item !== null);

      const estiraminetos = series
        .map((item) =>
          item.MD_X > 0
            ? {
                x: new Date(item.fecha).getTime() - 3600000,
                y: Number(((item.MD_X + item.MI_X) / 1.8).toFixed(2)),
              }
            : null
        )
        .filter((item) => item !== null);

      const disponibilidad = series
        .map((item) =>
          item.disponibilidad > 0
            ? {
                x: new Date(item.fecha).getTime() - 3600000,
                y: Number(((item.disponibilidad * 100) / 3600).toFixed(2)),
              }
            : null
        )
        .filter((item) => item !== null);

      const data = {
        maxDiscomfort,
        estiraminetos,
        disponibilidad,
        fecha,
      };

      return data;
    } else {
      return { error: "No data", fecha };
    }
  } catch (error) {
    console.log(error);
  }
};
