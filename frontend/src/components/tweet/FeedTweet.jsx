import { Box, Flex, Avatar, Text, Button, Icon } from '@chakra-ui/react';
import { AiOutlineRetweet, AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { FiShare } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { likeTweet } from '../../features/tweets/tweetSlice';

const FeedTweet = ({ tweet }) => {
  const dispatch = useDispatch();

  const tweetLike = () => {
    dispatch(likeTweet(tweet._id));
  };

  return (
    <Flex borderBottomWidth='1px' py='2'>
      <Avatar src='https://bit.ly/broken-link' mx='2' />

      <Box w='100%'>
        <Flex>
          <Text mr='1' fontWeight='bold'>
            {tweet.author}
          </Text>
          <Text mr='1'>{`@${tweet.author}`}</Text>
          <Text>· 3h</Text>
          <Text ml='auto'>···</Text>
        </Flex>

        <Box>
          <Text>{tweet?.tweetBody}</Text>
        </Box>

        <Flex justify='space-between' align='center' w='80%' ml='-2'>
          <Button variant='ghost' display='flex'>
            <Icon as={FaRegComment} />
          </Button>

          <Button variant='ghost' display='flex'>
            <Icon as={AiOutlineRetweet} />
          </Button>

          <Button variant='ghost' display='flex' onClick={tweetLike}>
            <Icon as={AiOutlineHeart} />
            {tweet.numberOfLikes}
          </Button>

          <Button variant='ghost' display='flex'>
            <Icon as={FiShare} />
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default FeedTweet;
