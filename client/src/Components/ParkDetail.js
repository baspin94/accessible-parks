import AmenitiesPanel from './AmenitiesPanel';
import DetailsPanel from './DetailsPanel';
import OverviewPanel from './OverviewPanel';
import ReviewPanel from './ReviewPanel';

import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App'

import {
    Button,
    Flex,
    Spacer, 
    Box, 
} from '@chakra-ui/react';

function ParkDetail({ savedParks, setSavedParks }) {

    const history = useHistory()

    const user = useContext(UserContext)

    const params = useParams();
    const parkCode = params['code'];

    const [park, setPark] = useState(null)
    const [savedId, setSavedId] = useState(null)
    const [reviews, setReviews] = useState([])

    useEffect( () => {
        fetch(`/parks/${parkCode}`)
        .then(response => response.json())
        .then(parkData => {
            setPark(parkData)
            setReviews(parkData.reviews)
            })
        .then(() => {
            if (user.id !== undefined) {
                const savedIds = user.parks.map(park => park.park.code)
                if (savedIds.includes(parkCode)) {
                    const match = user.parks.find(park => park.park.code === parkCode)
                    setSavedId(match.id)
                }}
        })
    }, [user, parkCode])

    function handleSaveUnsave(event) {
        if (event.target.id === 'save'){
            const submission = {
                user_id: user.id,
                park_id: park.id,
                park_code: park.code
            }
            fetch(`/user_parks`, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(submission),
            })
            .then((response) => response.json())
            .then((newUserPark)=> {
                setSavedId(newUserPark.id)
                const updatedSavedParks = [...savedParks, newUserPark]
                setSavedParks(updatedSavedParks)
            })
        } else {
            fetch(`/user_parks/${savedId}`, {
                method: "DELETE",
            })
            .then(response => response.json())
            .then(() => {
                setSavedId(null)
                const updatedSavedParks = savedParks.filter(element => element.id !== savedId)
                setSavedParks(updatedSavedParks)
            })
        }
    }

    function setSubheader() {
        if (user.id !== undefined) {
            if (savedId !== null) {
                return (
                    <Flex 
                        direction={{base: "column", md: "row"}}
                        alignItems="center"
                        p="10px"
                    >
                        <Button 
                            // mt='10px'
                            // mb='10px'
                            // ml='10px'
                            colorScheme="orange"
                            border='1px'
                            background="green"
                            color="white"
                            onClick={history.goBack}
                        >
                            Back to Previous Page
                        </Button>
                        <Spacer />
                        <Button
                            // mt='10px'
                            // mb='10px'
                            // mr='10px'
                            colorScheme="orange"
                            border='1px'
                            background="green"
                            color="white"
                            id="unsave"
                            onClick={handleSaveUnsave}
                        >
                            Unsave
                        </Button>
                    </Flex>
            )} else {
                return (
                    <Flex 
                        direction={{base: "column", md: "row"}}
                        alignItems="center"
                        p="10px"
                    >
                        <Link to='/results'>
                            <Button 
                                // mt='10px'
                                // mb='10px'
                                // ml='10px'
                                colorScheme="orange"
                                border='1px'
                                background="green"
                                color="white" onClick={history.goBack}
                            >
                                Back to Previous Page
                            </Button>
                        </Link>
                        <Spacer />
                        <Button
                            // mt='10px'
                            // mb='10px'
                            // mr='10px'
                            colorScheme="orange" 
                            border='1px'
                            background="green"
                            color="white"
                            id="save"
                            onClick={handleSaveUnsave}
                        >
                            Save
                        </Button>
                    </Flex>
            )}
        } else {
            return(
                <Flex 
                        direction={{base: "column", md: "row"}}
                        alignItems="center"
                        p="10px"
                >
                    <Link to='/results'>
                        <Button
                            // mt='10px'
                            // mb='10px'
                            // ml='10px'
                            colorScheme="orange"
                            border='1px'
                            background="green"
                            color="white"
                            onClick={history.goBack}
                        >
                            Back to Previous Page
                        </Button>
                    </Link>
                </Flex>
            )
        }
    }

    const subheader = setSubheader()

    if (!park) {
        return <h1>Loading...</h1>
    }
    else {
        return (
            <Box p="10px">
                {subheader}
                <Box display={{lg: "flex"}} flexDirection="row-reverse" maxW='2000px'>
                    <OverviewPanel park={park}/>
                    <DetailsPanel park={park}/>
                </Box>
                <Box display={{lg: "flex"}} maxW='2000px'>
                    <AmenitiesPanel park={park}/>
                    <ReviewPanel park={park} reviews={reviews} setReviews={setReviews}/>
                </Box>
            </Box>
        )
    }
}

export default ParkDetail;