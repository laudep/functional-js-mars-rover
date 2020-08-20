require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const port = 3001;

const API_BASE_URL = "https://api.nasa.gov";
const API_ENDPOINT_ROVER = "/mars-photos/api/v1/rovers";
const AMOUNT_OF_PHOTOS_TO_SERVE = 5;

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "../public")));

const fetchJson = async (url) => (await fetch(url)).json();

// remove unnecessary rover data
const purgeRoverData = rovers => rovers.map(({
  cameras,
  id,
  ...properties
}) =>
  properties
);

// remove unnecessary photo data
const purgePhotoData = photos => photos.map(({
  rover,
  camera,
  ...properties
}) =>
  properties
);

// rovers API call
app.get("/rovers", async (req, res, next) => {
  const endpoint = `${API_BASE_URL}${API_ENDPOINT_ROVER}?api_key=${process.env.API_KEY}`;

  const result = await fetchJson(endpoint).catch(err => next(err));
  res.send(purgeRoverData(result.rovers));
});

// rover photos API call
app.get("/rovers/:roverName/photos", async (req, res, next) => {
  const { roverName } = req.params;
  const endpoint = `${API_BASE_URL}${API_ENDPOINT_ROVER}/${roverName}/latest_photos?api_key=${process.env.API_KEY}`;

  const result = await fetchJson(endpoint).catch(error => next(error));
  const lastPhotos = result.latest_photos
    ? result.latest_photos.slice(0, AMOUNT_OF_PHOTOS_TO_SERVE)
    : [];
  res.send(purgePhotoData(lastPhotos));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));