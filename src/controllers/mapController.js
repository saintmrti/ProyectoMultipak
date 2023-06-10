const generatePlain = require("../services/maps/generatePlain");
const generateDif = require("../services/maps/generateDif");
const generateAvailable = require("../services/maps/generateAvailable");
const constants = require("../utils/constants");

module.exports = mapController = async (req, res) => {
  try {
    const plain = await generatePlain(constants.LAST_DAY, constants.ID_PLANO);
    const lastPlain = await generatePlain(
      constants.LAST_WEDNESDAY,
      constants.ID_PLANO
    );
    const difPlain = generateDif(lastPlain, plain);
    const lastDay = await generateAvailable(constants.LAST_DAY);
    const wendesday = await generateAvailable(constants.LAST_WEDNESDAY);
    const available = { lastDay, wendesday };
    res.json({
      plain,
      lastPlain,
      difPlain,
      available,
      fecha: constants.LAST_DAY,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};
