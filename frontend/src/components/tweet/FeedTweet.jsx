import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { AiOutlineRetweet, AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment, FaTrash } from 'react-icons/fa';
import { FiShare } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { likeTweet, deleteTweet } from '../../features/tweets/tweetSlice';

const FeedTweet = ({ tweet }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const tweetLike = () => {
    dispatch(likeTweet(tweet._id));
  };

  const tweetDelete = () => {
    dispatch(deleteTweet(tweet._id));
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
          <Box ml='auto' mr='2'>
            <Menu position='relative'>
              <MenuButton>...</MenuButton>
              <MenuList position='absolute' left='-207px' top='-20px'>
                {tweet?.user === user?._id && (
                  <MenuItem icon={<FaTrash />} onClick={tweetDelete}>
                    Delete
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
          </Box>
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
