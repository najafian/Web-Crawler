import React from 'react';
import ReactDOM from 'react-dom';
import RouterComponent from './components/router-component';
import {Provider} from 'react-redux';
import initStore from './reducer/store';
import './assets/scss/antd.min.css';

export const globalStore = initStore();
const rootEl = document.getElementById('root');

const render = Component =>
    ReactDOM.render(
        <Provider store={globalStore}>
            <div style={{height: '100%', width: '100%'}} className="mainHeight">
                {/* If this slows down the app in dev disable it and enable when required  */}
                <Component/>
            </div>
        </Provider>
        ,
        rootEl
    );

render(RouterComponent);
