import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { Heading, Flex, Spacer, HStack, Button } from '@chakra-ui/react'

function Header() {
    return (
        <Flex bg="green" p="20px">
            <Heading as="h1" color="white">Accessible Parks</Heading>
            <Spacer />
            <HStack>
                <ColorModeSwitcher />
                <Button>Log Out</Button>
            </HStack>

            
        </Flex>
    )
    
}

export default Header;