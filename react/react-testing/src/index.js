import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NoteGenerator from './noteGenerator';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<NoteGenerator />, document.getElementById('root'));
registerServiceWorker();
