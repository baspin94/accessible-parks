import AmenitiesPanel from './AmenitiesPanel';
import DetailsPanel from './DetailsPanel';
import OverviewPanel from './OverviewPanel';

import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../App'

import {
    Grid,
    GridItem,
    Button
} from '@chakra-ui/react';

function ParkDetail() {

    const user = useContext(UserContext)

    const params = useParams();
    const parkId = params['id'];

    const [park, setPark] = useState(null)
    const [isSaved, setIsSaved] = useState(false)

    useEffect( () => {
        fetch(`/parks/${parkId}`)
        .then(response => response.json())
        .then(parkData => setPark(parkData))
        .then(() => {
            if (user.id !== undefined) {
                const savedIds = user.parks.map(park => park.park_id)
                const intParkId = parseInt(parkId)
                if (savedIds.includes(intParkId)) {
                    setIsSaved(true)
                }}
        })
    }, [parkId, user])

    function setSubheader() {
        if (user.id !== undefined) {
            if (isSaved) {
                return (
                    <>
                    <Link to='/results'>
                        <Button>Back to Results</Button>
                    </Link>
                    <Button>Unsave</Button>
                    </>
            )} else {
                return (
                    <>
                    <Link to='/results'>
                        <Button>Back to Results</Button>
                    </Link>
                    <Button>Save</Button>
                    </>
            )}
        } else {
            return(
                <Link to='/results'>
                    <Button>Back to Results</Button>
                </Link>
            )
        }
    }
    const subheader = setSubheader()

    if (!park) {
        return <h1>Loading...</h1>
    }
    else {
        return (
            <>
                {subheader}
                <Grid
                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(4, 1fr)'
                    gap={4}
                >
                    <GridItem rowSpan={2} colSpan={1}>
                        <DetailsPanel park={park}/>
                    </GridItem>
                    <GridItem colSpan={3}>
                        <OverviewPanel park={park}/>
                    </GridItem>
                    <GridItem colSpan={2}><AmenitiesPanel park={park}/></GridItem>
                </Grid>
            </>
        )
    }
}

export default ParkDetail;