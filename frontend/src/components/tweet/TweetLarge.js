import { Avatar, Box, Flex, Text, Icon, Button, Input } from '@chakra-ui/react';
import { AiOutlineRetweet, AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment, FaArrowLeft } from 'react-icons/fa';
import { FiShare } from 'react-icons/fi';
import Moment from 'moment';
import { useState } from 'react';

const TweetLarge = () => {
  const [input, setInput] = useState('');
  const formatDate = Moment().format('h:mm a · MMM Do, YY');

  const submit = () => {
    setInput('');
  };

  return (
    // Full Tweet
    <Box p='1' mx='2' bg='white' maxW='xl' minW='xl'>
      {/* Back Arrow */}
      <Flex p='2' pl='0' align='center'>
        <Button
          borderRadius='50%'
          w='40px'
          h='40px'
          variant='ghost'
          display='flex'
        >
          <Icon as={FaArrowLeft} />
        </Button>
        <Text ml='4' fontWeight='semibold' fontSize='lg'>
          Tweet
        </Text>
      </Flex>

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
          Lorem Ipsum has been 
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
        <Button variant='ghost' display='flex'>
          <Icon as={FaRegComment} />
        </Button>

        <Button variant='ghost' display='flex'>
          <Icon as={AiOutlineRetweet} />
        </Button>

        <Button variant='ghost' display='flex'>
          <Icon as={AiOutlineHeart} />
        </Button>

        <Button variant='ghost' display='flex'>
          <Icon as={FiShare} />
        </Button>
      </Flex>

      {/* Reply */}
      <Flex borderBottomWidth='1px' align='center' pl='0' py='2'>
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

export default TweetLarge;
