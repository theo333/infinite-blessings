import React, { useState, useEffect } from 'react';

export default () => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    console.log('name: ', name);
    console.log('comment: ', comment);
  });

  return (
    <div id="blessings-form">
      <form>
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
            onChange={e => setComment(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};
