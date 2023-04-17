import ParkCard from "./ParkCard";
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../App';
import {
    SimpleGrid,
    Box,
    Heading
} from '@chakra-ui/react';

function SavedParks({ savedParks }){

    const user = useContext(UserContext)
    
    const cards = savedParks.map(element => {
        return <ParkCard key={element.park_id} id={element.park_id} park={element.park} />
    })

    if (user.id === undefined) {
        return <h1>Loading...</h1>
    }

    return (
        <Box p="5px" margin="auto" w="80%" textAlign="center">
            <Heading margin="auto">Your Saved Parks</Heading>
            <SimpleGrid margin="auto" w="100%" spacing={2} minChildWidth="250px">
                {cards}
            </SimpleGrid>
        </Box>
    )
}

export default SavedParks;