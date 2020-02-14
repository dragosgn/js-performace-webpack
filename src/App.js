import React, { useState } from 'react';
import styled from 'styled-components';

import Worker from './workers/calculation.worker.js';
import calculate from './calculate';
import calculateUseRequestAnimationFrame from './calculateUseRequestAnimationFrame';

const BoxTitle = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Number = styled.p`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
`;

const NumbersBox = styled.div`
  display: grid;
  margin-top: 2rem;
  grid-template-columns: auto auto auto auto;
`;

const Button = styled.button`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 900;
  padding: 1.25rem 2rem;
  font-size: 1rem;
  border-radius: 3.5rem / 100%;
  position: relative;
  min-width: 15rem;
  max-width: 90vw;
  overflow: hidden;
  border: 0;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all $time;
  background-color: #fee140;
  color: #fa709a;
  user-select: none;
  margin: 1rem;
  :focus {
    outline: none;
  }
  :hover {
    color: #fee140;
    background-color: #fa709a;
  }
`;

const H1 = styled.h1`
  color: #111;
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 60px;
  font-weight: bold;
  letter-spacing: -1px;
  line-height: 1;
  text-align: center;
  margin: 2rem;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

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

const App = () => {
  const [data, setData] = useState({ primes: null });

  const [title, setTitle] = useState('Using main thread.');

  const onUseWebWorker = async () => {
    setTitle('Using web worker.');
    const result = await runWorker();
    setData({ primes: result });
  };

  const onUseMainThread = async e => {
    e.preventDefault();
    setTitle('Using main thread.');
    const result = await calculate();
    console.log('this is the result', result);
    setData({ primes: result });
  };

  const onUseRequestAnimationFrame = async e => {
    e.preventDefault();
    setTitle('Using on onUseRequestAnimationFrame.');
    const result = await calculateUseRequestAnimationFrame();
    console.log('this is the result', result);
    setData({ primes: result });
  };

  return (
    <div className="container">
      <H1>{title}</H1>
      <Container>
        <Button type="button" onClick={onUseMainThread}>
          Use Main Thread
        </Button>

        <Button type="button" onClick={onUseWebWorker}>
          Use Web Worker
        </Button>

        <Button type="button" onClick={onUseRequestAnimationFrame}>
          Request Anim Frame
        </Button>
      </Container>

      <div id="container" className="started">
        <div className="box moving-box">
          <BoxTitle>I like to move</BoxTitle>
        </div>
      </div>
      <NumbersBox>
        {data.primes &&
          data.primes.map(prime => (
            <Number key={prime}>{prime}</Number>
          ))}
      </NumbersBox>
    </div>
  );
};

export default App;
