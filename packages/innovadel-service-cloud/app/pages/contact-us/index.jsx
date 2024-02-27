import React from 'react'
import ContactHead from './partials/contact-head'
import ContactUsComponentWrapper from '../../hooks/contact-us-component-wrapper'
import {
    Box,
    Container
} from '@chakra-ui/react'

const ContactUs = () => {
    return ( 
        <>
        <Container maxW='80%' m='50px auto'>
            <ContactHead />
            <Box mt='23px'>
                <ContactUsComponentWrapper />
            </Box>
        </Container>
        </>
    );
};

export default ContactUs
