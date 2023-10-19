import {
    Heading, 
    Text, 
    Image,
    VStack,
    UnorderedList,
    ListItem,
    Box
} from '@chakra-ui/react';

function OverviewPanel( { park }) {

    const states = require('us-state-converter')

    const designation = (park.designation === "") ? "Destination" : park.designation

    function getFullStates() {
        if (park.states.length === 2) {
            return <Text fontSize='lg'>{states.fullName(park.states)}</Text>
        } else {
            const stateAbbrs = park.states.split(',')
            const stateFullNames = stateAbbrs.map(abbr => {
                if (stateAbbrs.indexOf(abbr) !== 0) {
                    return <ListItem key={abbr} fontSize='lg' display='inline' p='1'>· {states.fullName(abbr)}</ListItem>

                } else {
                    return <ListItem key={abbr} fontSize='lg' display='inline' p='1'>{states.fullName(abbr)}</ListItem>
                }
                
            })
            return stateFullNames
        }
    }

    function onImageError(e){
        e.target.src = "https://placehold.co/600x400?text=Image+Not+Available"
        e.target.alt = "Image Not Available"
    }

    const stateText = getFullStates()

    return (
        <VStack border='1px' p="10px" spacing={5} w={{lg: '75%'}} margin='10px'>
            <Heading textAlign='center'>{park.name}</Heading>
            <Text fontSize='xl' as='i'>{designation}</Text>
            {park.states.length === 2 
            ? stateText
            :
                <UnorderedList styleType="None" textAlign='center'>
                {stateText}
                </UnorderedList>
            }
            <Box maxWidth="600px">
                <Image
                    src={park.image_url}
                    alt={park.image_alt}
                    onError={onImageError}
                />
                <Text align="center" fontSize="2xs">{park.image_credit}</Text>
            </Box>
            <Text>{park.description}</Text>
        </VStack>
    )
}

export default OverviewPanel;