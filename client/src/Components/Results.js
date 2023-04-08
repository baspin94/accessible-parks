import ParkCard from "./ParkCard";
import {
    Grid,
    Heading,
    Stack,
    Box
} from '@chakra-ui/react'

function Results({ parks }) {

    const cards = parks.map(park => {
        return <ParkCard key={park.id} park={park} />
    })

    return (
    <>
        
        <Box margin="auto" w="80%" textAlign="center">
            
                <Heading margin="auto">Search Results</Heading>
                <Grid p="20px" margin="auto" w="100%" templateColumns='repeat(3, 1fr)' gap={2}>
                    {cards}
                </Grid>
        </Box>
        
        
        
    </>
    )
    
}

export default Results;