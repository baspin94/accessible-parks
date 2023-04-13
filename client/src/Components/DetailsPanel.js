import {
    Heading, 
    Text,
    UnorderedList,
    ListItem, 
    ListIcon,
    Stack
} from '@chakra-ui/react';
import {
    PhoneIcon,
    EmailIcon,
    InfoOutlineIcon,
    CheckIcon
} from '@chakra-ui/icons';

function DetailsPanel({ park }) {

    const homepage = `https://www.nps.gov/${park.code}/index.htm`
    const access_page = `https://www.nps.gov/${park.code}/planyourvisit/accessibility.htm`

    return (
        <Stack p="10px">
            <Heading as="h3" size="lg">General Information</Heading>
            <Heading as="h4" size="md">National Park Service Pages</Heading>
                <UnorderedList styleType="none">
                    <ListItem>
                        <ListIcon as={InfoOutlineIcon}/>
                        General: <a href={homepage} target="_blank" rel="noopener noreferrer">NPS Park Homepage</a>
                    </ListItem>
                    <ListItem>
                        <ListIcon as={CheckIcon}/>
                        Accessibility: <a href={access_page} target="_blank" rel="noopener noreferrer">NPS Park Accessibility Page</a>
                    </ListItem>

                </UnorderedList>
            <Heading as="h4" size="md">Contact Information</Heading>
                <UnorderedList styleType="none">
                    <ListItem>
                        <ListIcon as={PhoneIcon}/>
                        Phone: {park.phone}
                    </ListItem>
                    <ListItem>
                        <ListIcon as={EmailIcon}/>
                        Email: <a href={`mailto:${park.email}`} target="_blank" rel="noopener noreferrer">{park.email}</a>
                    </ListItem>
                </UnorderedList>
            <Heading as="h4" size="md">Weather</Heading>
                <Text>{park.weather}</Text>
        </Stack>
    )
}

export default DetailsPanel;