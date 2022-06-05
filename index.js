require("dotenv").config();

const {
  createMenu,
  pause,
  input,
  createSubmenu,
} = require("./helpers/inquirer");
const Mapbox = require("./services/mapbox.service");
const OpenWheather = require("./services/openweather");

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
  const openWheather = new OpenWheather();
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

        const { description, temp, temp_min, temp_max } =
          await openWheather.getCurrentWeatherData({
            lat: latitude,
            lon: longitude,
          });

        console.clear();
        console.log("\nCity Information\n".green);
        console.log("City:", name);
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
        console.log("temperature:", temp);
        console.log("Minimal:", temp_min);
        console.log("maximum:", temp_max);
        console.log("What's the weather like:", description);
        break;
    }

    if (option !== 0) await pause();
  } while (option !== 0);
};

main();
