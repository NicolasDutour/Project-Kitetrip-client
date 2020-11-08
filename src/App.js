import React, { useEffect } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { Container } from "@material-ui/core";

import Navbar from "./components/layout/Navbar";
import Home from "./components/layout/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profile from "./components/layout/Profile";
import CreateProfile from "./components/layout/CreateProfile";
import EditProfile from "./components/layout/EditProfile";
import Trips from "./components/layout/Trips";
import CreateTrip from "./components/layout/CreateTrip";
import TripDetails from "./components/layout/TripDetails";
import NotFound from "./components/layout/NotFound";

import Error from "./components/layout/Error";

import PrivateRoute from "./components/routing/PrivateRoute";

import store from "./store";
import setAuthToken from "./helpers/setAuthToken";
import { loadUser } from "./actions/auth";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2196f3"
    },
    secondary: {
      main: "#f50057"
    }
  }
});

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <BrowserRouter>
            <Navbar />
            <Container component="main" maxWidth="sm">
              <Error />
            </Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/createProfile" component={CreateProfile} />
              <PrivateRoute path="/editProfile" component={EditProfile} />
              <Route path="/trips" component={Trips} />
              <Route path="/tripDetail/:id" component={TripDetails} />
              <PrivateRoute path="/createTrip" component={CreateTrip} />
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
        </MuiPickersUtilsProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
