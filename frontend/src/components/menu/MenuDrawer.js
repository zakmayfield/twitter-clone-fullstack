import MenuItem from './MenuItem';
import {
  Box,
  Icon,
  Button,
  Flex,
  Avatar,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';
import {
  AiOutlineHome,
  AiOutlineBell,
  AiOutlineMail,
  AiOutlineFire,
} from 'react-icons/ai';
import { CgHashtag, CgMoreO } from 'react-icons/cg';
import { BsBookmark, BsPerson } from 'react-icons/bs';
import { FaTwitter, FaFeatherAlt, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, reset } from '../../features/auth/authSlice';

const MenuDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const menuItems = [
    {
      type: 'home',
      icon: AiOutlineHome,
      textContent: 'Home',
    },
    {
      type: 'explore',
      icon: CgHashtag,
      textContent: 'Explore',
    },
    {
      type: 'notifications',
      icon: AiOutlineBell,
      textContent: 'Notifications',
    },
    {
      type: 'messages',
      icon: AiOutlineMail,
      textContent: 'Messages',
    },
    {
      type: 'bookmarks',
      icon: BsBookmark,
      textContent: 'Bookmarks',
    },
    {
      type: 'articles',
      icon: AiOutlineFire,
      textContent: 'Top Articles',
    },
    {
      type: 'profile',
      icon: BsPerson,
      textContent: 'Profile',
    },
    {
      type: 'more',
      icon: CgMoreO,
      textContent: 'More',
    },
  ];

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <Flex
      flexDir='column'
      borderRightWidth='1px'
      bg='white'
      minW={{ base: '75px', xl: '225px' }}
      h='100vh'
    >
      {/* Header */}
      <Flex align='center' justify={{ base: 'center', xl: 'flex-start' }} p='2'>
        <Icon w='6' h='6' ml={{ xl: '3' }} as={FaTwitter} />
      </Flex>

      {/* Menu Items */}
      <Box>
        {menuItems.map((item) => {
          return <MenuItem key={item.type} menuItem={item} />;
        })}
      </Box>

      {/* Tweet Button */}
      <Flex align='center' justify='center' my='4'>
        <Button
          onClick={onOpen}
          borderRightRadius={{ base: '50%', xl: '30px' }}
          borderLeftRadius={{ base: '50%', xl: '30px' }}
          h={{ base: '50px' }}
          w={{ base: '50px', xl: '90%' }}
          colorScheme='twitter'
          fontSize='sm'
          fontWeight='bold'
          size='lg'
        >
          <Text display={{ base: 'none', xl: 'block' }}>Tweet</Text>
          <Icon display={{ base: 'block', xl: 'none' }} as={FaFeatherAlt} />
        </Button>
      </Flex>

      {/* Tweet Form Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton ml='4' left='0' justifyContent='center'/>
          <ModalBody>
            Modal
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Menu Footer */}
      <Flex
        align='center'
        m={{ base: '0 auto' }}
        mt='auto'
        pb='5'
        w={{ base: '', xl: '100%' }}
        p='2'
      >
        {/* Column 1 */}
        <Avatar src='https://bit.ly/broken-link' />
        {/* Column 2 */}
        <Box pl={2} display={{ base: 'none', xl: 'block' }}>
          <Box>{user?.username}</Box>
          <Box>{`@${user?.username}`}</Box>
        </Box>
        {/* Column 3 */}
        <Text
          ml='auto'
          mb='auto'
          cursor='pointer'
          display={{ base: 'none', xl: 'block' }}
        >
          ...
        </Text>
      </Flex>

      {/* temp logout button */}
      <Flex align='center' justify='center' my='4'>
        <Button
          // w='90%'
          borderRightRadius={{ base: '50%', xl: '30px' }}
          borderLeftRadius={{ base: '50%', xl: '30px' }}
          h={{ base: '50px' }}
          w={{ base: '50px', xl: '90%' }}
          colorScheme='twitter'
          fontSize='sm'
          fontWeight='bold'
          size='lg'
          onClick={onLogout}
          display='flex'
        >
          <Icon as={FaSignOutAlt} mr={{ base: '', xl: 2 }} />
          <Text display={{ base: 'none', xl: 'block' }}>Logout</Text>
        </Button>
      </Flex>
    </Flex>
  );
};

export default MenuDrawer;
