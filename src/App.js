import React, { useState, useEffect } from 'react';

const runWorker = async () => {
  const worker = new Worker();
  const message = await new Promise((resolve, reject) => {
    worker.addEventListener(
      'message',
      event => resolve(event.data),
      false
    );
    worker.addEventListener('error', reject, false);
  });
  return message;
};

const App = ({ title }) => {
  const [data, setData] = useState({ workerCalculation: null });

  useEffect(async () => {
    const result = await runWorker();
    setData(result);
  }, []);

  return (
    <div>
      <div>{title}</div>
      <p>{data ? data : 'Worker is working....'}</p>
    </div>
  );
};

export default App;
