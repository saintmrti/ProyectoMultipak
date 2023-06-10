const { getDataArtic } = require("../../database/queries/maps");

module.exports = generatePlain = async (fecha, idPlano) => {
  try {
    const articObj = await getDataArtic(fecha, idPlano);

    if (articObj.length > 0) {
      const data = JSON.parse(articObj[0].plano);
      return data;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};
