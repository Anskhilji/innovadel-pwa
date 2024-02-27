/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import { HStack, useStyleConfig } from '@chakra-ui/react'
import { CheckmarkIcon } from '../../../overrides/app/components/icons'

const ConfirmationCheck = () => {

    const styles = useStyleConfig('ConfirmationCheck')

    return (
        <HStack {...styles.confirmationCheck}>
            <CheckmarkIcon layerStyle="ccIcon" style={{ height: "41px", width: "41px" }} />
        </HStack>
    )
}

export default ConfirmationCheck