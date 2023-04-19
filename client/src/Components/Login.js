import { 
    Heading,
    Box,
    Link,
    Stack,
    Input,
    InputGroup,
    InputRightElement, 
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage, 
    IconButton,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription 
} from '@chakra-ui/react';
import {
    ViewIcon,
    ViewOffIcon
} from '@chakra-ui/icons';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useHistory, Link as ReachLink } from 'react-router-dom'
import * as yup from 'yup';

function Login({ setUser }) {

    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(null)
    
    function handlePasswordToggle() {
        setShowPassword(!showPassword)
    }

    const history = useHistory()
    
    const formSchema = yup.object().shape({
        email: yup
            .string()
            .email("Must enter valid email address.")
            .required("Must enter email."),
        password: yup
            .string()
            .required("Must enter password."),
    })
    
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: formSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => {
            fetch('/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values),
            })
            .then(response => {
                if (response.ok) {
                    response.json()
                    .then(userData => setUser(userData))
                    .then(history.push('/'))
                } else {
                    response.json()
                    .then(error => setError(error['error']))
                }
            })
        }
    });
    
    return (
        
        <Box w="500px" p='20px' margin="auto" textAlign='center'>

            <Stack>

                <Heading p='5px'>Log In to Your Account</Heading>

                {error 
                    ? <Alert status='error' flexDirection='column'>
                        <AlertIcon/>
                        <AlertTitle>Login Unsuccessful.</AlertTitle>
                        <AlertDescription>{error}<br/>Please log in or try again.</AlertDescription>
                    </Alert>
                    : null
                }

                <form onSubmit={formik.handleSubmit}>

                    <FormControl isRequired='true' isInvalid={formik.errors['email']}>
                        <FormLabel mt='10px'>Email Address</FormLabel>
                        <Input _hover={{border: '2px', borderColor: 'blue.500'}} border='1px' type="text" name="email" value={formik.values.email} onChange={formik.handleChange}/>
                        <FormErrorMessage>{formik.errors['email']}</FormErrorMessage>
                    </FormControl>

                    <FormControl isRequired='true' isInvalid={formik.errors['password']}>
                        <FormLabel mt='10px'>Password</FormLabel>
                        <InputGroup>
                            <Input _hover={{border: '2px', borderColor: 'blue.500'}} border='1px' type={showPassword ? "text" : "password"} name="password" value={formik.values.password} onChange={formik.handleChange}/>
                            <InputRightElement>
                            <IconButton aria-label={showPassword ? "Hide Password" : "Show Password"} colorScheme="orange" background="green" color="white" onClick={handlePasswordToggle} icon={showPassword ? <ViewOffIcon /> : <ViewIcon />} />
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{formik.errors['password']}</FormErrorMessage>
                    </FormControl>

                    <Button colorScheme="orange" mt='10px' border='1px' background="green" color="white" type="submit">Log In</Button>

                </form>

                <Link as={ReachLink} to='/signup'>
                    Don't have an account yet? <strong>Sign Up.</strong>
                </Link>

            </Stack>

        </Box>
    )
}

export default Login