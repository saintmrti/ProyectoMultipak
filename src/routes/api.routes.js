const express = require("express");
const moment = require("moment-timezone");

const constants = require("../utils/constants");
const rulaController = require("../controllers/rulaController");
const mapController = require("../controllers/mapController");
const efficiencyController = require("../controllers/efficiencyController");

const router = express.Router();

router.get("/maps", mapController);
router.get("/rula", rulaController);
router.get("/efficiency", efficiencyController);

router.post("/update", (req, res) => {
  const encode = /^\d{2}\/\d{2}\/\d{4}$/;
  if (req.body?.fecha) {
    if (encode.test(req.body.fecha))
      constants.LAST_DAY = moment(req.body.fecha, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );
  }
  if (req.body?.plano) {
    if (req.body.plano === "XY") constants.ID_PLANO = "1";
    if (req.body.plano === "XZ") constants.ID_PLANO = "2";
  }
  res.json("Success");
});

module.exports = router;
