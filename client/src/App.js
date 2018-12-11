import React, { Component } from 'react';
import LeadForm from './pages/LeadForm'
import Admin from './pages/Admin'
import AddAClass from './pages/AddAClass'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'



class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LeadForm} />
          <Route exact path="/admin/addAClass" component={AddAClass} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </Router>
    );
  }
}

export default App;
