import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Home from './home/Home';
import Signin from '../components/auth/Signin';
import Signup from '../components/auth/Signup';
import NewsSources from '../components/news/NewsSources';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
            <Navbar />
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/signin' component={Signin} />
              <Route path='/signup' component={Signup} />
              <Route path='/sources' component={NewsSources} />
            </Switch>
        </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
