const moment = require("moment-timezone");

let idPlano = "1";
let lastDay = moment().subtract(1, "day").format("YYYY-MM-DD");
let lastWednesday = moment().day(3).format("YYYY-MM-DD");
if (moment().day() <= 3)
  lastWednesday = moment().day(3).subtract(1, "week").format("YYYY-MM-DD");

module.exports = {
  ID_PLANO: idPlano,
  LAST_DAY: lastDay,
  LAST_WEDNESDAY: lastWednesday,
};
