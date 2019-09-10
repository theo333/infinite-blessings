import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default props => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  // only for testing form
  useEffect(() => {
    // console.log('name: ', name);
    // console.log('comment: ', comment);
  });

  const handleSubmit = ev => {
    ev.preventDefault();
    const blessing = {
      name,
      comment,
    };

    axios
      .post('/api/blessings', blessing)
      .then(() => props.history.push('/blessing'))
      .catch(err => {
        console.log(err);
      });
  };

  // const getQuestions = () => {

  // };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div id="blessings-form" className="col-md-8">
          <p>Leave a comment and write your name to receive blessings</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                name="name"
                value={name}
                className="form-control"
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Comment</label>
              <textarea
                className="form-control"
                rows="6"
                name="comment"
                value={comment}
                placeholder="question goes here"
                onChange={e => setComment(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
