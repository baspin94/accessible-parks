import {
    Box, 
    Heading,
    Grid,
    UnorderedList,
} from '@chakra-ui/react';

function ReviewPanel({ park }) {
    return (
        <Box p="10px">
            <Heading as="h3" size="lg">Reviews</Heading>
            <UnorderedList>
                
            </UnorderedList>
        </Box>
    )
}

export default ReviewPanel;