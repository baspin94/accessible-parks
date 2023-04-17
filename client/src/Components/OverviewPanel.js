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
                    return <ListItem fontSize='lg' display='inline' p='1'>· {states.fullName(abbr)}</ListItem>

                } else {
                    return <ListItem fontSize='lg' display='inline' p='1'>{states.fullName(abbr)}</ListItem>
                }
                
            })
            return stateFullNames
        }
    }

    const stateText = getFullStates()


    return (
        <>
        <Box margin="auto" p="5px">
        <VStack p="10px" spacing={5}>
            <Heading>{park.name}</Heading>
            <Text fontSize='xl' as='i'>{designation}</Text>
            {park.states.length === 2 
            ? stateText
            :
                <UnorderedList styleType="None" textAlign='center'>
                {stateText}
                </UnorderedList>
            }
            <Image w="40%" h="40%" src={park.image_url} alt={park.image_alt}/>
            <Text>{park.description}</Text>
        </VStack>
        </Box> 
        </>
    )
    
}

export default OverviewPanel;