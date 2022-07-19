import { Box, Flex, Avatar, Input, Button, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTweet } from '../features/tweets/tweetSlice';


const FeedInput = () => {
    const [tweetBody, setTweetBody] = useState('');
      const dispatch = useDispatch();
      const { isLoading } = useSelector((state) => state.tweets);

  const submit = (e) => {
    e.preventDefault();
    if (!isLoading) {
      dispatch(createTweet({ tweetBody }));
    }
    setTweetBody('');
  };

  return (
    <Box borderBottomWidth='1px' pb='3' mt='3' p='2'>
      <Flex flexDir='column' pt='2'>
        <Flex mb='5'>
          <Avatar src='https://bit.ly/broken-link' />

          <Input
            pl='2'
            variant='unstyled'
            placeholder={`What's happening?`}
            value={tweetBody}
            onChange={(e) => setTweetBody(e.target.value)}
          />
        </Flex>

        <Flex justify='space-between' align='center' pl='35px'>
          <Flex
            justify='space-between'
            align='center'
            w='40%'
          >
            <Box>IM</Box>
            <Box>GA</Box>
            <Box>IM</Box>
            <Box>GA</Box>
            <Box>IM</Box>
            <Box>GA</Box>
          </Flex>

          <Button
            colorScheme='twitter'
            borderRightRadius='20px'
            borderLeftRadius='20px'
            w='75px'
            disabled={tweetBody ? false : true}
            onClick={submit}
          >
            <Text fontSize='sm' fontWeight='semibold'>
              Tweet
            </Text>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default FeedInput;
