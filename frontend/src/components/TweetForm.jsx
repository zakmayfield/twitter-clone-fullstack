import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTweet } from '../features/tweets/tweetSlice';

const TweetForm = () => {
  const [tweetBody, setTweetBody] = useState('');

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.tweets);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isLoading) {
      dispatch(createTweet({ tweetBody }));
    }
    setTweetBody('');
  };

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='tweet'>Tweet</label>
          <input
            type='text'
            name='tweet'
            id='tweet'
            value={tweetBody}
            placeholder='Become a fullstack dev'
            onChange={(e) => setTweetBody(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button
            className={`btn btn-block ${isLoading ? 'btn-loading' : ''}`}
            type='submit'
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default TweetForm;
