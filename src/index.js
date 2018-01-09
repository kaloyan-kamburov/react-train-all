import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import MyComp from './MyComp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MyComp />, document.getElementById('root'));
registerServiceWorker();
