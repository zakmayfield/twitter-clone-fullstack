import { Box } from '@chakra-ui/react';
import FeedInput from './FeedInput';
import { useSelector } from 'react-redux';
import FeedTweet from './tweet/FeedTweet';

const Feed = () => {
  const { tweets } = useSelector((state) => state.tweets);

  return (
    <Box maxW='xl' minW={{ base: 'sm', lg: 'xl' }}  maxH='100vh' overflowY='scroll'>
      <FeedInput />

      {tweets.length !== 0 &&
        tweets.map((tweet) => <FeedTweet tweet={tweet} key={tweet._id} />)}
    </Box>
  );
};

export default Feed;
