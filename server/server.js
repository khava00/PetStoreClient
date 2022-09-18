import express from "express";
import fs from "fs";
import path from "path";

import React, { useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../src/components/redux/store";
import App from "../src/App";

const app = express();
const helmet = Helmet.renderStatic();

app.use("^/$", (req, res, next) => {

  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Some error happened");
    }
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${typeof window !== 'undefined' && ReactDOMServer.renderToString(
          <Provider store={store}>
            <Router>
              <App />
            </Router>
          </Provider>
        )}</div>`
      )
        .replace("</head>", `${helmet.meta.toString()}</head>`)
        .replace("</head>", `${helmet.title.toString()}</head>`)
        .replace("</head>", `${helmet.script.toString()}</head>`)
    );
  });
});

app.use(express.static(path.resolve(__dirname, "..", "build")));

app.listen(80, () => {
  console.log("App running on port 80");
});
