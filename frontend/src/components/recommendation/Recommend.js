import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Avatar,
  Wrap,
  WrapItem,
  Link,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

const WrapItemComp = ({ children }) => {
  return (
    <WrapItem fontSize='xs' lineHeight='0.75' px='0.5'>
      {children}
    </WrapItem>
  );
};

const Recommend = () => {
  const footerItems = [
    'Terms of Service',
    'Privacy Policy',
    'Cookie Policy',
    'Accessibility',
    'Ads info',
    'More',
    'Ⓒ 2022 Twitter, Inc',
  ];

  return (
    <Flex
      flexDir='column'
      borderLeftWidth='1px'
      bg='white'
      maxW='300px'
      h='100vh'
    >
      {/* Search Bar */}
      <Flex justify='center' align='center' p='3'>
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            children={<FiSearch color='gray.300' />}
          />
          <Input
            placeholder='Search Twitter'
            variant='filled'
            borderRightRadius='25px'
            borderLeftRadius='25px'
          />
        </InputGroup>
      </Flex>

      {/* Relevant People */}
      <Box p='3'>
        <Flex flexDir='column' borderWidth='1px' borderRadius='8px' p='2'>
          <Text>Relevant people</Text>

          <Flex px='2' my='2'>
            {/* Column 1 */}
            <Avatar src='https://bit.ly/broken-link' />
            {/* Column 2 */}
            <Box pl='2'>
              <Box>Zaar.eth</Box>
              <Box>@zaarnft</Box>
            </Box>
          </Flex>

          <Flex px='2' my='2'>
            {/* Column 1 */}
            <Avatar src='https://bit.ly/broken-link' />
            {/* Column 2 */}
            <Box pl='2'>
              <Box>Hoopha.eth</Box>
              <Box>@lolhoopha</Box>
            </Box>
          </Flex>
        </Flex>
      </Box>

      {/* Whats Happening */}
      <Box p='3'>
        <Flex
          flexDir='column'
          borderWidth='1px'
          borderRadius='8px'
          p='2'
          bg='#36393B'
          color='white'
          opacity='0.9'
        >
          <Box mb='4'>
            <Text fontWeight='bold' fontSize='lg'>
              What's happening
            </Text>
          </Box>

          <Box my='2'>Something fjla fha fbauut lyli8 wi</Box>
          <Box my='2'>Something aliu ao8uyalia aagay lteklr ghbajk utk</Box>
          <Box my='2'>Somethingf ahsua wb</Box>
          <Box my='2'>
            Something ghao tghwj agfal wh gms ajhavekn kjahv uaqtl avajhv
            takghjg
          </Box>
        </Flex>
      </Box>

      {/* Recommendation Footer */}
      <Wrap p='1' px='5' wrap='row'>
        {footerItems.map((content) => (
          <WrapItemComp children={<Link>{content}</Link>} />
        ))}
      </Wrap>
    </Flex>
  );
};

export default Recommend;
