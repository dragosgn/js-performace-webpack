import React, { useState, useEffect } from 'react';
import Worker from './workers/calculation.worker.js';

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
  console.log('worker message', message);
  return message;
};

const App = ({ title }) => {
  const [data, setData] = useState({ workerCalculation: null });

  useEffect(() => {
    const calculate = async () => {
      const result = await runWorker();
      setData({ workerCalculation: result });
    };
    calculate();
  }, []);

  return (
    <div>
      <div>{title}</div>
      <p>
        {data.workerCalculation
          ? data.workerCalculation
          : 'Worker is working....'}
      </p>
    </div>
  );
};

export default App;
