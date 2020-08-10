require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const port = 3001;

const API_BASE_URL = "https://api.nasa.gov";
const API_ENDPOINT_ROVER = "/mars-photos/api/v1/rovers";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "../public")));

const fetchJson = async (url) => (await fetch(url)).json();

// your API calls

// example API call
app.get("/apod", async (req, res) => {
  try {
    let image = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    res.send({ image });
  } catch (err) {
    console.log("error:", err);
  }
});

// rovers API call

app.get("/rovers", async (req, res) => {
  try {
    const roversData = await fetchJson(
      `${API_BASE_URL}${API_ENDPOINT_ROVER}?api_key=${process.env.API_KEY}`
    );
    res.send(roversData.rovers);
  } catch (err) {
    throw new Error(err);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
