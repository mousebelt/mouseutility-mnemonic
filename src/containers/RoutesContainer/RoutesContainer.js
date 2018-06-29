import React, { PureComponent } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import TokenListContainer from 'containers/TokenListContainer/TokenListContainer';

class RoutesContainer extends PureComponent {

  componentWillMount() {
  }

  componentWillReceiveProps(newProps) {
  }

  render () {
    return (
      <Switch>
        <Route exact path="/" component={TokenListContainer}/>
        <Redirect to="/404"/>
      </Switch>
    )
  }
}

export default RoutesContainer;