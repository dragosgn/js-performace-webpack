import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './style.css';

const title = 'Web worker';

ReactDOM.render(
  <App title={title} />,
  document.getElementById('app')
);
module.hot.accept();
