import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default () => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    // console.log('name: ', name);
    // console.log('comment: ', comment);
  });

  const handleSubmit = ev => {
    // const { name, comment } = ev.target.value;
    const blessing = {
      name,
      comment,
    };
    console.log('blessing ', blessing);

    ev.preventDefault();
    axios
      .post('/api/blessings', blessing)
      .then(resp => console.log(resp.data))
      .catch(err => {
        console.log(err);
      });
  };

  // const getQuestions = () => {

  // };

  return (
    <div id="blessings-form">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="name">Name</label>
          <input name="name" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="row">
          <label htmlFor="name">Comment</label>
          <textarea
            className="form-control"
            rows="6"
            name="comment"
            value={comment}
            placeholder="test"
            onChange={e => setComment(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
