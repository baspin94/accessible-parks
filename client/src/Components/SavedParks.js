import ParkCard from "./ParkCard";
import { useContext } from 'react';
import { UserContext } from '../App';
import {
    SimpleGrid,
    Box,
    Heading
} from '@chakra-ui/react';

function SavedParks(){

    const user = useContext(UserContext)

    if (user.id === undefined) {
        return <h1>Loading...</h1>
    }
    
    const cards = user.parks.map(element => {
        return <ParkCard key={element.park_id} id={element.park_id} park={element.park} />
    })

    return (
        <Box p="5px" margin="auto" w="90%" textAlign="center">
            <Heading p='5px' margin="auto">Your Saved Parks</Heading>
            <SimpleGrid p='5px' margin="auto" w="100%" spacing={2} minChildWidth="300px">
                {cards}
            </SimpleGrid>
        </Box>
    )
}

export default SavedParks;