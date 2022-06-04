require("colors");
const inquirer = require("inquirer");

const createMenu = async ({ title, questions = [] }) => {
  console.clear();
  console.log("======================".green);
  console.log(`   ${title}`.green);
  console.log("======================".green);

  const { option } = await inquirer.prompt(questions);
  return option;
};

const pause = async () => {
  console.log("\n");
  await inquirer.prompt({
    type: "input",
    name: "enter",
    message: `press ${"ENTER".green} to continue`,
  });
};

const input = async (message) => {
  const { input } = await inquirer.prompt({
    type: "input",
    name: "input",
    message: message ?? "enter something",
    validate(value) {
      if (value.length === 0) {
        return "Please enter a value";
      }
      return true;
    },
  });

  return input;
};

module.exports = {
  createMenu,
  pause,
  input,
};
