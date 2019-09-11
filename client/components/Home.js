import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div id="home">
      <div className="container h-100">
        <div className="row align-items-center h-100">
          <div className="mx-auto text-center">
            <p id="bless-you">BLESS YOU !</p>
            <h1>INFINITE BLESSINGS GENERATOR</h1>
            <div id="click-continue">
              <Link className="text-center" to="form">
                CLICK HERE TO CONTINUE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
