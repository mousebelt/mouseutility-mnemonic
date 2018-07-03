import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RoutesContainer from 'containers/RoutesContainer/RoutesContainer';

import 'assets/styles/App.less';

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <div className="content">
              <Switch>
                <Route path="/" component={RoutesContainer}/>
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
