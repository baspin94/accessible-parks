import {
    Box, 
    Heading,
    SimpleGrid,
    UnorderedList,
    ListItem
} from '@chakra-ui/react';

function AmenitiesPanel({ park }) {

    const amenities = park.park_amenities.map(element => {
        return <ListItem key={element.amenity.id}>{element.amenity.name}</ListItem>
    })

    return (
        <Box p="10px" border='1px' w={{lg: "50%"}} margin='10px'>
            <Heading as="h3" size="lg">Amenities</Heading>
            <UnorderedList>
                <SimpleGrid
                    minChildWidth='300px'
                    spacing='5px'
                >
                    {amenities}
                </SimpleGrid>
            </UnorderedList>
        </Box>
    )
}

export default AmenitiesPanel;