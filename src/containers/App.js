import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { store } from 'core';
import RoutesContainer from 'containers/RoutesContainer/RoutesContainer';
import PageNotFound from 'components/PageNotFound/PageNotFound';

import 'assets/styles/App.less';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
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
