import {
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
                <Image src={park.image_url} alt={park.image_alt}/>
            </CardBody>
            <CardHeader align="center">
                <Heading as="h3">{park.name}</Heading>
                <Text>{park.states}</Text>
            </CardHeader>
        </Card>
    )
}

export default ParkCard;