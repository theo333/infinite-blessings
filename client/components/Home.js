import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <Fragment>
      <h1>
        BLESS YOU!
        <br />
        <span>Infinite Blessings Generator</span>
      </h1>
      <Link to="form">Click Here to Continue</Link>
    </Fragment>
  );
};
