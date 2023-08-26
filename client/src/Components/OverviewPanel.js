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

    // function getImage(){
    //     if (park.image_url){
    //         return (
    //             <Box>
    //                 <Image margin="auto" w="40%" h="40%" src={park.image_url} alt={park.image_alt} onError={onImageError}/>
    //                 <Text align="center" fontSize="2xs">{park.image_credit}</Text>
    //             </Box>
    //         )
    //     } else {
    //         return (
    //             <Box>
    //                 <Image margin="auto" src="https://placehold.co/600x400?text=Image+Not+Available" alt="Image Not Available"/>
    //             </Box>
    //         )
    //     }
    // }

    // const image = getImage()


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
            <Box>
                <Image margin="auto" w="40%" h="40%" src={park.image_url} alt={park.image_alt} onError={onImageError}/>
                <Text align="center" fontSize="2xs">{park.image_credit}</Text>
            </Box>
            <Text>{park.description}</Text>
        </VStack>
        </Box> 
        </>
    )
    
}

export default OverviewPanel;