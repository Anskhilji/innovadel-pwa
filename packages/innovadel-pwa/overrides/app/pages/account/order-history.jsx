/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, { useEffect } from 'react'
import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl'
import { useLocation } from 'react-router'
import {
    Box,
    Heading,
    Text,
    Stack,
    Badge,
    Flex,
    Button,
    Divider,
    Grid,
    AspectRatio,
    Img,
    Skeleton
} from '@salesforce/retail-react-app/app/components/shared/ui'
import {
    Show
} from '@chakra-ui/react'
import { useCurrentCustomer } from '@salesforce/retail-react-app/app/hooks/use-current-customer'
import { useCustomerOrders, useProducts } from '@salesforce/commerce-sdk-react'
import useNavigation from '@salesforce/retail-react-app/app/hooks/use-navigation'
import { usePageUrls, useSearchParams } from '@salesforce/retail-react-app/app/hooks'
import PageActionPlaceHolder from '@salesforce/retail-react-app/app/components/page-action-placeholder'
import Link from '@salesforce/retail-react-app/app/components/link'
import { ChevronRightIcon, ReceiptIcon } from '@salesforce/retail-react-app/app/components/icons'
import Pagination from '@salesforce/retail-react-app/app/components/pagination'
import PropTypes from 'prop-types'
import { DEFAULT_ORDERS_SEARCH_PARAMS } from '@salesforce/retail-react-app/app/constants'

import TrackingNumber from '@innovadel/order-managment/app/components/tracking_number/index'

const OrderProductImages = ({ productItems }) => {
    const ids = productItems.map((item) => item.productId).join(',') ?? ''
    const { data: { data: products } = {}, isLoading } = useProducts({
        parameters: {
            ids: ids
        }
    })

    const images = products?.map((product) => {
        return product?.imageGroups?.find((group) => group.viewType === 'small').images[0]
    })

    return (
        <>
            {!isLoading && products
                ? images.map((image, index) => {
                    return (
                        <AspectRatio
                            key={index}
                            ratio={1}
                            width="88px"
                            w="88px"
                            borderRadius="base"
                            overflow="hidden"
                        >
                            <Img
                                alt={image?.alt}
                                src={image?.disBaseLink || image?.link}
                                fallback={<Box background="gray.100" boxSize="full" />}
                            />
                        </AspectRatio>
                    )
                })
                : productItems.map((item, index) => {
                    return <Skeleton key={index} h="88px" w="88px" />
                })}
        </>
    )
}
OrderProductImages.propTypes = {
    productItems: PropTypes.array
}

const onClient = typeof window !== 'undefined'
const AccountOrderHistory = () => {
    const location = useLocation()
    const { formatMessage, formatDate } = useIntl()
    const navigate = useNavigation()

    const { data: customer } = useCurrentCustomer()
    const { customerId } = customer

    const searchParams = useSearchParams(DEFAULT_ORDERS_SEARCH_PARAMS)
    const { limit, offset } = searchParams[0]

    const { data: { data: orders, ...paging } = {}, isLoading } = useCustomerOrders(
        {
            parameters: { customerId, limit, offset }
        },
        { enabled: onClient && !!customerId }
    )

    const hasOrders = orders?.length > 0

    const pageUrls = usePageUrls({ total: paging.total, limit })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [customer, searchParams.offset])

    return (
        <Stack spacing={4} data-testid="account-order-history-page">
            <Stack>
                <Heading as="h1" fontSize="34px" fontWeight='600'>  {/* custom code for order history styling */}
                    <FormattedMessage
                        defaultMessage="Order History"
                        id="account_order_history.title.order_history"
                    />
                </Heading>
            </Stack>

            {isLoading ? (
                [1, 2, 3].map((i) => (
                    <Stack key={i} spacing={4} layerStyle="cardBordered">
                        <Stack spacing={2}>
                            <Skeleton h="20px" w="112px" />
                            <Skeleton h="20px" w="200px" />
                        </Stack>
                        <Grid templateColumns={{ base: 'repeat(auto-fit, 88px)' }} gap={4}>
                            {Array.from(Array(4).keys()).map((i) => (
                                <Skeleton key={i} w="88px" h="88px" />
                            ))}
                        </Grid>
                        <Skeleton h="20px" w="200px" />
                    </Stack>
                ))
            ) : (
                <Stack spacing={4}>
                    {orders?.map((order) => {
                        return (
                            <Stack key={order.orderNo} spacing={4} layerStyle="cardBordered">
                                <Stack
                                    alignItems={{ base: 'flex-start', lg: 'left' }} // custom code for order attributes styling
                                >
                                    <Flex justifyContent="space-between"
                                        alignItems="center"
                                        width='100%'
                                    >
                                        <Grid templateColumns={{ base: 'repeat(auto-fit, 88px)' }} gap={4} display="flex" width='33%'>
                                            <OrderProductImages productItems={order.productItems} />
                                        </Grid>
                                        <Text fontWeight="700" fontSize="18px">
                                            <FormattedMessage
                                                defaultMessage="{count} items"
                                                id="account_order_history.label.num_of_items"
                                                description="Number of items in order"
                                                values={{ count: order.productItems.length }}
                                            />
                                        </Text>
                                        <Show above="md">
                                            <Button
                                                as={Link}
                                                to={`/account/orders/${order.orderNo}`}
                                                variant="solid"
                                                textDecoration='none'
                                                fontSize={{ base: 'sm', lg: 'md' }}
                                            >
                                                <FormattedMessage
                                                    defaultMessage="View details"
                                                    id="account_order_history.link.view_details"
                                                />
                                            </Button>
                                        </Show>
                                    </Flex>
                                    <Flex justifyContent='space-between' fontWeight="700" fontSize="16px" width={{ base: '100%', md: 'auto' }}>
                                        <Box mr={2}>
                                            <FormattedMessage
                                                defaultMessage="Ordered:"
                                                id="account_order_history.label.order_date"
                                            />
                                        </Box>
                                        <Box paddingX={{ lg: '0', xl: '47' }}>
                                            <FormattedMessage
                                                defaultMessage="{date}"
                                                values={{
                                                    date: formatDate(new Date(order.creationDate), {
                                                        year: 'numeric',
                                                        day: 'numeric',
                                                        month: 'short'
                                                    })
                                                }}
                                            />
                                        </Box>
                                    </Flex>
                                    <Flex justifyContent='space-between' width={{ base: '100%', md: 'auto' }} fontWeight="500" fontSize="16px">
                                        <Box mr={2}>
                                            <Text>
                                                <FormattedMessage
                                                    defaultMessage="Order No:"
                                                    id="account_order_history.label.order_no"
                                                />
                                            </Text>
                                        </Box>
                                        <Box paddingX={{ lg: '0', xl: '47' }}>
                                            <FormattedMessage
                                                defaultMessage="{orderNumber}"
                                                values={{ orderNumber: order.orderNo }}
                                            />

                                        </Box>
                                    </Flex>
                                    <Flex justifyContent='space-between' width={{ base: '100%', md: 'auto' }}>
                                        <Box mr={2}>
                                            <Text fontWeight="500" fontSize="16px">
                                                <FormattedMessage
                                                    defaultMessage="Shipped To:"
                                                    id="account_order_history.label.ship_to"
                                                />
                                            </Text>
                                        </Box>
                                        <Box paddingX={{ lg: '0', xl: '8' }}>
                                            <Text fontWeight="500" fontSize="16px">
                                                <FormattedMessage
                                                    defaultMessage="{name}"
                                                    values={{
                                                        name: `${order.shipments[0].shippingAddress.firstName} ${order.shipments[0].shippingAddress.lastName}`
                                                    }}
                                                />
                                            </Text>
                                        </Box>
                                    </Flex>
                                    <TrackingNumber trackingID={order.shipments[0].c_trackingID} size="8" />
                                    <Flex justifyContent='space-between' width={{ base: '100%', md: 'auto' }}>
                                        <Box mr={2}>
                                            <Text fontWeight="700" fontSize="16px" >
                                                <FormattedMessage
                                                    defaultMessage="Total:"
                                                    id="account_order_history.label.total"
                                                />
                                            </Text>
                                        </Box>
                                        <Box paddingX={{ lg: '10', xl: '75' }}>
                                            <Text fontWeight="700" fontSize="16px">
                                                <FormattedNumber
                                                    style="currency"
                                                    currency={order.currency}
                                                    value={order.orderTotal}
                                                />
                                            </Text>
                                        </Box>
                                    </Flex>
                                    <Show below="md">
                                        <Button
                                            as={Link}
                                            to={`/account/orders/${order.orderNo}`}
                                            variant="solid"
                                            textDecoration='none'
                                            fontSize={{ base: 'sm', lg: 'md' }}
                                            width={"100%"}
                                        >
                                            <FormattedMessage
                                                defaultMessage="View details"
                                                id="account_order_history.link.view_details"
                                            />
                                        </Button>
                                    </Show>

                                </Stack>
                            </Stack>
                        )
                    })}

                    {hasOrders && orders?.length < paging.total && (
                        <Box pt={4}>
                            <Pagination
                                currentURL={`${location.pathname}${location.search}`}
                                urls={pageUrls}
                            />
                        </Box>
                    )}
                </Stack>
            )
            }

            {
                !hasOrders && !isLoading && (
                    <Stack data-testid="account-order-history-place-holder">
                        <PageActionPlaceHolder
                            icon={<ReceiptIcon boxSize={8} />}
                            heading={formatMessage({
                                defaultMessage: "You haven't placed an order yet.",
                                id: 'account_order_history.heading.no_order_yet'
                            })}
                            text={formatMessage({
                                defaultMessage:
                                    'Once you place an order the details will show up here.',
                                id: 'account_order_history.description.once_you_place_order'
                            })}
                            buttonText={formatMessage({
                                defaultMessage: 'Continue Shopping',
                                id: 'account_order_history.button.continue_shopping'
                            })}
                            buttonProps={{ leftIcon: undefined }}
                            onButtonClick={() => navigate('/')}
                        />
                    </Stack>
                )
            }
        </Stack >
    )
}

AccountOrderHistory.getTemplateName = () => 'account-order-history'

export default AccountOrderHistory
