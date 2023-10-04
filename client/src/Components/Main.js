import {
    Checkbox,
    Heading,
    SimpleGrid,
    Button,
    Stack,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription, 
    FormControl, 
    Flex
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
                key={amenity.id}
                name="checked"
                onChange={formik.handleChange}
                value={amenity.id}
                p="5px"
                size='lg'
                colorScheme='green'
                border='1px'
                borderRadius='10px'
                // _hover={{borderColor: 'green.500'}}
                
            >
                {amenity.name}
            </Checkbox>
        )
    })

    return (
        <>
            <Heading 
                as="h2"
                p="10px"
            >
                {
                (user.first_name !== undefined)
                    ? `Welcome, ${user.first_name}!`
                    : 'Welcome!'
                }
            </Heading>
            <Stack
                p="10px"
                margin="auto"
            >
                <Heading
                    as="h2"
                    textAlign="center"
                >Search By Amenities</Heading>
                {searchError 
                    ?   <Alert status='error' flexDirection='column'>
                            <AlertIcon/>
                            <AlertTitle>Search Unsuccessful.</AlertTitle>
                            <AlertDescription textAlign='center'>No parks with all specified amenities were found.<br/>Please try removing some criteria and search again.</AlertDescription>
                        </Alert>
                    : null
                }
            <form onSubmit={formik.handleSubmit} alignItems='center'>
                <FormControl isDisabled={formik.isSubmitting}>
                <SimpleGrid 
                    minChildWidth='300px'
                    maxWidth='1024px' 
                    spacing='5px'
                    margin="auto"
                >
                    {checkboxes}
                </SimpleGrid>
                <Flex 
                    p='5px'
                    justifyContent='center'
                >
                    <Button
                        type="submit" 
                        isDisabled={formik.isSubmitting}
                        colorScheme="orange" 
                        mt='5px' 
                        border='1px' 
                        background="green" 
                        color="white"
                        width='300px'
                    >
                        {formik.isSubmitting ? "Loading Results..." : "Search"}
                    </Button>
                </Flex>
                </FormControl>
            </form>
            </Stack>
        </>
    )
}

export default Main