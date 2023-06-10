const { getRula } = require("../../database/queries/rulas");

module.exports = generateRula = async (fecha) => {
  try {
    const bodyParts = await getRula(fecha);

    if (bodyParts && bodyParts.length > 0) {
      const rula = JSON.parse(bodyParts[0].rula);

      const upperArmLeft = rula.map((item) => ({
        x: new Date(item.fecha).getTime(),
        y: item.upArmLeft,
      }));
      const upperArmRight = rula.map((item) => ({
        x: new Date(item.fecha).getTime(),
        y: item.upArmRight,
      }));
      const lowerArmLeft = rula.map((item) => ({
        x: new Date(item.fecha).getTime(),
        y: item.lowArmLeft,
      }));
      const lowerArmRight = rula.map((item) => ({
        x: new Date(item.fecha).getTime(),
        y: item.lowArmRight,
      }));
      const neck = rula.map((item) => ({
        x: new Date(item.fecha).getTime(),
        y: item.neck,
      }));
      const trunk = rula.map((item) => ({
        x: new Date(item.fecha).getTime(),
        y: item.trunk,
      }));

      const score = bodyParts[0].rulaGral;

      const dataRula = {
        upperArmLeft,
        upperArmRight,
        lowerArmLeft,
        lowerArmRight,
        neck,
        trunk,
      };

      return { dataRula, score, fecha };
    } else {
      return { error: "No data", fecha };
    }
  } catch (error) {
    console.log(error);
  }
};
