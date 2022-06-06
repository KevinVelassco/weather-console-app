const fs = require("fs");

const directory = "db";
const file = `./${directory}/data.json`;

if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

const saveFile = (data) => {
  try {
    fs.writeFileSync(file, JSON.stringify(data));
  } catch (err) {
    throw err;
  }
};

const readBD = () => {
  if (!fs.existsSync(file)) return [];

  const data = fs.readFileSync(file, { encoding: "utf-8" });

  return JSON.parse(data);
};

module.exports = { saveFile, readBD };
