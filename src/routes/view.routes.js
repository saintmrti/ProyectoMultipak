const express = require("express");

const router = express.Router();

router.get("/maps", (req, res) => {
  res.render("mapView");
});

router.get("/rula", (req, res) => {
  res.render("rulaView");
});

router.get("/efficiency", (req, res) => {
  res.render("efficiencyView");
});

module.exports = router;
