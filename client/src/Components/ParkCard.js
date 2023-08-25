import {
    Card,
    CardHeader,
    Heading,
    Text,
    CardBody, 
    Image,
    UnorderedList,
    ListItem, 
    VStack
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function ParkCard( { park }) {

    function formatStates() {
        if (park.states.length === 2) {
            return <Text>{park.states}</Text>
        } else {
            const states = park.states.split(',')
            const stateList = states.map(state => {
                if (states.indexOf(state) === 0) {
                    return <ListItem key={state} display='inline' p='1'>{state}</ListItem>
                } else {
                    return <ListItem key={state} display='inline' p='1'>· {state}</ListItem>
                }
            })
            return stateList
        }
    }

    const formattedStates = formatStates()

    const designation = (park.designation === "") ? "Destination" : park.designation

    return(
        <Link to={`/park/${park.code}`}>
            <Card w="100%" h="100%" maxHeight="425px" border="1px" align="center">
                <CardBody maxHeight="66.666%">
                    {
                        park.image_url
                        ? <Image w="100%" h="100%" src={park.image_url} alt={park.image_alt}/>
                        : <Image w="100%" h="100%" src="https://placehold.co/600x400?text=Image+Not+Available" alt="Image Not Available"/>
                    }
                    
                </CardBody>
                <CardHeader align="center">
                    <VStack>
                        <Heading as="h3" size="md">{park.name}</Heading>
                        <Text as="i">{designation}</Text>
                        {park.states.length === 2 
                        ? formattedStates
                        :
                            <UnorderedList styleType="None" textAlign='center'>
                            {formattedStates}
                            </UnorderedList>
                        }
                    </VStack>
                </CardHeader>
            </Card>
        </Link>
    )
}

export default ParkCard;