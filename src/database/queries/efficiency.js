const { getConnection } = require("../connection");

const getEfficiency = async (fecha) => {
  const pool = await getConnection();
  const result = await pool.request().query(`
        SELECT fecha, max_DISCOMFORT, disponibilidad, MD_X, MI_X FROM Multipack_KPIs_Hora
        WHERE fecha  >= '${fecha} 00:00:00' AND fecha <='${fecha} 23:59:00'
    `);

  return result.recordset;
};

module.exports.getEfficiency = getEfficiency;
