import React, { useState, useEffect } from 'react';

import Worker from './workers/calculation.worker.js';
import calculate from './calculate';
import calculateUseRequestAnimationFrame from './calculateUseRequestAnimationFrame';

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

  const onUseMainThread = async e => {
    e.preventDefault();
    const result = await calculate();
    console.log('this is the result', result);
    setData({ primes: result });
  };

  const onUseRequestAnimationFrame = async e => {
    e.preventDefault();
    const result = await calculateUseRequestAnimationFrame();
    console.log('this is the result', result);
    setData({ primes: result });
  };

  return (
    <div className="container">
      <h1>{title}</h1>
      <div className="row">
        <div className="col">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onUseMainThread}
          >
            Use Main Thread
          </button>
        </div>
        <div className="col">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onUseWebWorker}
          >
            Use Web Worker
          </button>
        </div>
        <div className="col">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onUseRequestAnimationFrame}
          >
            Request Anim Frame
          </button>
        </div>
      </div>

      <div id="container" className="started">
        <div className="moving-box"></div>
      </div>
      {data.primes &&
        data.primes.map(prime => <p key={prime}>{prime}</p>)}
    </div>
  );
};

export default App;
