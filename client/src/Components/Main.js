import {
    Checkbox,
    Heading,
    Grid,
    Button,
    Stack,
    Box
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';

function Main({user}) {
    const [amenities, setAmenities] = useState([])
    const [searchError, setSearchError] = useState(null)

    useEffect( () => {
        fetch('/amenities')
            .then(response => response.json())
            .then(amenityData => setAmenities(amenityData.sort((a1, a2) => (a1.name > a2.name) ? 1 : -1)))
    }, [])

    const formik = useFormik({
        initialValues: {
            checked: []
        },
        onSubmit: (values) => {
            const value_array = values['checked']
            const value_string = value_array.join()
            fetch(`/parkamenities/${value_string}`)
            .then(response => {
                if (response.ok) {
                    response.json()
                    .then(parkData => console.log(parkData))
                } else {
                    response.json()
                    .then(error => setSearchError(error['error']))
                }
            })
            
            // const start_int = int_values.shift()

            // fetch(`amenities/${start_int}`)
            //     .then(response => response.json())
            //     .then(amenityData => {
            //         let matches = {}
            //         amenityData['park_amenities'].forEach(element => matches[element.park.id] = element)
            //         console.log(matches)
            //         return matches
            //     })
            //     .then(matches => {
            //         console.log(matches);
            //         let ids = Object.keys(matches)
            //         console.log(ids)
            //         int_values.forEach(int => {
            //             debugger;
            //             fetch(`/amenities/${int}`)
            //                 .then(response => response.json())
            //                 .then(amenityData => {
            //                     let check_array = [];
            //                     amenityData['park_amenities'].forEach(element => check_array.push(element.park.id))
            //                     console.log('Array to Check:', check_array)
            //                     const filtered_ids = check_array.filter(value => ids.includes(String(value)))
            //                     ids = filtered_ids
            //                     console.log('Filtered Ids at the end of an iteration:', ids)
            //                     return ids
            //                 })
            //         })
            //     })
        }
    })

    const checkboxes = amenities.map( (amenity) => {
        return (
            <Checkbox
                p='5px'
                size='md' 
                border='1px'
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
            <Stack margin="auto" w="600px">
                <Heading margin="auto">Search By Amenities</Heading>
                {searchError 
                    ? <Box p="5px" bg="red" margin="auto" textAlign="center">{searchError}</Box>
                    : null
                }
            <form onSubmit={formik.handleSubmit}>
                <Grid margin="auto" w="50%" templateColumns='repeat(3, 1fr)' gap={2} justifyContent="center">
                    {checkboxes}
                </Grid>
                <Box w="50%" margin="auto">
                    <Button type="submit" width="full">Search</Button>
                </Box>
            </form>
            </Stack>
        </>
    )
}

export default Main