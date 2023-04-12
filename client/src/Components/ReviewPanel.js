import {
    Box, 
    Heading,
    UnorderedList,
    FormControl,
    FormLabel,
    Textarea,
    Select,
    Button,
    Stack
} from '@chakra-ui/react';
import ReviewCard from './ReviewCard';
import { UserContext } from '../App';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

function ReviewPanel({ reviews, setReviews }) {

    const review_cards = reviews.map(element => {
        return <ReviewCard key={element.id} review={element} reviewArray={reviews} setReviews={setReviews}/>
    })

    const user = useContext(UserContext)
    const params = useParams();
    const parkId = params['id'];

    const formSchema = yup.object().shape({
        review: yup.string().required("Review cannot be empty."),
        rating: yup.string().required("Must enter rating.")
    })

    const formik = useFormik({
        initialValues: {
            review: "",
            rating: ""
        },
        validationSchema: formSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values, { resetForm }) => {
            const submission = {
                user_id: user.id,
                park_id: parseInt(parkId),
                review: values.review,
                rating: parseInt(values.rating)
            }
            fetch('/reviews', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(submission)
            })
                .then(response => response.json())
                .then(reviewData => {
                    const updatedReviews = [...reviews, reviewData]
                    setReviews(updatedReviews)
                    resetForm({values: ""})
                })
        }
    })

    function review_create() {
        if (user.id !== undefined) {
            return(
                <form onSubmit={formik.handleSubmit}>
                    <FormLabel>Your Review</FormLabel>
                    <Textarea name="review" value={formik.values.review} onChange={formik.handleChange}/>
                    <FormLabel>Rating</FormLabel>
                    <Select name="rating" placeholder="--" value={formik.values.rating} onChange={formik.handleChange}>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                    </Select>
                    <Button type="submit">Submit</Button>
                </form>
            )
        } else {
            return <p>You must be logged in to leave a review.</p>
        }
    }

    const review_form = review_create()


    return (
        <Stack p='15px'>
            <Heading as="h3" size="lg">Reviews</Heading>
            <Box border='1px' p='10px'>
                {review_form}
            </Box>
            <Stack>
                {review_cards}
            </Stack>
        </Stack>
    )
}

export default ReviewPanel;