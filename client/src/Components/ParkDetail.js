import AmenitiesPanel from './AmenitiesPanel';
import DetailsPanel from './DetailsPanel';
import OverviewPanel from './OverviewPanel';

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';


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
                <h1>Park Detail Page for {park.name}</h1>
                <Link to='/results'>
                    <button>Back to Results</button>
                </Link>
                <OverviewPanel park={park}/>
                <DetailsPanel park={park}/>
                <AmenitiesPanel park={park}/>
            </>
        )
    }
}

export default ParkDetail;