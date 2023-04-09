import {
    Box, 
    Heading, 
    Text,
    UnorderedList,
    ListItem
} from '@chakra-ui/react';

function AmenitiesPanel({ park }) {

    const amenities = park.park_amenities.map(element => {
        return <ListItem key={element.amenity.id}>{element.amenity.name}</ListItem>
    })

    return (
        <Box>
            <Heading as="h3">Accessibility-Related Amenities</Heading>
            <UnorderedList>
                {amenities}
            </UnorderedList>
        </Box>
    )
}

export default AmenitiesPanel;