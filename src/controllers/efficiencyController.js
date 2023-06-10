const generateEfficiency = require("../services/efficiency/generateEfficiency");
const constants = require("../utils/constants");

module.exports = efficiencyController = async (req, res) => {
  try {
    const data = await generateEfficiency(constants.LAST_DAY);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: e.message });
  }
};
