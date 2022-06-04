const { createMenu, pause } = require("./helpers/inquirer");

const main = async () => {
  const questions = [
    {
      type: "list",
      name: "option",
      message: "What would you like to do?",
      choices: [
        {
          value: 1,
          name: `${"1)".green} search city`,
        },
        {
          value: 2,
          name: `${"2)".green} history`,
        },
        {
          value: 0,
          name: `${"0)".green} exit`,
        },
      ],
    },
  ];

  let option = 0;

  do {
    option = await createMenu({
      title: "Select an option",
      questions,
    });

    if (option !== 0) await pause();
  } while (option !== 0);
};

main();
