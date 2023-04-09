import {
    Heading, 
    Text, 
    Image,
    VStack
} from '@chakra-ui/react';

function OverviewPanel( { park }) {

    const designation = (park.designation === "") ? "Destination" : park.designation
    return (
        <>
        <VStack p="10px">
            <Heading>{park.name}</Heading>
            <Text>{designation} | {park.states}</Text>
            {/* <Box boxSize="md" border='1px'> */}
                <Image w="40%" h="40%" src={park.image_url} alt={park.image_alt}/>
            {/* </Box> */}
            <Text>{park.description}</Text>
        </VStack>
        </>
    )
    
}

export default OverviewPanel;