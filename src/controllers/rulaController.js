const generateRula = require("../services/rulas/generateRula");
const constants = require("../utils/constants");

module.exports = rulaController = async (req, res) => {
  try {
    const rula = await generateRula(constants.LAST_DAY);
    res.json(rula);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};
