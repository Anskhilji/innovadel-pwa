/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import PropTypes from 'prop-types'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Stack
} from '@salesforce/retail-react-app/app/components/shared/ui'
import {useIntl} from 'react-intl'
import {SizeChartPanel} from '../../../components/size-chart'
import {RatingStar} from '../../../components/product-rating'

const InformationAccordion = ({product}) => {
    const {formatMessage} = useIntl()

    return (
        <Stack direction="row" spacing={[0, 0, 0, 16]}>
            <Accordion allowMultiple minWidth='100%' flex={[1, 1, 1, 5]}>
                {/* Details */}
                <AccordionItem>
                    <h2>
                        <AccordionButton height="64px">
                            <Box flex="1" textAlign="left" fontWeight="bold" fontSize="lg">
                                {formatMessage({
                                    defaultMessage: 'Product Detail',
                                    id: 'product_detail.accordion.button.product_detail'
                                })}
                            </Box>
                        <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel mb={6} mt={4}>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: product?.longDescription
                            }}
                        />
                    </AccordionPanel>
                </AccordionItem>

                {/* Size & Fit */}
                <AccordionItem>
                    <h2>
                        <AccordionButton height="64px">
                            <Box flex="1" textAlign="left" fontWeight="bold" fontSize="lg">
                                {formatMessage({
                                    defaultMessage: 'Size & Fit',
                                    id: 'product_detail.accordion.button.size_fit'
                                })}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    {/* Render categoryId from product */}
                    {product &&
                    <AccordionPanel mb={6} mt={4}>
                        <SizeChartPanel cid={product.c_sizeChartId}/>
                    </AccordionPanel>
                    
                    }

                </AccordionItem>

                {/* Reviews */}
                <AccordionItem>
                    <h2>
                        <AccordionButton height="64px">
                            <Box flex="1" textAlign="left" fontWeight="bold" fontSize="lg">
                                {formatMessage({
                                    defaultMessage: 'Reviews',
                                    id: 'product_detail.accordion.button.reviews'
                                })}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    {/* Render ProductRating from product */}
                    {product &&
                    <AccordionPanel mb={6} mt={4}>
                        <RatingStar productRating={product.c_productRatings}/>
                    </AccordionPanel>}
                </AccordionItem>

                {/* Questions */}
                <AccordionItem>
                    <h2>
                        <AccordionButton height="64px">
                            <Box flex="1" textAlign="left" fontWeight="bold" fontSize="lg">
                                {formatMessage({
                                    defaultMessage: 'Questions',
                                    id: 'product_detail.accordion.button.questions'
                                })}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel mb={6} mt={4}>
                        {formatMessage({
                            defaultMessage: 'Coming Soon',
                            id: 'product_detail.accordion.message.coming_soon'
                        })}
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            <Box display={['none', 'none', 'none', 'block']} flex={4}></Box>
        </Stack>
    )
}

InformationAccordion.propTypes = {
    product: PropTypes.object
}

export default InformationAccordion
