import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { AppStateProvider } from './components/AppStateContext.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import CssBaseline from "@mui/material/CssBaseline";
import Routes from './Router.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppStateProvider>
      <CssBaseline></CssBaseline>
      {/* <App /> */}
      <Routes />
    </AppStateProvider>
  </React.StrictMode>
)
