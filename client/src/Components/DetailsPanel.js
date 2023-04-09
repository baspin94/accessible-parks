import {
    Box, 
    Heading, 
    Text,
    UnorderedList,
    ListItem, 
    ListIcon,
} from '@chakra-ui/react';
import {
    PhoneIcon,
    EmailIcon,
    InfoOutlineIcon,
    CheckIcon
} from '@chakra-ui/icons'

function DetailsPanel({ park }) {

    return (
        <Box>
            <Heading as="h3">General Information</Heading>
            <Heading as="h4">National Park Service Pages</Heading>
                <UnorderedList styleType="none">
                    <ListItem>
                        <ListIcon as={InfoOutlineIcon}/>
                        General:
                    </ListItem>
                    <ListItem>
                        <ListIcon as={CheckIcon}/>
                        Accessibility:
                    </ListItem>

                </UnorderedList>
            <Heading as="h4">Contact Information</Heading>
                <UnorderedList styleType="none">
                    <ListItem>
                        <ListIcon as={PhoneIcon}/>
                        Phone: {park.phone}
                    </ListItem>
                    <ListItem>
                        <ListIcon as={EmailIcon}/>
                        Email: {park.email}
                    </ListItem>
                </UnorderedList>
            <Heading as="h4">Weather</Heading>
                <Text>{park.weather}</Text>
        </Box>
    )
}

export default DetailsPanel;