import { 
    Heading,
    Box,
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
import { Form, useFormik } from 'formik';
import * as yup from 'yup';

function Signup() {
    const [showPassword, setShowPassword] = useState(false)
    
    function handlePasswordToggle() {
        setShowPassword(!showPassword)
    }

    const formSchema = yup.object().shape({
        first_name: yup.string().required("Must enter first name."),
        last_name: yup.string().required("Must enter last name."),
        email: yup
            .string()
            .email("Must enter valid email address.")
            .required("Must enter email."),
        password: yup.string().required("Must enter password."),
        confirm_password: yup
            .string()
            .required("Must confirm password.")
            .oneOf([yup.ref('password'), null], "Passwords must match.")
    })
    
    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirm_password: "",
        },
        validationSchema: formSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => {
            console.log(values)
        }
    });

    return (
        
        <Box w="400px" margin="auto">
            <Heading>Sign Up for an Account</Heading>
            <form onSubmit={formik.handleSubmit}>
                <Stack>
                    <FormControl isInvalid={formik.errors['first_name']}>
                        <FormLabel>First Name</FormLabel>
                        <Input type="text" name="first_name" value={formik.values.first_name} onChange={formik.handleChange}/>
                        <FormErrorMessage>{formik.errors['first_name']}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={formik.errors['last_name']}>
                        <FormLabel>Last Name</FormLabel>
                        <Input type="text" name="last_name" value={formik.values.last_name} onChange={formik.handleChange}/>
                        <FormErrorMessage>{formik.errors['last_name']}</FormErrorMessage>
                    </FormControl>
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
                    <FormControl isInvalid={formik.errors['confirm_password']}>
                        <FormLabel>Confirm Password</FormLabel>
                        <InputGroup>
                            <Input type={showPassword ? "text" : "password"} name="confirm_password" value={formik.values.confirm_password} onChange={formik.handleChange}/>
                            <InputRightElement>
                                <Button onClick={handlePasswordToggle}>{showPassword ? 'Hide' : 'Show'}</Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{formik.errors['confirm_password']}</FormErrorMessage>
                    </FormControl>
                    <Button type="submit">Sign Up</Button>
                </Stack>
            </form>
        </Box>
    )
}
export default Signup;