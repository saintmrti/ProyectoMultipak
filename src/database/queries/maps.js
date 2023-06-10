const { getConnection } = require("../connection");

const getDataArtic = async (fecha, id) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT * FROM Multipak_mapas_calor
      WHERE fecha= '${fecha}' and idPlano= ${id};
    `);
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
};

// const getDataArtic = async (fecha1, fecha2, id) => {
//   try {
//     const pool = await getConnection();
//     const result = await pool.request().query(`
//       SELECT * FROM Multipak_mapas_calor
//       WHERE (fecha = '${fecha1}' OR fecha = '${fecha2}') AND idPlano = ${id};
//     `);
//     return result.recordset;
//   } catch (error) {
//     console.log(error);
//   }
// };

const getAvailable = async (fecha) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
        SELECT horas_produccion, disponibilidad, eficiencia FROM Multipack_KPIs_Dia
        WHERE fecha= '${fecha} 23:59:59';
    `);

    return result.recordset;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getDataArtic = getDataArtic;
module.exports.getAvailable = getAvailable;
