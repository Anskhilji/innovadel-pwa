/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import {Flex, HStack } from '@chakra-ui/react'
import {
    VisaIcon, 
    MastercardIcon, 
    AmexIcon,
    DiscoverIcon
} from '@salesforce/retail-react-app/app/components/icons'

import{
    ApplepayIcon
} from '../../components/icons'

const PaymentCards = () =>{

    return(
        <Flex justify={'center'} >
            <HStack>
                <VisaIcon layerStyle="ccIcon" />
                <MastercardIcon layerStyle="ccIcon" />
                <AmexIcon layerStyle="ccIcon" />
                <DiscoverIcon layerStyle="ccIcon" />
                <ApplepayIcon layerStyle="ccIcon" />
            </HStack>
        </Flex>
    )
}

export default PaymentCards