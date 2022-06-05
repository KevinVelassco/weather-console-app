const axios = require("axios").default;

class Mapbox {
  constructor() {}

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "en",
    };
  }

  async cities(place = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox,
      });

      const { data } = await instance.get();

      return data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        longitude: place.center[0],
        latitude: place.center[1],
      }));
    } catch (err) {
      console.log(err?.message);
      return [];
    }
  }
}

module.exports = Mapbox;
