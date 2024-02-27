/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import PropTypes from 'prop-types'
// Components
import {Box, Heading, Flex, Text, Fade, useMultiStyleConfig} from '@chakra-ui/react'

// Project Components
import Breadcrumb from '@salesforce/retail-react-app/app/components/breadcrumb'

const PageHeader = ({category, productSearchResult, isLoading, searchQuery, ...otherProps}) => {
    // Custom Start: dis some styling
    const styles = useMultiStyleConfig('pageHeader')

    return (
        <Box {...otherProps} data-testid="sf-product-list-breadcrumb" {...styles.filterHead}>
            {/* Breadcrumb */}
            {category && <Breadcrumb categories={category.parentCategoryTree} />}
            {/* Category Title */}
            <Flex>
                <Heading as="h2" size="lg" marginRight={2}>
                    {`${category?.name || searchQuery || ''}`}
                </Heading>
                <Heading as="h2" size="lg" marginRight={2}>
                    {!isLoading && <Fade in={true}>({productSearchResult?.total})</Fade>}
                </Heading>
            </Flex>
        </Box>
    )
    // Custom end
}

PageHeader.propTypes = {
    category: PropTypes.object,
    productSearchResult: PropTypes.object,
    isLoading: PropTypes.bool,
    searchQuery: PropTypes.string
}

export default PageHeader
