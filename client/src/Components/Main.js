import {
    Checkbox,
    Heading,
    Grid,
    Button, 
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';

function Main({user}) {
    const [amenities, setAmenities] = useState([])

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
            const int_values = values['checked'].map((value) => parseInt(value))
            console.log(int_values)
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
            <form onSubmit={formik.handleSubmit}>
                <Grid margin="auto" w="50%" templateColumns='repeat(3, 1fr)' gap={2} justifyContent="center">
                    {checkboxes}
                </Grid>
                <Button type="submit">Search</Button>
            </form>
            
            
            
        
        
        
        
        </>
        
    )
}

export default Main