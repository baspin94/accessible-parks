import ParkCard from "./ParkCard";
import {
    Button,
    SimpleGrid,
    Heading,
    Box,
    Text,
    FormLabel,
    FormControl,
    Select
} from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';

function Results({ parks }) {
    const [displayParks, setDisplayParks] = useState(parks)
    const [states, setStates] = useState([])
    const [designations, setDesignations] = useState([])

    const history = useHistory()

    useEffect(() => {
        function getStates() {
            let statesArray = []
            displayParks.forEach(park => {
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

        function getDesignations() {
            const designationsArray = displayParks.map(park => {
                if (park.designation !== "") {
                    return park.designation
                } else {
                    return "Other"
                }
            })
            const uniqueDesignations = [...new Set(designationsArray)]
            return uniqueDesignations.sort()
        }

        const states = getStates()
        const designations = getDesignations()

        if (parks.length === 0) {
            history.push('/')
        } else {
            setStates(states)
            setDesignations(designations)
        }
    }, [displayParks, parks, history])

    const stateFormik = useFormik({
        initialValues: {
            state: ""
            // designation: ""
        },
        onSubmit: (values) => {
            const filterState = values['state']
            // const filterDesignation = values['designation']
            const filteredByState = displayParks.filter(park => {
                if (park.states.includes(filterState)){
                    return park
                } else {
                    return null
                }
            })
            // const filteredByDesignation = filteredByState.filter(park => {
            //     if (filterDesignation === "Other" && park.designation === "") {
            //         return park
            //     } else {
            //         if (park.designation === filterDesignation) {
            //             return park
            //         }
            //     }
            // })
            setDisplayParks(filteredByState)
        }
    })

    const designFormik = useFormik({
        initialValues: {
            designation: ""
        },
        onSubmit: (values) => {
            const filterDesignation = values['designation']
            const filteredByDesignation = displayParks.filter(park => {
                let parkToReturn
                if (filterDesignation === "Other" && park.designation === "") {
                    parkToReturn = park
                } else if (park.designation === filterDesignation) {
                    parkToReturn = park
                } else {
                    parkToReturn = null
                }
                return parkToReturn
            })
            setDisplayParks(filteredByDesignation)

        }
    })

    const cards = displayParks.map(park => {
        return <ParkCard key={park.id} id={park.id} park={park} />
    })

    const stateOptions = states.map(state => {
        const index = states.indexOf(state)
        return <option key={index} value={state}>{state}</option>
    })

    const designationOptions = designations.map(designation => {
        const index = designations.indexOf(designation)
        return <option key={index} value={designation}>{designation}</option>
    })

    function handleFilterClear() {
        setDisplayParks(parks)
        stateFormik.handleReset()
        designFormik.handleReset()
    }

    return (
        <Box p="5px" margin="auto" w="90%" textAlign="center">
                <Heading margin="auto">Search Results</Heading>
                <Text><strong>{displayParks.length}</strong> parks matching your search criteria</Text>
                <form onSubmit={stateFormik.handleSubmit}>
                    <FormControl isDisabled={stateFormik.isSubmitting}>
                    <FormLabel>Filter By State:</FormLabel>
                    <Select name="state" placeholder="Select a state:" value={stateFormik.values.state} onChange={stateFormik.handleChange}>
                        {stateOptions}
                    </Select>
                    </FormControl>
                    <Button isDisabled={stateFormik.isSubmitting} type="submit">Filter</Button>
                </form>
                <form onSubmit={designFormik.handleSubmit}>
                    <FormControl isDisabled={designFormik.isSubmitting}>
                    <FormLabel>Filter By Designation:</FormLabel>
                    <Select name="designation" placeholder="Select a designation:" value={designFormik.values.designation} onChange={designFormik.handleChange}>
                        {designationOptions}
                    </Select>
                    </FormControl>
                    <Button isDisabled={designFormik.isSubmitting} type="submit">Filter</Button>
                    <Button onClick={handleFilterClear}>Clear Filter</Button>
                </form>
                <SimpleGrid margin="auto" w="100%" spacing={2} minChildWidth="300px">
                    {cards}
                </SimpleGrid>
                <Link exact to='/'>
                    <Button>Search Again</Button>
                </Link>
        </Box>
    )
}

export default Results;