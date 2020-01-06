import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Worker from "../workers/worker.js";

const runWorker = async () => {
  const worker = new Worker();
  const message = await new Promise((resolve, reject) => {
    worker.addEventListener("message", event => resolve(event.data), false);
    worker.addEventListener("error", reject, false);
  });
  return message;
};
const title = "React with Webpack and Babel";

ReactDOM.render(<App title={title} />, document.getElementById("app"));
module.hot.accept();
