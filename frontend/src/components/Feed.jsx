import { Box } from '@chakra-ui/react';
import FeedInput from './FeedInput';
import { useSelector } from 'react-redux';
import TweetItem from '../components/TweetItem';

const Feed = () => {
  const { tweets } = useSelector((state) => state.tweets);
  return (
    <Box maxW='xl' minW={{ base: 'sm', lg: 'xl' }} borderWidth='1px'>
      <FeedInput />

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
    </Box>
  );
};

export default Feed;
