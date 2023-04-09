import {
    Box, 
    Heading,
    Grid,
    UnorderedList,
    ListItem
} from '@chakra-ui/react';

function AmenitiesPanel({ park }) {

    const amenities = park.park_amenities.map(element => {
        return <ListItem key={element.amenity.id}>{element.amenity.name}</ListItem>
    })

    return (
        <Box p="10px">
            <Heading as="h3" size="lg">Amenities</Heading>
            <UnorderedList>
                <Grid templateColumns='repeat(2, 1fr)'>
                {amenities}
                </Grid>
            </UnorderedList>
        </Box>
    )
}

export default AmenitiesPanel;