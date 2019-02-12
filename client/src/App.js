import React, { Component } from "react";
import LeadForm from "./pages/LeadForm";
import Admin from "./pages/Admin";
import AddAClass from "./pages/AddAClass";
import ClassView from "./pages/ClassView";
import LeadView from "./pages/LeadView";
import Login from "./pages/login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

if (localStorage.jwtToken) {
  //set auth token in header
  setAuthToken(localStorage.jwtToken);
  //decode token
  const decoded = jwt_decode(localStorage.jwtToken);
  //set use and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={LeadForm} />
            <Route exact path="/login/" component={Login} />
            <Route exact path="/admin/addAClass" component={AddAClass} />
            <Route exact path="/admin/Classes" component={AddAClass} />
            <Route exact path="/admin/classes/:id" component={ClassView} />
            <Route exact path="/admin/leads/:id" component={LeadView} />
            <Route path="/admin" component={Admin} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
