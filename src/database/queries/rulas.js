const { getConnection } = require("../connection");

const getRula = async (fecha) => {
  const pool = await getConnection();

  const result = await pool.request().query(`
        SELECT * FROM Multipak_rulas WHERE fecha= '${fecha}'
    `);

  return result.recordset;
};

module.exports.getRula = getRula;
