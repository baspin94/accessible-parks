import {
    Checkbox,
    Heading,
    Grid
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

function Main({user}) {
    const [amenities, setAmenities] = useState([])

    useEffect( () => {
        fetch('/amenities')
            .then(response => response.json())
            .then(amenityData => setAmenities(amenityData))
    }, [])

    const checkboxes = amenities.map( (amenity) => {
        return (
            <Checkbox
                // justifyContent='center' 
                p='5px'
                size='md' 
                border='1px'
                key={amenity.id}
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
            <Grid margin="auto" w="50%" templateColumns='repeat(3, 1fr)' gap={2} justifyContent="center">
                {checkboxes}
            </Grid>
            
            
        
        
        
        
        </>
        
    )
}

export default Main