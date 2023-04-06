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
    FormErrorMessage 
} from '@chakra-ui/react';
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
            console.log(values)
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
        
        <Box w="500px" margin="auto" p="20px">

            <Stack>

                <Heading>Log In to Your Account</Heading>

                {error 
                    ? <Box bg="red">Error: {error}</Box>
                    : null
                }

                <form onSubmit={formik.handleSubmit}>

                    <FormControl isInvalid={formik.errors['email']}>
                        <FormLabel>Email Address</FormLabel>
                        <Input type="text" name="email" value={formik.values.email} onChange={formik.handleChange}/>
                        <FormErrorMessage>{formik.errors['email']}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={formik.errors['password']}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input type={showPassword ? "text" : "password"} name="password" value={formik.values.password} onChange={formik.handleChange}/>
                            <InputRightElement>
                                <Button onClick={handlePasswordToggle}>{showPassword ? 'Hide' : 'Show'}</Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{formik.errors['password']}</FormErrorMessage>
                    </FormControl>

                    <Button type="submit">Log In</Button>

                </form>

                <Link as={ReachLink} to='/signup'>
                    Don't have an account yet? <strong>Sign Up.</strong>
                </Link>

            </Stack>

        </Box>
    )
}

export default Login