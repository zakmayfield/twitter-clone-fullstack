import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTweets } from '../features/tweets/tweetSlice';
// import TweetForm from '../components/TweetForm';
// import TweetItem from '../components/TweetItem';
// import TweetLarge from '../components/tweet/TweetLarge';
import MenuDrawer from '../components/menu/MenuDrawer';
import Recommend from '../components/recommendation/Recommend';
import { Flex } from '@chakra-ui/react';
import Feed from '../components/Feed'

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  // const { tweets } = useSelector((state) => state.tweets);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    dispatch(getTweets());
  }, [user, navigate, dispatch]);

  return (
    <Flex justify='center'>
      <MenuDrawer />
      <Feed  />
      {/* <TweetLarge /> */}
      <Recommend />

      {/* <section>
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
      </section> */}
    </Flex>
  );
};

export default Dashboard;
