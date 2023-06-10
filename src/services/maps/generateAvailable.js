const { getAvailable } = require("../../database/queries/maps");

const calculateAvailable = (available) => {
  try {
    let disponibilidad;
    let eficiencia;

    if (available.horas_produccion !== null) {
      if (available.disponibilidad !== null && available.disponibilidad !== 0) {
        const dis = available.disponibilidad / 3600;
        const horasProd = available.horas_produccion;

        const value = (dis / horasProd) * 100;

        disponibilidad = parseFloat(value.toFixed(2));
      }
    } else {
      disponibilidad = 0;
    }

    if (available.eficiencia !== null) eficiencia = available.eficiencia;
    else eficiencia = 0;

    const obj = { disponibilidad, eficiencia };

    return obj;
  } catch (error) {
    console.log(error);
  }
};

module.exports = generateAvailable = async (fecha) => {
  try {
    const articObj = await getAvailable(fecha);

    if (articObj.length > 0) {
      const data = articObj[0];
      const obj = calculateAvailable(data);
      return obj;
    } else {
      return { disponibilidad: 0, eficiencia: 0 };
    }
  } catch (error) {
    console.log(error);
  }
};
