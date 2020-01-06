self.onmessage = function(e) {
  console.log("Worker: Message received from main script");

  let result = e.data[0] * e.data[1];
  if (isNaN(result)) {
    self.postMessage("Please write two numbers");
  } else {
    let workerResult = "Result: " + result;
    console.log("Worker: Posting message back to main script");
    self.postMessage(workerResult);
  }
};
