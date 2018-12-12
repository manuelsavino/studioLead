import React, { Component } from 'react';
import LeadForm from './pages/LeadForm'
import Admin from './pages/Admin'
import AddAClass from './pages/AddAClass'
import ClassView from './pages/ClassView'
import LeadView from './pages/LeadView'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'



class App extends Component {
  render() {
    return <Router>
        <Switch>
          <Route exact path="/" component={LeadForm} />
          <Route exact path="/admin/addAClass" component={AddAClass} />
        <Route exact path="/admin/Classes" component={AddAClass} />
        <Route exact path="/admin/classes/:id" component={ClassView} />
        <Route exact path="/admin/leads/:id" component={LeadView} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </Router>;
  }
}

export default App;
