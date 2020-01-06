var myWorker = new Worker("worker.js");

first.onchange = function() {
  myWorker.postMessage([12, 34]);
  console.log("Message posted to worker");
};

second.onchange = function() {
  myWorker.postMessage([32, "hello world!"]);
  console.log("Message posted to worker");
};
