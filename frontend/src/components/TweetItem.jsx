import { useDispatch } from 'react-redux';
import { deleteTweet } from '../features/tweets/tweetSlice';

const GoalItem = ({ tweet }) => {
  const dispatch = useDispatch();

  return (
    <div className='goal'>
      <h3>{tweet.tweetBody}</h3>
      <button
        className='close'
        onClick={() => dispatch(deleteTweet(tweet._id))}
      >
        X
      </button>
    </div>
  );
};

export default GoalItem;
