import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { theme } from './files/theme';
import { ThemeProvider} from '@material-ui/styles'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      
    </ThemeProvider>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
