import { UserContext } from '../App';
import { useContext, useState } from 'react';
import {
    Card,
    CardHeader,
    Heading,
    CardBody,
    CardFooter,
    Button,
    FormLabel,
    Textarea,
    Select,
    Text,
    Stack
} from '@chakra-ui/react';

import { useFormik } from 'formik';


function ReviewCard({ review, reviewArray, setReviews }) {
    const [editMode, setEditMode] = useState(false)
    
    const user = useContext(UserContext)

    const star = "⭐"
    const starRating = star.repeat(review.rating)
    
    const formik = useFormik({
        initialValues: {
            review: review.review,
            rating: String(review.rating)
        },
        onSubmit: (values) => {
            const update = {
                review: values.review,
                rating: parseInt(values.rating)
            }
            fetch(`/reviews/${review.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(update)
            })
            .then(response => response.json())
            .then(reviewData => {
                const updatedReviews = reviewArray.map(review => {
                    if (review.id === reviewData.id) {
                        return reviewData
                    } else {
                        return review
                    }
                }) 
                setReviews(updatedReviews)
            })
            .then(setEditMode(false))
        }
    })

    function toggleEdit() {
        setEditMode(!editMode)
    }

    function handleDelete() {
        fetch(`/reviews/${review.id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(() => {
                const updatedReviews = reviewArray.filter(element => element.id !== review.id)
                setReviews(updatedReviews)
            })
    }

    function review_edit() {
        if (editMode) {
            return(
                <form onSubmit={formik.handleSubmit}>
                    <FormLabel>Review</FormLabel>
                    <Textarea name="review" value={formik.values.review} onChange={formik.handleChange}/>
                    <FormLabel>Rating</FormLabel>
                    <Select name="rating" value={formik.values.rating} onChange={formik.handleChange}>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                    </Select>
                    <Button type="submit">Submit</Button>
                    <Button onClick={toggleEdit}>Cancel</Button>
                </form>
            )

        } else {
            return (
                <Stack>
                <CardHeader>
                    <Heading as="h4" size="sm">You</Heading>
                </CardHeader>
                <CardBody>
                    <Stack>
                        <Text><strong>Rating (Out of 5 Stars):</strong> {starRating}</Text>
                        <Text>{review.review}</Text>
                    </Stack>
                </CardBody>
                <CardFooter>
                    <Button onClick={toggleEdit}>Edit</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </CardFooter>
                </Stack>
            )
        }
    }

    const user_review = review_edit()

    const reviewer_name = review.user.first_name

    if (user.id === review.user_id) {
        return (
            <Card border='1px'>
                {user_review}
            </Card>
        )
    } else {
        return (
            <Card border='1px'>
                <CardHeader><Heading as="h4" size="sm">{reviewer_name}</Heading></CardHeader>
                <CardBody>
                    <Stack>
                        <Text><strong>Rating (Out of 5 Stars):</strong> {starRating}</Text>
                        <Text>{review.review}</Text>
                    </Stack>
                </CardBody>
            </Card>
        )
    }
}

export default ReviewCard;