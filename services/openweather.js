const axios = require("axios").default;

class OpenWheather {
  async getCurrentWeatherData({ lat, lon }) {
    try {
      const instance = axios.create({
        baseURL: "https://api.openweathermap.org/data/2.5/weather",
        params: {
          appid: process.env.OPENWEATHER_KEY,
          lat,
          lon,
          units: "metric",
          lang: "en",
        },
      });

      const { data } = await instance.get();

      const { description } = data.weather[0];

      const { temp, temp_min, temp_max } = data.main;

      return {
        description,
        temp,
        temp_min,
        temp_max,
      };
    } catch (err) {
      console.log(err?.message);
      return {};
    }
  }
}

module.exports = OpenWheather;
