import Worker from "../workers/worker.js";

const runWorker = async () => {
  const worker = new Worker();
  const message = await new Promise((resolve, reject) => {
    worker.addEventListener("message", event => resolve(event.data), false);
    worker.addEventListener("error", reject, false);
  });
  return message;
};

export default async () => {
  // This will have the value 'Done' from the worker's postMessage()
  const workerMessage = await runWorker();

  console.log(workerMessage);
};
