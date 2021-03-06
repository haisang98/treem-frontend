import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import StartUp from './wrapper/StartUp';
import 'date-fns';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnUtils from '@date-io/date-fns';

ReactDOM.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      <MuiPickersUtilsProvider utils={DateFnUtils}>
        <StartUp>
            <App />
        </StartUp>
      </MuiPickersUtilsProvider>
    {/* </React.StrictMode> */}
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
