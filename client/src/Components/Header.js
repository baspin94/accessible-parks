import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { Heading, Spacer, HStack, Button, Text, Box, Stack } from '@chakra-ui/react';
import { Link, NavLink, useHistory } from 'react-router-dom';

function Header({ user, setUser }) {

    const history = useHistory()

    function handleLogout(){
        fetch('/api/logout', {
            method: "DELETE",
        })
            .then(() => {
                setUser({})
                history.push('/login')
            })
    }
    
    return (
        <Box bg="green" display={{md: "flex"}} p="10px">
            <Stack alignItems="center" p="5px" direction={{base: "column", md: "row"}}>
                <Heading as="h1" color="white" margin="auto">
                    Accessible Parks
                </Heading>
                    <NavLink exact to='/'>
                        <Text as ="b" color="white" p='10px'>
                            New Search
                        </Text>
                    </NavLink>
                    { user.id !== undefined
                        ? <NavLink to='/myparks'>
                            <Text as="b" color="white" p='10px'>
                                Saved Parks
                            </Text>
                        </NavLink>
                        : null
                    }
            </Stack>
            <Spacer/>
            <HStack justifyContent="center" p="5px">
                <ColorModeSwitcher />
                { user.id !== undefined
                    ? <Button onClick={handleLogout} bg="white" color="black">
                        Log Out
                    </Button>
                    : <Link to='/login'>
                        <Button bg="white" color="black">
                            Log In
                        </Button>
                    </Link>
                }
            </HStack>
        </Box>
    )
    
}

export default Header;