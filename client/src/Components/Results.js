import ParkCard from "./ParkCard";
import {
    Button,
    SimpleGrid,
    Heading,
    Box,
    Text,
    FormLabel,
    FormControl,
    Select,
    InputGroup,
    InputLeftAddon,
    InputRightAddon
} from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';

function Results({ parks }) {
    const [displayParks, setDisplayParks] = useState(parks)
    const [states, setStates] = useState([])
    const [designations, setDesignations] = useState([])
    const history = useHistory()
    const stateConvert = require('us-state-converter')

    useEffect(() => {
        function getStates() {
            let statesArray = []
            let fullState
            displayParks.forEach(park => {
                if (park.states.length === 2) {
                    fullState = stateConvert.fullName(park.states) + ` (${park.states})`
                    statesArray.push(fullState)
                } else {
                    const states = park.states.split(',')
                    states.forEach(state => {
                        fullState = stateConvert.fullName(state) + ` (${state})`
                        statesArray.push(fullState)
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
    }, [displayParks, parks, history, stateConvert])

    const stateFormik = useFormik({
        initialValues: {
            state: ""
        },
        onSubmit: (values) => {
            const filterState = values['state'].slice(-3, -1)
            const filteredByState = displayParks.filter(park => {
                if (park.states.includes(filterState)){
                    return park
                } else {
                    return null
                }
            })
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
                <Box margin='auto' minW='30%' maxW='60%' p='10px' alignItems='center'>
                    <form onSubmit={stateFormik.handleSubmit}>
                        <FormControl isDisabled={stateFormik.isSubmitting}>
                        <InputGroup>
                        <InputLeftAddon w='204px'><FormLabel>Filter By State:</FormLabel></InputLeftAddon>
                        <Select minW='207px' name="state" placeholder="Select a state:" value={stateFormik.values.state} onChange={stateFormik.handleChange}>
                            {stateOptions}
                        </Select>
                        <InputRightAddon><Button colorScheme="orange" border='1px' background="green" color="white" isDisabled={stateFormik.isSubmitting} type="submit">Filter</Button></InputRightAddon>
                        </InputGroup>
                        </FormControl>
                        
                    </form>
                    <form onSubmit={designFormik.handleSubmit}>
                        <FormControl isDisabled={designFormik.isSubmitting}>    
                        <InputGroup mt='10px'>
                        <InputLeftAddon w='204px'><FormLabel>Filter By Designation:</FormLabel></InputLeftAddon>
                        <Select minW='207px' name="designation" placeholder="Select a designation:" value={designFormik.values.designation} onChange={designFormik.handleChange}>
                            {designationOptions}
                        </Select>
                        <InputRightAddon><Button colorScheme="orange" border='1px' background="green" color="white" isDisabled={designFormik.isSubmitting} type="submit">Filter</Button></InputRightAddon>
                        </InputGroup>
                        </FormControl>
                        <Button colorScheme="orange" mt='10px' border='1px' background="green" color="white" onClick={handleFilterClear}>Reset Filters</Button>
                    </form>
                </Box>
                <SimpleGrid margin="auto" w="100%" spacing={2} minChildWidth="300px">
                    {cards}
                </SimpleGrid>
                <Link exact='true' to='/'>
                    <Button mt='10px' colorScheme="orange" border='1px' background="green" color="white">Search Again</Button>
                </Link>
        </Box>
    )
}

export default Results;