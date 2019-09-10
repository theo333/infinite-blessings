import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import BlessingsRequest from './components/BlessingsRequest';
import BlessingsNum from './components/BlessingsNum';
import Stats from './components/Stats';

export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/form" component={BlessingsRequest} />
        <Route exact path="/blessing" component={BlessingsNum} />
        <Route exact path="/stats" component={Stats} />
      </Switch>
    </Router>
  );
};
