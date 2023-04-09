import {
    Box,
    Card,
    CardHeader,
    Heading,
    Text,
    CardBody, 
    Image
} from '@chakra-ui/react'

function ParkCard( {park}) {
    return(
        <Card border="1px" align="center">
            <CardBody>
                <Box boxSize="md" w="100%" h="100%">
                    <Image object-fit="cover" w="100%" h="100%" src={park.image_url} alt={park.image_alt}/>
                </Box>
            </CardBody>
            <CardHeader align="center">
                <Heading as="h3" size="md">{park.name}</Heading>
                <Text as="i">{park.designation}</Text>
                <Text>{park.states}</Text>
            </CardHeader>
        </Card>
    )
}

export default ParkCard;