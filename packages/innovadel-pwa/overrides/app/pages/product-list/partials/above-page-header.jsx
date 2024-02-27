/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Box, Flex, Heading, useMultiStyleConfig} from '@chakra-ui/react'
import {useCategory} from '@salesforce/commerce-sdk-react'
import {HTTPNotFound, HTTPError} from '@salesforce/pwa-kit-react-sdk/ssr/universal/errors'

const AbovePageHeader = ({categoryId}) => {
    const styles = useMultiStyleConfig('AboveHeaderPlp')
    const {error, data: category} = useCategory(
        {
            parameters: {
                id: categoryId
            }
        },
        {
            enabled: true
        }
    )

    /**************** Error Handling ****************/
    const errorStatus = error?.response?.status
    switch (errorStatus) {
        case undefined:
            // No Error.
            break
        case 404:
            throw new HTTPNotFound('Category Not Found.')
        default:
            throw new HTTPError(`HTTP Error ${errorStatus} occurred.`)
    }

    return (
        // Custom start: Design Category Banner
        <Box {...styles.mainBanner} bgImage={`url(${category?.c_slotBannerImage})`}>
            <Flex justify={{base: 'center', md: 'start'}} {...styles.bannerTextWraper}>
                <Heading
                    fontSize={{base: '30px', sm: '40px', md: '60px'}}
                    marginLeft={{md: '104px'}}
                    {...styles.bannerText}
                >
                    {category?.name}
                </Heading>
            </Flex>
        </Box>
        // Custom end
    )
}
AbovePageHeader.propTypes = {
    categoryId: PropTypes.string
}
export default AbovePageHeader
