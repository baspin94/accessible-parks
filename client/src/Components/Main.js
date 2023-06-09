import {
    Checkbox,
    Heading,
    Grid,
    Button,
    Stack,
    Box,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription, 
    FormControl
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom'

function Main({ user, setParks }) {
    const [amenities, setAmenities] = useState([])
    const [searchError, setSearchError] = useState(false)

    const history = useHistory()

    useEffect( () => {
        fetch('/amenities')
            .then(response => response.json())
            .then(amenityData => setAmenities(amenityData.sort((a1, a2) => (a1.name > a2.name) ? 1 : -1)))
    }, [])

    const formik = useFormik({
        initialValues: {
            checked: []
        },
        onSubmit: (values, {resetForm}) => {
            const value_array = values['checked']
            const value_string = value_array.join()
            fetch(`/parkamenities/${value_string}`)
            .then(response => {
                if (response.ok) {
                    response.json()
                    .then(parkData => setParks(parkData))
                    .then(() => history.push('/results'))
                } else {
                    response.json()
                    .then(error => 
                        setSearchError(true),
                        resetForm({values: values})
                        )
                }
            })
        }
    })

    const checkboxes = amenities.map( (amenity) => {
        return (
            <Checkbox
                p='2px'
                size='lg' 
                border='1px'
                colorScheme='green'
                _hover={{borderColor: 'green.500'}}
                key={amenity.id}
                name="checked"
                onChange={formik.handleChange}
                value={amenity.id}
            >
                {amenity.name}
            </Checkbox>
        )
    })

    return (
        <>
            <Heading p="20px">
                {
                (user.first_name !== undefined)
                    ? `Welcome, ${user.first_name}!`
                    : 'Welcome!'
                }
            </Heading>
            <Stack margin="auto" w="80%">
                <Heading margin="auto">Search By Amenities</Heading>
                {searchError 
                    ?   <Alert status='error' flexDirection='column'>
                            <AlertIcon/>
                            <AlertTitle>Search Unsuccessful.</AlertTitle>
                            <AlertDescription textAlign='center'>No parks with all specified amenities were found.<br/>Please try removing some criteria and search again.</AlertDescription>
                        </Alert>
                    : null
                }
            <form onSubmit={formik.handleSubmit}>
                <FormControl isDisabled={formik.isSubmitting}>
                <Grid margin="auto" templateColumns='repeat(3, 1fr)' gap={2} justifyContent="center">
                    {checkboxes}
                </Grid>
                <Box w="20%" margin="auto">
                    <Button isDisabled={formik.isSubmitting} colorScheme="orange" mt='10px' border='1px' background="green" color="white" type="submit" width="full">{formik.isSubmitting ? "Loading Results..." : "Search"}</Button>
                </Box>
                </FormControl>
            </form>
            </Stack>
        </>
    )
}

export default Main