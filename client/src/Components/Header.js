import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { Heading, Flex, Spacer, HStack, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Header({ user, setUser }) {

    function handleLogout(){
        fetch('/logout', {
            method: "DELETE",
        })
            .then(setUser({}))
    }

    
    return (
        <Flex bg="green" p="20px">
            <Heading as="h1" color="white">Accessible Parks</Heading>
            <Spacer />
            <HStack>
                <ColorModeSwitcher />
                { user.id !== undefined
                    ? <Button onClick={handleLogout}>Log Out</Button>
                    : <Link to='/login'><Button>Log In</Button></Link>
                }
            </HStack>
        </Flex>
    )
    
}

export default Header;