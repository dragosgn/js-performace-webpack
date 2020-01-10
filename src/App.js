import React, { useState, useEffect } from 'react';

import Worker from './workers/calculation.worker.js';
import calculate from './calculate';

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
  const [data, setData] = useState({ primes: null });

  const onUseWebWorker = async () => {
    const result = await runWorker();
    setData({ primes: result });
  };

  const onUseMainThread = e => {
    e.preventDefault();
    const result = calculate();
    console.log('this is the result', result);
    setData({ primes: result });
  };

  return (
    <div>
      <div>{title}</div>
      <button onClick={onUseMainThread}>Use Main Thread</button>
      <button onClick={onUseWebWorker}>Use web worker</button>

      <div id="container" className="started">
        <div className="moving-box"></div>
      </div>
      {data.primes &&
        data.primes.map(prime => <p key={prime}>{prime}</p>)}
    </div>
  );
};

export default App;
