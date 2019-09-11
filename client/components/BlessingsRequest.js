import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default props => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [question, setQuestion] = useState('');

  const getRandomQuestion = () => {
    return axios
      .get('/api/question')
      .then(resp => resp.data)
      .then(question => setQuestion(question.name))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    // go to home page after 90 seconds
    setTimeout(() => {
      props.history.push('/');
    }, 60000);
  });

  useEffect(() => {
    getRandomQuestion();
  }, [question]);

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

  return (
    <div id="form-page" className="container h-100">
      <div className="row align-items-center h-100">
        <div id="blessings-form" className="mx-auto">
          <p id="form-instructions">Write Your Name and Leave a Comment to Receive Blessings</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">NAME: </label>
              <input
                className="form-control"
                name="name"
                value={name}
                required
                placeholder="max 20 characters"
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="comment">COMMENT: </label>
              <textarea
                className="form-control"
                rows="3"
                name="comment"
                value={comment}
                required
                placeholder="What's on your mind?" // {question}
                onChange={e => setComment(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-ok">
                OK
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
