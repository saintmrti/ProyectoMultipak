const express = require("express");
const path = require("path");

const ApiRoutes = require("./routes/api.routes");
const ViwesRoutes = require("./routes/view.routes");

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("homeView");
});

app.use("/api", ApiRoutes);
app.use("/view", ViwesRoutes);

module.exports = app;
