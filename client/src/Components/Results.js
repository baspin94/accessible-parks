import ParkCard from "./ParkCard";
import {
    Button,
    Grid,
    Heading,
    Box,
    Text,
    FormLabel,
    Select
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';

function Results({ parks }) {
    const [displayParks, setDisplayParks] = useState(parks)
    const [states, setStates] = useState([])

    useEffect(() => {
        function getStates() {
            let statesArray = []
            parks.forEach(park => {
                if (park.states.length === 2) {
                    statesArray.push(park.states)
                } else {
                    const states = park.states.split(',')
                    states.forEach(state => {
                        statesArray.push(state)
                    })
                }
            })
            const uniqueStates = [...new Set(statesArray)]
            return uniqueStates.sort()
        
        }
        const states = getStates()
        setStates(states)
    }, [parks])

    const formik = useFormik({
        initialValues: {
            state: ""
        },
        onSubmit: (values) => {
            const filterState = values['state']
            const filteredParks = parks.filter(park => {
                if (park.states.includes(filterState)){
                    return park
                }
            })
            setDisplayParks(filteredParks)
        }
    })

    const cards = displayParks.map(park => {
        return <ParkCard key={park.id} id={park.id} park={park} />
    })

    const stateOptions = states.map(state => {
        const index = states.indexOf(state)
        return <option key={index} value={state}>{state}</option>
    })

    return (
        <Box p="5px" margin="auto" w="80%" textAlign="center">
                <Heading margin="auto">Search Results</Heading>
                <Text><strong>{displayParks.length}</strong> parks matching your search criteria</Text>
                <form onSubmit={formik.handleSubmit}>
                    <FormLabel>Filter By State:</FormLabel>
                    <Select name="state" placeholder="Select a state:" value={formik.values.state} onChange={formik.handleChange}>
                        {stateOptions}
                    </Select>
                    <Button type="submit">Filter</Button>
                </form>
                <Grid p="20px" margin="auto" w="100%" templateColumns='repeat(3, 1fr)' gap={2}>
                    {cards}
                </Grid>
                <Link exact to='/'>
                    <Button>Search Again</Button>
                </Link>
        </Box>
    )
}

export default Results;