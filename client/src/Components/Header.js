import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { Heading, Flex, Spacer, HStack, Button, Text } from '@chakra-ui/react';
import { Link, NavLink, useHistory } from 'react-router-dom';

function Header({ user, setUser }) {

    const history = useHistory()

    function handleLogout(){
        fetch('/logout', {
            method: "DELETE",
        })
            .then(() => {
                setUser({})
                history.push('/login')
            })
    }
    
    return (
        <Flex bg="green" p="20px">
            <HStack>
                <Heading as="h1" color="white">Accessible Parks</Heading>
                <Spacer />
                <NavLink exact to='/'>
                    <Text as ="b" p='10px' color="white">New Search</Text>
                </NavLink>
                { user.id !== undefined
                    ? <NavLink to='/myparks'><Text as="b" p='10px' color="white">Saved Parks</Text></NavLink>
                    : null
                }
            </HStack>
            <Spacer/>
            <HStack>
                <ColorModeSwitcher />
                { user.id !== undefined
                    ? <Button bg="white" color="black" onClick={handleLogout}>Log Out</Button>
                    : <Link to='/login'><Button bg="white" color="black">Log In</Button></Link>
                }
            </HStack>
        </Flex>
    )
    
}

export default Header;