import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTweets } from '../features/tweets/tweetSlice';
import TweetForm from '../components/TweetForm';
import TweetItem from '../components/TweetItem';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { tweets } = useSelector((state) => state.tweets);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    dispatch(getTweets());
  }, [user, navigate, dispatch]);

  return (
    <>
      <section>
        <h1>Welcome {user && user.username}</h1>
        <p>Tweet Dashboard</p>
      </section>

      <TweetForm />

      <section className='content'>
        {tweets.length !== 0 ? (
          <div className='goals'>
            {tweets.map((tweet) => (
              <TweetItem tweet={tweet} key={tweet._id} />
            ))}
          </div>
        ) : (
          <h3>Please make some goals</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
