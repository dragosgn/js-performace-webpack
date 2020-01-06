import Worker from "./worker.js";
import "./style.css";

export default () => {
  const first = document.querySelector("#number1");
  const second = document.querySelector("#number2");
  const result = document.querySelector(".result");

  console.log(window.Worker && "there is a worker");

  if (window.Worker) {
    const worker = new Worker();

    first.onchange = function() {
      worker.postMessage([first.value, second.value]);
      console.log("Message posted to worker");
    };

    second.onchange = function() {
      worker.postMessage([first.value, second.value]);
      console.log("Message posted to worker");
    };

    worker.onmessage = function(e) {
      console.log(e);
      result.textContent = e.data;
      console.log("Message received from worker");
    };
  } else {
    console.log("Your browser doesn't support web workers.");
  }
};
