import { Avatar, Box, Flex, Text, Icon, Button, Input } from '@chakra-ui/react';
import { AiOutlineRetweet, AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { FiShare } from 'react-icons/fi';
import Moment from 'moment';
import { useState } from 'react';

const TweetSmall = () => {
  const [input, setInput] = useState('');
  const formatDate = Moment().format('h:mm a · MMM Do, YY');

  const submit = () => {
    setInput('');
  };

  return (
    // Full Tweet
    <Box boxShadow='xs' p='1' m='5' rounded='md' bg='white' maxW='lg' minW='sm'>
      {/* Avatar / Display Name / @ Username */}
      <Flex align='center'>
        {/* Column 1 */}
        <Avatar src='https://bit.ly/broken-link' />
        {/* Column 2 */}
        <Box pl={2}>
          <Box>Zaar.eth</Box>
          <Box>@zaarnft</Box>
        </Box>
        {/* Column 3 */}
        <Text ml='auto' mb='auto' cursor='pointer'>
          ...
        </Text>
      </Flex>

      {/* Tweet Body */}
      <Box p='1' pt='2'>
        <Text lineHeight='5' fontWeight='semibold'>
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown
        </Text>
      </Box>

      {/* Date */}
      <Box borderBottomWidth='1px' p='1' pb='2'>
        <Text fontSize='xs'>{formatDate}</Text>
      </Box>

      {/* Tweet Engagements */}
      <Flex borderBottomWidth='1px' p='1' py='2'>
        <Flex fontSize='xs'>
          <Text fontWeight='bold' mr='0.5'>
            {7}
          </Text>
          retweets
        </Flex>
        <Flex fontSize='xs' mx='3'>
          <Text fontWeight='bold' mr='0.5'>
            {16}
          </Text>
          likes
        </Flex>
        <Flex fontSize='xs'>
          <Text fontWeight='bold' mr='0.5'>
            {3}
          </Text>
          quote tweets
        </Flex>
      </Flex>

      {/* Tweet CTAs */}
      <Flex
        borderBottomWidth='1px'
        py='0.5'
        justify='space-around'
        align='center'
      >
        <Button variant='unstyled' display='flex'>
          <Icon as={FaRegComment} />
        </Button>

        <Button variant='unstyled' display='flex'>
          <Icon as={AiOutlineRetweet} />
        </Button>

        <Button variant='unstyled' display='flex'>
          <Icon as={AiOutlineHeart} />
        </Button>

        <Button variant='unstyled' display='flex'>
          <Icon as={FiShare} />
        </Button>
      </Flex>

      {/* Reply */}
      <Flex align='center' pl='0' pt='2'>
        <Avatar src='https://bit.ly/broken-link' />

        <Input
          pl='2'
          variant='unstyled'
          placeholder='Tweet your reply'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <Button
          colorScheme='twitter'
          borderRightRadius='17px'
          borderLeftRadius='17px'
          minWidth='75px'
          height='35px'
          disabled={input ? false : true}
          onClick={submit}
        >
          <Text fontSize='sm' fontWeight='semibold'>
            Reply
          </Text>
        </Button>
      </Flex>
    </Box>
  );
};

export default TweetSmall;
