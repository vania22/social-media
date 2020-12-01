import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from "@material-ui/core/CssBaseline";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MenuBar from "./components/MenuBar";

import {theme} from "./theme";

const App = () => {
  return (
          <ThemeProvider theme={theme}>
              <CssBaseline />
              <Router>
                  <div style={{maxWidth: 1500, margin: '0 auto'}}>
                      <MenuBar/>
                      <Route exact path='/' component={Home}/>
                      <Route exact path='/login' component={Login}/>
                      <Route exact path='/register' component={Register}/>
                  </div>
              </Router>
          </ThemeProvider>
  );
}

export default App;
