import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render( <App msg='It works!' />, document.getElementById('root'));
registerServiceWorker();
