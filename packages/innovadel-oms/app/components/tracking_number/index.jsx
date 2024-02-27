/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {useIntl, FormattedMessage} from 'react-intl'
import {Text, Flex, Box} from '@salesforce/retail-react-app/app/components/shared/ui'

const TrackingNumber = ({trackingID, size}) => {
    const {formatMessage} = useIntl()
    return (
        <Flex width={{base: '100%', md: 'auto'}}>
            <Box mr={2}>
                <Text fontWeight="500" fontSize="16px">
                    <FormattedMessage
                        defaultMessage="Tracking ID"
                        id="account_order_detail.label.tracking_id"
                    />
                    :{' '}
                </Text>
            </Box>
            <Box paddingX={{lg: '0', xl: size}}>
                <Text fontWeight="500" fontSize="16px">
                    {trackingID ||
                        formatMessage({
                            defaultMessage: 'Pending',
                            id: 'account_order_detail.label.pending_tracking_number'
                        })}
                </Text>
            </Box>
        </Flex>
    )
}
TrackingNumber.propTypes = {
    trackingID: PropTypes.object,
    size: PropTypes.string
}

export default TrackingNumber
