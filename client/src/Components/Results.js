import ParkCard from "./ParkCard";
import {
    Button,
    Grid,
    Heading,
    Box,
    Text
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function Results({ parks }) {

    const cards = parks.map(park => {
        return <ParkCard key={park.id} id={park.id} park={park} />
    })

    return (
        <Box p="5px" margin="auto" w="80%" textAlign="center">
                <Heading margin="auto">Search Results</Heading>
                <Text><strong>{parks.length}</strong> parks matching your search criteria</Text>
                <Link exact to='/'>
                    <Button>Search Again</Button>
                </Link>
                <Grid p="20px" margin="auto" w="100%" templateColumns='repeat(3, 1fr)' gap={2}>
                    {cards}
                </Grid>
                <Link exact to='/'>
                    <Button>Search Again</Button>
                </Link>
        </Box>
    )
}

export default Results;