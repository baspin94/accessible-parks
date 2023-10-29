import {
    Heading,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Textarea,
    Select,
    Button,
    Stack,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import ReviewCard from './ReviewCard';
import { UserContext } from '../App';
import { useFormik } from 'formik';
import { useContext } from 'react';
import * as yup from 'yup';

function ReviewPanel({ park, reviews, setReviews }) {

    const review_cards = reviews.map(element => {
        return <ReviewCard key={element.id} review={element} reviewArray={reviews} setReviews={setReviews}/>
    })

    const user = useContext(UserContext)

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
                park_id: park.id,
                park_code: park.code,
                review: values.review,
                rating: parseInt(values.rating)
            }
            fetch('/api/reviews', {
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
                    <FormControl isInvalid={formik.errors['review']}>
                    <FormLabel>Your Review
                        <Textarea mt='10px' name="review" value={formik.values.review} onChange={formik.handleChange}/>
                    <FormErrorMessage>{formik.errors['review']}</FormErrorMessage>
                    </FormLabel>
                    </FormControl>
                    <FormControl isInvalid={formik.errors['rating']}>
                    <FormLabel>Rating
                        <Select mt='10px' name="rating" placeholder="--" value={formik.values.rating} onChange={formik.handleChange}>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </Select>
                    <FormErrorMessage>{formik.errors['rating']}</FormErrorMessage>
                    </FormLabel>
                    </FormControl>
                    <Button colorScheme="orange" border='1px' background="green" color="white" type="submit">Submit</Button>
                </form>
            )
        } else {
            return (
                <Alert status='warning'>
                    <AlertIcon />
                    You must be logged in to leave a review.
                </Alert>
            )
        }
    }

    const review_form = review_create()


    return (
        <Stack p='10px' border='1px' w={{lg: "50%"}} margin='10px'>
            <Heading as="h3" size="lg">Reviews</Heading>
                {review_form}
            <Stack>
                {review_cards}
            </Stack>
        </Stack>
    )
}

export default ReviewPanel;