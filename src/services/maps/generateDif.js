const _ = require("lodash");

module.exports = generateDif = (lastPlain, plain) => {
  try {
    const data1 = [];
    const data2 = [];
    const difference = [];

    _.map(lastPlain, ({ coord, percent }) => {
      data1.push({ x: coord[0], y: coord[1], percent });
    });

    _.map(plain, ({ coord, percent }) => {
      data2.push({ x: coord[0], y: coord[1], percent });
    });

    // console.time("miPrograma");

    _.forEach(data1, (element) => {
      const value = data2.find((c) => c.x == element.x && c.y == element.y);

      if (value === undefined) {
        difference.push({
          coord: [element.x, element.y],
          percent: element.percent,
        });
      } else {
        const dif = element.percent - value.percent;
        difference.push({
          coord: [element.x, element.y],
          percent: parseFloat(dif.toFixed(3)),
        });
      }
    });

    _.forEach(data2, (element) => {
      const value = data1.find((c) => c.x == element.x && c.y == element.y);

      if (value === undefined) {
        difference.push({
          coord: [element.x, element.y],
          percent: element.percent,
        });
      } else {
        const dif = element.percent - value.percent;
        difference.push({
          coord: [element.x, element.y],
          percent: parseFloat(dif.toFixed(3)),
        });
      }
    });

    return difference;
  } catch (error) {
    console.log(error);
  }
};
