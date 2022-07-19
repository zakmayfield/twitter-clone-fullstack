import { Flex, Button, Icon, Text } from '@chakra-ui/react';

const MenuItem = ({ menuItem }) => {
  return (
    <Flex
      align='center'
      maxW='xs'
      justify={{ base: 'center', xl: 'flex-start' }}
    >
      {/* Desktop */}
      <Button
        display={{ base: 'none', xl: 'flex' }}
        leftIcon={
          <Icon w='6' h='6' mr={{ base: '0', xl: '3' }} as={menuItem.icon} />
        }
        variant='ghost'
        m='1'
      >
        <Text display={{ base: 'none', xl: 'block' }}>
          {menuItem.textContent}
        </Text>
      </Button>

      {/* Mobile */}
      <Button
        display={{ base: 'block', xl: 'none' }}
        variant='ghost'
        // m='1'
        my='1'
        // mx='auto'
      >
        <Icon w='6' h='6' as={menuItem.icon} />
      </Button>
    </Flex>
  );
};

export default MenuItem;
