import AmenitiesPanel from './AmenitiesPanel';
import DetailsPanel from './DetailsPanel';
import OverviewPanel from './OverviewPanel';

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import {
    Grid,
    GridItem,
    Button
} from '@chakra-ui/react';


function ParkDetail() {

    const params = useParams();
    const parkId = params['id'];

    const [park, setPark] = useState(null)

    useEffect( () => {
        fetch(`/parks/${parkId}`)
        .then(response => response.json())
        .then(parkData => setPark(parkData))
    }, [parkId])

    if (!park) {
        return <h1>Loading...</h1>
    }
    else {
        return (
            <>
                <Link to='/results'>
                    <Button>Back to Results</Button>
                </Link>
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