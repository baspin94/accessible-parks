import {
    Box, 
    Heading,
    UnorderedList,
} from '@chakra-ui/react';
import ReviewCard from './ReviewCard';

function ReviewPanel({ reviews, setReviews }) {

    const review_cards = reviews.map(element => {
        return <ReviewCard key={element.id} review={element} reviewArray={reviews} setReviews={setReviews}/>
    })

    return (
        <Box p="10px">
            <Heading as="h3" size="lg">Reviews</Heading>
            <UnorderedList>
                {review_cards}
            </UnorderedList>
        </Box>
    )
}

export default ReviewPanel;