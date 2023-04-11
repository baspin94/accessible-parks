import {
    Box, 
    Heading,
    Grid,
    UnorderedList,
} from '@chakra-ui/react';
import ReviewCard from './ReviewCard';

function ReviewPanel({ park }) {

    const reviews = park.reviews.map(element => {
        return <ReviewCard key={element.id}/>
    })

    return (
        <Box p="10px">
            <Heading as="h3" size="lg">Reviews</Heading>
            <UnorderedList>
                {reviews}
            </UnorderedList>
        </Box>
    )
}

export default ReviewPanel;