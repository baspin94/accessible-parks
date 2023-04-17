import ParkCard from "./ParkCard";
import {
    Button,
    SimpleGrid,
    Heading,
    Box,
    Text,
    FormLabel,
    Select
} from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';

function Results({ parks }) {
    const [displayParks, setDisplayParks] = useState(parks)
    const [states, setStates] = useState([])

    const history = useHistory()

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

        if (parks.length === 0) {
            history.push('/')
        } else {
            setStates(states)
        }
    }, [parks, history])

    const formik = useFormik({
        initialValues: {
            state: ""
        },
        onSubmit: (values) => {
            const filterState = values['state']
            const filteredParks = parks.filter(park => {
                if (park.states.includes(filterState)){
                    return park
                } else {
                    return null
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

    function handleFilterClear() {
        setDisplayParks(parks)
        formik.handleReset()
    }

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
                    <Button onClick={handleFilterClear}>Clear Filter</Button>
                </form>
                <SimpleGrid margin="auto" w="100%" spacing={2} minChildWidth="250px">
                    {cards}
                </SimpleGrid>
                <Link exact to='/'>
                    <Button>Search Again</Button>
                </Link>
        </Box>
    )
}

export default Results;