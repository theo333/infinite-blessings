import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home';
import BlessingsRequest from './components/BlessingsRequest';

export default () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/form" component={BlessingsRequest} />
    </Router>
  );
};
