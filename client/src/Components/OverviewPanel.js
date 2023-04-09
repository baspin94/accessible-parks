import {
    Box, 
    Heading, 
    Text, 
    Image
} from '@chakra-ui/react';

function OverviewPanel( { park }) {
    return (
        <>
        <Box w="60%" border='1px'>
            <Heading>{park.name}</Heading>
            <Text>{park.designation} | {park.states}</Text>
            <Box boxSize="md" border='1px'>
                <Image src={park.image_url} alt={park.image_alt}/>
            </Box>
            <Text>{park.description}</Text>
        </Box>
        </>
    )
    
}

export default OverviewPanel;