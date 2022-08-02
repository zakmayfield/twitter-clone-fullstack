import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTweets } from '../features/tweets/tweetSlice';
import MenuDrawer from '../components/menu/MenuDrawer';
import Recommend from '../components/recommendation/Recommend';
import { Flex } from '@chakra-ui/react';
import Feed from '../components/Feed'

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

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
      <Recommend />
    </Flex>
  );
};

export default Dashboard;
