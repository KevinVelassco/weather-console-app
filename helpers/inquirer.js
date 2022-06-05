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

const createSubmenu = async (questions = []) => {
  if (!questions.length) {
    console.log("no menu data".red);
    return null;
  }

  const choices = questions.map((question, index) => ({
    value: question.id,
    name: `${String(index + 1).green}. ${question.name}`,
  }));

  choices.unshift({ value: 0, name: `${"0. cancel".blue}` });

  const { option } = await inquirer.prompt({
    type: "list",
    name: "option",
    message: "select an option!",
    choices,
  });

  return option;
};

module.exports = {
  createMenu,
  pause,
  input,
  createSubmenu,
};
