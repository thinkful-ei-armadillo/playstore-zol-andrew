"use strict";
const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

const playstore = require("./playstore");

app.get("/apps", (req, res) => {
  const { sort, genres } = req.query;

  if (sort) {
    if (!["Rating", "App"].includes(sort)) {
      return res.status(400).send("Sort must be one of rating or app");
    }
  }
  if (genres) {
    if (
      !["Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"].includes(
        genres
      )
    ) {
      return res.status(400).send("Must be an acceptable genre.");
    }
  }
  let results = playstore;
  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
    res.json(results);
  }
  if (genres) {
    let newResults = results.filter(app => {
      let string = app["Genres"];
      if (string.includes(genres)) {
        return app;
      }
    });
    res.json(newResults);
  }
});

app.listen(8000, () => {
  console.log("listening on port 8000");
});
