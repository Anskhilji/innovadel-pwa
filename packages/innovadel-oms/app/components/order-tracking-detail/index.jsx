/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import {FormattedMessage, useIntl} from 'react-intl'
import {Box, Text, Stack, Badge, Flex, Divider, Grid, SimpleGrid, Skeleton} from '@chakra-ui/react'
import {getCreditCardIcon} from '@salesforce/retail-react-app/app/utils/cc-utils'
import OrderSummary from '../order-tracking-summary'
import ItemVariantProvider from '../../../overrides/app/components/item-variant'
import CartItemVariantImage from '../../../overrides/app/components/item-variant/item-image'
import CartItemVariantName from '../../../overrides/app/components/item-variant/item-name'
import CartItemVariantAttributes from '../../../overrides/app/components/item-variant/item-attributes'
import CartItemVariantPrice from '../../../overrides/app/components/item-variant/item-price'
import PropTypes from 'prop-types'
import TrackingNumber from '../tracking_number'

const OrderProducts = ({productItems, currency}) => {
    const productItemsMap = productItems.reduce(
        (map, item) => ({...map, [item.ProductCode]: item}),
        {}
    )

    const variants = productItems?.map((product) => {
        const productItem = productItemsMap[product.ProductCode]
        return {
            ...productItem,
            ...product,
            price: productItem.AdjustedLineAmount
        }
    })

    return (
        <>
            {variants?.map((variant, index) => {
                return (
                    <Box
                        p={[4, 6]}
                        key={index}
                        border="1px solid"
                        borderColor="gray.100"
                        borderRadius="base"
                    >
                        <ItemVariantProvider variant={variant} currency={currency}>
                            <Flex width="full" alignItems="flex-start">
                                <CartItemVariantImage width={['88px', 36]} mr={4} />
                                <Stack spacing={1} marginTop="-3px" flex={1}>
                                    <CartItemVariantName />
                                    <Flex
                                        width="full"
                                        justifyContent="space-between"
                                        alignItems="flex-end"
                                    >
                                        <CartItemVariantAttributes
                                            includeQuantity={variant.Quantity}
                                            currency={currency}
                                        />
                                        <CartItemVariantPrice currency={currency} />
                                    </Flex>
                                </Stack>
                            </Flex>
                        </ItemVariantProvider>
                    </Box>
                )
            })}
        </>
    )
}

OrderProducts.propTypes = {
    productItems: PropTypes.array.isRequired,
    currency: PropTypes.string
}

const OrderTrackingDetail = ({orderData}) => {
    const {formatMessage, formatDate} = useIntl()
    const isLoading = !orderData
    const shippingAddress = orderData.OrderDeliveryGroupSummary
    const shippingMethod = orderData.OrderDeliveryGroupSummary.OrderDeliveryMethod.Name
    const trackingNumber = orderData.OrderSummary.PoNumber
    const shippingStatus = orderData.OrderSummary.Status
    const paymentCard = orderData?.paymentInstrument
    const CardIcon = getCreditCardIcon(paymentCard?.cardType)
    const itemCount = orderData?.lineItems.reduce((count, item) => item.Quantity + count, 0) || 0

    return (
        <Stack spacing={6} data-testid="account-order-details-page">
            <Stack>
                <Stack spacing={[1, 2]}>

                    {!isLoading ? (
                        <Stack
                            direction={['column', 'row']}
                            alignItems={['flex-start', 'center']}
                            spacing={[0, 3]}
                            divider={
                                <Divider
                                    visibility={{base: 'hidden', lg: 'visible'}}
                                    orientation={{lg: 'vertical'}}
                                    h={[0, 4]}
                                />
                            }
                        >
                            <Text fontSize={['sm', 'md']}>
                                <FormattedMessage
                                    defaultMessage="Ordered: {date}"
                                    id="account_order_detail.label.ordered_date"
                                    values={{
                                        date: formatDate(
                                            new Date(orderData.OrderSummary.CreatedDate),
                                            {
                                                year: 'numeric',
                                                day: 'numeric',
                                                month: 'short'
                                            }
                                        )
                                    }}
                                />
                            </Text>
                            <Stack direction="row" alignItems="center">
                                <Text fontSize={['sm', 'md']}>
                                    <FormattedMessage
                                        defaultMessage="Order Number: {orderNumber}"
                                        id="account_order_detail.label.order_number"
                                        values={{orderNumber: orderData.OrderSummary.OrderNumber}}
                                    />
                                </Text>
                                <Badge colorScheme="green">{orderData.OrderSummary.Status}</Badge>
                                <TrackingNumber trackingID={trackingNumber} size="1" />
                            </Stack>
                        </Stack>
                    ) : (
                        <Skeleton h="20px" w="192px" />
                    )}
                </Stack>
            </Stack>

            <Box layerStyle="cardBordered">
                <Grid templateColumns={{base: '1fr', xl: '60% 1fr'}} gap={{base: 6, xl: 2}}>
                    <SimpleGrid columns={{base: 1, sm: 2}} columnGap={4} rowGap={5} py={{xl: 6}}>
                        {isLoading ? (
                            <>
                                <Stack>
                                    <Skeleton h="20px" w="84px" />
                                    <Skeleton h="20px" w="112px" />
                                    <Skeleton h="20px" w="56px" />
                                </Stack>
                                <Stack>
                                    <Skeleton h="20px" w="84px" />
                                    <Skeleton h="20px" w="56px" />
                                </Stack>
                                <Stack>
                                    <Skeleton h="20px" w="112px" />
                                    <Skeleton h="20px" w="84px" />
                                    <Skeleton h="20px" w="56px" />
                                </Stack>
                                <Stack>
                                    <Skeleton h="20px" w="60px" />
                                    <Skeleton h="20px" w="84px" />
                                    <Skeleton h="20px" w="56px" />
                                </Stack>
                            </>
                        ) : (
                            <>
                                <Stack spacing={1}>
                                    <Text fontWeight="bold" fontSize="sm">
                                        <FormattedMessage
                                            defaultMessage="Shipping Method"
                                            id="account_order_detail.heading.shipping_method"
                                        />
                                    </Text>
                                    <Box>
                                        <Text fontSize="sm" textTransform="titlecase">
                                            {
                                                {
                                                    not_shipped: formatMessage({
                                                        defaultMessage: 'Not shipped',
                                                        id: 'account_order_detail.shipping_status.not_shipped'
                                                    }),

                                                    part_shipped: formatMessage({
                                                        defaultMessage: 'Partially shipped',
                                                        id: 'account_order_detail.shipping_status.part_shipped'
                                                    }),
                                                    shipped: formatMessage({
                                                        defaultMessage: 'Shipped',
                                                        id: 'account_order_detail.shipping_status.shipped'
                                                    })
                                                }[shippingStatus]
                                            }
                                        </Text>
                                        <Text fontSize="sm">{shippingMethod}</Text>
                                        <Text fontSize="sm">
                                            <FormattedMessage
                                                defaultMessage="Tracking Number"
                                                id="account_order_detail.label.tracking_number"
                                            />
                                            :{' '}
                                            {trackingNumber ||
                                                formatMessage({
                                                    defaultMessage: 'Pending',
                                                    id: 'account_order_detail.label.pending_tracking_number'
                                                })}
                                        </Text>
                                    </Box>
                                </Stack>
                                <Stack spacing={1}>
                                    <Text fontWeight="bold" fontSize="sm">
                                        <FormattedMessage
                                            defaultMessage="Payment Method"
                                            id="account_order_detail.heading.payment_method"
                                        />
                                    </Text>
                                    <Stack direction="row">
                                        {CardIcon && <CardIcon layerStyle="ccIcon" />}
                                        <Box>
                                            <Text fontSize="sm">{paymentCard?.cardType}</Text>
                                            <Stack direction="row">
                                                <Text fontSize="sm">
                                                    &bull;&bull;&bull;&bull;{' '}
                                                    {paymentCard?.numberLastDigits}
                                                </Text>
                                                <Text fontSize="sm">
                                                    {paymentCard?.expirationMonth}/
                                                    {paymentCard?.expirationYear}
                                                </Text>
                                            </Stack>
                                        </Box>
                                    </Stack>
                                </Stack>
                                <Stack spacing={1}>
                                    <Text fontWeight="bold" fontSize="sm">
                                        <FormattedMessage
                                            defaultMessage="Shipping Address"
                                            id="account_order_detail.heading.shipping_address"
                                        />
                                    </Text>
                                    <Box>
                                        <Text fontSize="sm">{shippingAddress.DeliverToName}</Text>
                                        <Text fontSize="sm">
                                            {shippingAddress.DeliverToAddress.street}
                                        </Text>
                                        <Text fontSize="sm">
                                            {shippingAddress.DeliverToAddress.city},
                                            {shippingAddress.DeliverToAddress.state}{' '}
                                            {shippingAddress.DeliverToAddress.postalCode}
                                        </Text>
                                    </Box>
                                </Stack>
                                <Stack spacing={1}>
                                    <Text fontWeight="bold" fontSize="sm">
                                        <FormattedMessage
                                            defaultMessage="Billing Address"
                                            id="account_order_detail.heading.billing_address"
                                        />
                                    </Text>
                                    <Box>
                                        {/* <Text fontSize="sm">
                                            {orderData.billingAddress.firstName}{' '}
                                            {order.billingAddress.lastName}
                                        </Text> */}
                                        <Text fontSize="sm">
                                            {orderData.OrderSummary.BillingAddress.street}
                                        </Text>
                                        <Text fontSize="sm">
                                            {orderData.OrderSummary.BillingAddress.city},{' '}
                                            {orderData.OrderSummary.BillingAddress.state}{' '}
                                            {orderData.OrderSummary.BillingAddress.postalCode}
                                        </Text>
                                    </Box>
                                </Stack>
                            </>
                        )}
                    </SimpleGrid>

                    {!isLoading ? (
                        <Box
                            py={{base: 6}}
                            px={{base: 6, xl: 8}}
                            background="gray.50"
                            borderRadius="base"
                        >
                            <OrderSummary basket={orderData} fontSize="sm" />
                        </Box>
                    ) : (
                        <Skeleton h="full" />
                    )}
                </Grid>
            </Box>

            <Stack spacing={4}>
                {!isLoading && (
                    <Text>
                        <FormattedMessage
                            defaultMessage="{count} items"
                            values={{count: itemCount}}
                            id="account_order_detail.heading.num_of_items"
                        />
                    </Text>
                )}

                <Stack spacing={4}>
                    {isLoading ? (
                        [1, 2, 3].map((i) => (
                            <Box
                                key={i}
                                p={[4, 6]}
                                border="1px solid"
                                borderColor="gray.100"
                                borderRadius="base"
                            >
                                <Flex width="full" align="flex-start">
                                    <Skeleton boxSize={['88px', 36]} mr={4} />

                                    <Stack spacing={2}>
                                        <Skeleton h="20px" w="112px" />
                                        <Skeleton h="20px" w="84px" />
                                        <Skeleton h="20px" w="140px" />
                                    </Stack>
                                </Flex>
                            </Box>
                        ))
                    ) : (
                        <OrderProducts
                            productItems={orderData.lineItems}
                            currency={orderData.currency}
                        />
                    )}
                </Stack>
            </Stack>
        </Stack>
    )
}

OrderTrackingDetail.getTemplateName = () => 'order-history'

export default OrderTrackingDetail
