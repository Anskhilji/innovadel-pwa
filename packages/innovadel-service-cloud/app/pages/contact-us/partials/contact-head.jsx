import React from 'react'
import {
    Box,
    Text,
    Heading,

} from '@chakra-ui/react'

const ContactHead = () => {
    return ( 
        <>
            <Box as='h4' textTransform='uppercase' fontWeight='500' lineHeight='40px' color='#2E2E2E' fontSize='34px'>contact us</Box>
            <Text fontSize='16px' fontWeight='400' lineHeight='24px' letterSpacing='0.5%' mt='36px' color='#727272'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dolor orci, ultricies ac sem et, luctus sagittis massa. Nunc nec lobortis dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur finibus sem lectus, at suscipit tellus placerat ut. Donec vel volutpat leo. Sed quam massa, maximus vitae erat vitae, volutpat consectetur tellus. Nulla facilisi. Nulla nec faucibus mi,</Text>
            
            <Box as='h5' textTransform='uppercase' mt='23px' fontSize='26px' fontWeight='600' lineHeight='32px'>get in touch</Box>
        </>
    );
};

export default ContactHead