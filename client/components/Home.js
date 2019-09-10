import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="text-center">
      <h1>
        BLESS YOU!
        <br />
        <span>Infinite Blessings Generator</span>
      </h1>
      <Link className="text-center" to="form">
        Click Here to Continue
      </Link>
    </div>
  );
};
