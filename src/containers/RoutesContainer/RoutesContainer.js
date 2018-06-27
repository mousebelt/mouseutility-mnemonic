import React, { PureComponent } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import DashboardContainer from 'containers/DashboardContainer/DashboardContainer';

class RoutesContainer extends PureComponent {

  componentWillMount() {
  }

  componentWillReceiveProps(newProps) {
  }

  render () {
    return (
      <Switch>
        <Route exact path="/" component={DashboardContainer}/>
        <Redirect to="/404"/>
      </Switch>
    )
  }
}

export default RoutesContainer;