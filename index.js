require("dotenv").config();

const {
  createMenu,
  pause,
  input,
  createSubmenu,
} = require("./helpers/inquirer");
const Mapbox = require("./services/mapbox.service");

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

  const mapbox = new Mapbox();
  let option = 0;

  do {
    option = await createMenu({
      title: "Select an option",
      questions,
    });

    switch (option) {
      case 1:
        const place = await input("City:");

        const data = await mapbox.cities(place);

        const placeId = await createSubmenu(data);

        if (!placeId) break;

        const { name, longitude, latitude } = data.find(
          (res) => res.id === placeId
        );

        console.log("\nCity Information\n".green);
        console.log("City:", name);
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
        console.log("temperature:");
        console.log("Minimal:");
        console.log("maximum:");
        break;
    }

    if (option !== 0) await pause();
  } while (option !== 0);
};

main();
