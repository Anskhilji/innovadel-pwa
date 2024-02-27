/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, { Fragment, useEffect } from 'react'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import {
    Show,
    Box,
    Button,
    Container,
    Flex,
    Heading,
    SimpleGrid,
    Spacer,
    Stack,
    Text,
    Alert,
    AlertIcon,
    Divider
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useOrder, useProducts, useAuthHelper, AuthHelpers } from '@salesforce/commerce-sdk-react'
import { getCreditCardIcon } from '@salesforce/retail-react-app/app/utils/cc-utils'
import useNavigation from '@salesforce/retail-react-app/app/hooks/use-navigation'
import Link from '@salesforce/retail-react-app/app/components/link'
import AddressDisplay from '@salesforce/retail-react-app/app/components/address-display'
import PostCheckoutRegistrationFields from '@salesforce/retail-react-app/app/components/forms/post-checkout-registration-fields'
import PromoPopover from '@salesforce/retail-react-app/app/components/promo-popover'
import ItemVariantProvider from '@salesforce/retail-react-app/app/components/item-variant'
import CartItemVariantImage from '@salesforce/retail-react-app/app/components/item-variant/item-image'
import CartItemVariantName from '../../components/item-variant/item-name'
import CartItemVariantAttributes from '@salesforce/retail-react-app/app/components/item-variant/item-attributes'
import CartItemVariantPrice from '../../components/item-variant/item-price'
import { useCurrentCustomer } from '@salesforce/retail-react-app/app/hooks/use-current-customer'
import { API_ERROR_MESSAGE } from '@salesforce/retail-react-app/app/constants'
import {PaypalIcon} from '../../components/icons'

import ConfirmationCheck from '../../../../app/components/confirmation-check'
import TagManager from 'react-gtm-module'
import {useOrderConfirmation} from '../../hooks'

const onClient = typeof window !== 'undefined'

const CheckoutConfirmation = () => {
    const { orderNo } = useParams()
    const navigate = useNavigation()
    const { data: customer } = useCurrentCustomer()
    const register = useAuthHelper(AuthHelpers.Register)
    const orderConfirmation = useOrderConfirmation()

    const { data: order } = useOrder(
        {
            parameters: { orderNo }
        },
        {
            enabled: !!orderNo && onClient
        }
    )
    const itemIds = order?.productItems.map((item) => item.productId)
    const { data: products } = useProducts({ parameters: { ids: itemIds?.join(',') } })
    const productItemsMap = products?.data.reduce((map, item) => ({ ...map, [item.id]: item }), {})
    const form = useForm()

    useEffect(() => {
        form.reset({
            email: order?.customerInfo?.email || '',
            password: '',
            firstName: order?.billingAddress?.firstName,
            lastName: order?.billingAddress?.lastName
        })
    }, [order])

    if (!order || !order.orderNo) {
        return null
    }

    const CardIcon = getCreditCardIcon(order.paymentInstruments[0].paymentCard?.cardType)
    // Custom start: paypal integration
    var paymentInstrument = order.paymentInstruments[0]
    var paymentMethodId = paymentInstrument && paymentInstrument.paymentMethodId
    var paypalToken =
        paymentMethodId === 'PayPal'
            ? JSON.parse(paymentInstrument.paymentCard.creditCardToken)
            : ''
    var orderEmail = paymentMethodId === 'PayPal' && paypalToken ? paypalToken.userEmail : ''
    var emailPaypal = paymentMethodId === 'PayPal' ? orderEmail : ''
    // Custom end

    const submitForm = async (data) => {
        try {
            const body = {
                customer: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    login: data.email
                },
                password: data.password
            }
            await register.mutateAsync(body)

            navigate(`/account`)
        } catch (error) {
            if (!error.response) {
                form.setError('global', { type: 'manual', message: API_ERROR_MESSAGE })
                return
            }
            const json = await error.response.json()

            const existingAccountMessage = (
                <Fragment>
                    <FormattedMessage
                        defaultMessage="This email already has an account."
                        id="checkout_confirmation.message.already_has_account"
                    />
                    &nbsp;
                    <Link to="/login" color="blue.600">
                        <FormattedMessage
                            defaultMessage="Log in here"
                            id="checkout_confirmation.link.login"
                        />
                    </Link>
                </Fragment>
            )

            const message = /the login is already in use/i.test(json.detail)
                ? existingAccountMessage
                : API_ERROR_MESSAGE

            form.setError('global', { type: 'manual', message })
        }
    }

    /**************** Custom start: Checkout detail into GTM dataLayer ****************/
    const { currency, shippingTotal, taxTotal, productTotal } = order;
    useEffect(() => {
        if (order?.productItems?.length) {
            const tagManagerArgs = {
                dataLayer: {
                    event: 'order_confirmation',
                    ecommerce: {
                        checkout: {
                            products: order?.productItems.map((productItem) => {
                                return {
                                    id: productItem.productId,
                                    name: productItem.productName,
                                    price: productItem.price,
                                    productQuantity: productItem.quantity,
                                    category: productItem.category,
                                    currency: currency,
                                    tax: taxTotal,
                                    shipping: shippingTotal,
                                    subTotal: productTotal
                                }
                            })
                        }
                    }
                }
            }
            TagManager.initialize(tagManagerArgs)
        }
    }, [])

    /**************** Custom end ****************/

    // Custom endpoint from headless to trigger marketing cloud email on order confirmation page
    const handleOrderConfirmation = (order) => {
        try {
            orderConfirmation.orderConfirm(order.orderNo)
        } catch (error) {
            console.log(error)
        }
    }
    handleOrderConfirmation(order)
    // Custom end

    return (
        <Box layerStyle="card">
            <Container>
                <Flex justifyContent={"space-between"} layerStyle="card" direction={{ base: 'column', md: 'row' }} gap={50}>
                    <Box width={"100%"}>
                        <Container variant="form">
                            <Flex gap={35} >
                                <ConfirmationCheck />
                                <Box>
                                    <Text fontSize={14}>
                                        <FormattedMessage
                                            defaultMessage="Order"
                                            id="checkout_confirmation.label.order_number"
                                        />
                                        {' '}
                                        <Text as="span">
                                            {order.orderNo}
                                        </Text>
                                    </Text>
                                    <Heading fontSize={32}>
                                        <FormattedMessage
                                            defaultMessage="Thank you"
                                            id="checkout_confirmation.heading.thank_you_for_order"
                                        />
                                    </Heading>

                                </Box>
                            </Flex>
                        </Container>

                        <Box rounded={[0, 0, 'base']} px={[4, 4, 6]} py={[6, 6, 8]}>
                            <Container variant="form">
                                <Stack spacing={6}>
                                    <Heading fontSize={32}>
                                        <FormattedMessage
                                            defaultMessage="Your Order is Confirmed"
                                            id="checkout_confirmation.heading.order_is_confirmed"
                                        />
                                    </Heading>
                                    <Text>
                                        <FormattedMessage
                                            defaultMessage="We will send an email to <b>{email}</b> with your confirmation number and receipt shortly."
                                            id="checkout_confirmation.message.will_email_shortly"
                                            values={{
                                                b: (chunks) => <b>{chunks}</b>,
                                                email: order.customerInfo.email
                                            }}
                                        />
                                    </Text>
                                </Stack>
                            </Container>
                        </Box>

                        <Box rounded={[0, 0, 'base']} px={[4, 4, 6]} py={[6, 6, 8]}>
                            <Container variant="form">
                                <Stack spacing={6}>
                                    <Heading fontSize="32px">
                                        <FormattedMessage
                                            defaultMessage="Order Summary"
                                            id="checkout_confirmation.heading.order_summary"
                                        />
                                    </Heading>
                                </Stack>
                            </Container>
                        </Box>
                        <Box rounded={[0, 0, 'base']} px={[4, 4, 6]} py={[6, 6, 8]}>
                            <Container variant="form">
                                <Heading fontSize="32px">
                                    <FormattedMessage
                                        defaultMessage="Item Details"
                                        id="checkout_confirmation.heading.item_details"
                                    />
                                </Heading>

                                <Stack spacing={4}>
                                    <Text>
                                        <FormattedMessage
                                            description="# item(s) in order"
                                            defaultMessage="{itemCount, plural, =0 {0 items} one {# item} other {# items}}"
                                            values={{
                                                itemCount: order.productItems.reduce(
                                                    (a, b) => a + b.quantity,
                                                    0
                                                )
                                            }}
                                            id="checkout_confirmation.message.num_of_items_in_order"
                                        />
                                    </Text>

                                    <Stack spacing={5} align="flex-start">
                                        <Stack
                                            spacing={5}
                                            align="flex-start"
                                            width="full"
                                            divider={<Divider />}
                                        >
                                            {order.productItems?.map((product, idx) => {
                                                const productDetail =
                                                    productItemsMap?.[product.productId] || {}
                                                const variant = {
                                                    ...product,
                                                    ...productDetail,
                                                    price: product.price
                                                }

                                                return (
                                                    <ItemVariantProvider
                                                        key={product.productId}
                                                        index={idx}
                                                        variant={variant}
                                                    >
                                                        <Flex width="full" alignItems="flex-start">
                                                            <CartItemVariantImage
                                                                width="80px"
                                                                mr={2}
                                                            />
                                                            <Stack
                                                                spacing={1}
                                                                marginTop="-3px"
                                                                flex={1}
                                                            >
                                                                <CartItemVariantName />
                                                                <Flex
                                                                    width="full"
                                                                    justifyContent="space-between"
                                                                    alignItems="flex-end"
                                                                >
                                                                    <CartItemVariantAttributes
                                                                        includeQuantity
                                                                    />
                                                                    <CartItemVariantPrice />
                                                                </Flex>
                                                            </Stack>
                                                        </Flex>
                                                    </ItemVariantProvider>
                                                )
                                            })}
                                        </Stack>

                                        <Stack w="full" py={4} borderY="1px" borderColor="gray.200">
                                            <Flex justify="space-between">
                                                <Text fontWeight="bold">
                                                    <FormattedMessage
                                                        defaultMessage="Subtotal"
                                                        id="checkout_confirmation.label.subtotal"
                                                    />
                                                </Text>
                                                <Text fontWeight="bold">
                                                    <FormattedNumber
                                                        style="currency"
                                                        currency={order?.currency}
                                                        value={order?.productSubTotal}
                                                    />
                                                </Text>
                                            </Flex>
                                            {order.orderPriceAdjustments?.map((adjustment) => (
                                                <Flex
                                                    justify="space-between"
                                                    key={adjustment.priceAdjustmentId}
                                                >
                                                    <Text>{adjustment.itemText}</Text>
                                                    <Text color="green.500">
                                                        <FormattedNumber
                                                            style="currency"
                                                            currency={order?.currency}
                                                            value={adjustment.price}
                                                        />
                                                    </Text>
                                                </Flex>
                                            ))}
                                            <Flex justify="space-between">
                                                <Flex alignItems="center">
                                                    <Text lineHeight={1}>
                                                        <FormattedMessage
                                                            defaultMessage="Shipping"
                                                            id="checkout_confirmation.label.shipping"
                                                        />
                                                        {order.shippingItems[0].priceAdjustments
                                                            ?.length > 0 && (
                                                                <Text as="span" ml={1}>
                                                                    (
                                                                    <FormattedMessage
                                                                        defaultMessage="Promotion applied"
                                                                        id="checkout_confirmation.label.promo_applied"
                                                                    />
                                                                    )
                                                                </Text>
                                                            )}
                                                    </Text>
                                                    {order.shippingItems?.[0]?.priceAdjustments
                                                        ?.length > 0 && (
                                                            <PromoPopover ml={2}>
                                                                <Stack>
                                                                    {order.shippingItems[0].priceAdjustments?.map(
                                                                        (adjustment) => (
                                                                            <Text
                                                                                key={
                                                                                    adjustment.priceAdjustmentId
                                                                                }
                                                                                fontSize="sm"
                                                                            >
                                                                                {adjustment.itemText}
                                                                            </Text>
                                                                        )
                                                                    )}
                                                                </Stack>
                                                            </PromoPopover>
                                                        )}
                                                </Flex>

                                                {order.shippingItems[0].priceAdjustments?.some(
                                                    ({ appliedDiscount }) =>
                                                        appliedDiscount?.type === 'free'
                                                ) ? (
                                                    <Text
                                                        as="span"
                                                        color="green.500"
                                                        textTransform="uppercase"
                                                    >
                                                        <FormattedMessage
                                                            defaultMessage="Free"
                                                            id="checkout_confirmation.label.free"
                                                        />
                                                    </Text>
                                                ) : (
                                                    <Text>
                                                        <FormattedNumber
                                                            value={order.shippingTotal}
                                                            style="currency"
                                                            currency={order.currency}
                                                        />
                                                    </Text>
                                                )}
                                            </Flex>
                                            <Flex justify="space-between">
                                                <Text>
                                                    <FormattedMessage
                                                        defaultMessage="Tax"
                                                        id="checkout_confirmation.label.tax"
                                                    />
                                                </Text>
                                                <Text>
                                                    <FormattedNumber
                                                        value={order.taxTotal}
                                                        style="currency"
                                                        currency={order.currency}
                                                    />
                                                </Text>
                                            </Flex>
                                        </Stack>

                                        <Flex w="full" justify="space-between">
                                            <Text fontWeight="bold">
                                                <FormattedMessage
                                                    defaultMessage="Order Total"
                                                    id="checkout_confirmation.label.order_total"
                                                />
                                            </Text>
                                            <Text fontWeight="bold">
                                                <FormattedNumber
                                                    style="currency"
                                                    currency={order?.currency}
                                                    value={order?.orderTotal}
                                                />
                                            </Text>
                                        </Flex>
                                    </Stack>
                                </Stack>

                                <Show below="md">
                                    <Spacer />
                                    <Button as={Link} href="/" variant="solid" width="100%" mt={31}>
                                        <FormattedMessage
                                            defaultMessage="Continue Shopping"
                                            id="checkout_confirmation.link.continue_shopping"
                                        />
                                    </Button>
                                </Show>
                            </Container>
                        </Box>
                        <Box rounded={[0, 0, 'base']} px={[4, 4, 6]} py={[6, 6, 8]}>
                            <Container variant="form">
                                <Stack spacing={6}>
                                    <Heading fontSize="lg">
                                        <FormattedMessage
                                            defaultMessage="Delivery Details"
                                            id="checkout_confirmation.heading.delivery_details"
                                        />
                                    </Heading>

                                    <SimpleGrid columns={[1, 1, 2]} spacing={6}>
                                        <Stack spacing={1}>
                                            <Heading as="h3" fontSize="sm">
                                                <FormattedMessage
                                                    defaultMessage="Shipping Address"
                                                    id="checkout_confirmation.heading.shipping_address"
                                                />
                                            </Heading>
                                            <AddressDisplay
                                                address={order.shipments[0].shippingAddress}
                                            />
                                        </Stack>

                                        <Stack spacing={1}>
                                            <Heading as="h3" fontSize="sm">
                                                <FormattedMessage
                                                    defaultMessage="Shipping Method"
                                                    id="checkout_confirmation.heading.shipping_method"
                                                />
                                            </Heading>
                                            <Box>
                                                <Text>{order.shipments[0].shippingMethod.name}</Text>
                                                <Text>
                                                    {order.shipments[0].shippingMethod.description}
                                                </Text>
                                            </Box>
                                        </Stack>
                                    </SimpleGrid>
                                </Stack>
                            </Container>
                        </Box>

                        <Box rounded={[0, 0, 'base']} px={[4, 4, 6]} py={[6, 6, 8]}>
                            <Container variant="form">
                                <Stack spacing={6}>
                                    <Heading fontSize="lg">
                                        <FormattedMessage
                                            defaultMessage="Payment Details"
                                            id="checkout_confirmation.heading.payment_details"
                                        />
                                    </Heading>

                                    <SimpleGrid columns={[1, 1, 2]} spacing={6}>
                                        <Stack spacing={1}>
                                            <Heading as="h3" fontSize="sm">
                                                <FormattedMessage
                                                    defaultMessage="Billing Address"
                                                    id="checkout_confirmation.heading.billing_address"
                                                />
                                            </Heading>
                                            <AddressDisplay address={order.billingAddress} />
                                        </Stack>

                                        <Stack spacing={1}>
                                            <Stack direction="row">
                                                {/* Custom Code for paypal integration :Start */}
                                                {paymentMethodId === 'PayPal' && (
                                                    <Box>
                                                        <PaypalIcon width="auto" height="20px" />
                                                        <Box>{emailPaypal}</Box>
                                                    </Box>
                                                )}

                                                {paymentMethodId === 'CREDIT_CARD' && (
                                                    <>
                                                        <Heading as="h3" fontSize="sm">
                                                            <FormattedMessage
                                                                defaultMessage="Credit Card"
                                                                id="checkout_confirmation.heading.credit_card"
                                                            />
                                                        </Heading>

                                                        {CardIcon && <CardIcon layerStyle="ccIcon" />}

                                                        <Box>
                                                            <Text>
                                                                {
                                                                    order.paymentInstruments[0].paymentCard
                                                                        ?.cardType
                                                                }
                                                            </Text>
                                                            <Stack direction="row">
                                                                <Text>
                                                                    &bull;&bull;&bull;&bull;{' '}
                                                                    {
                                                                        order.paymentInstruments[0].paymentCard
                                                                            ?.numberLastDigits
                                                                    }
                                                                </Text>
                                                                <Text>
                                                                    {
                                                                        order.paymentInstruments[0].paymentCard
                                                                            ?.expirationMonth
                                                                    }
                                                                    /
                                                                    {
                                                                        order.paymentInstruments[0].paymentCard
                                                                            ?.expirationYear
                                                                    }
                                                                </Text>
                                                            </Stack>
                                                        </Box>
                                                    </>
                                                )}
                                                {/* Custom Code for paypal integration :End */}
                                            </Stack>
                                        </Stack>
                                    </SimpleGrid>
                                </Stack>
                            </Container>
                        </Box>

                        <Show above="md">
                            <Container variant="form">
                                <Spacer />
                                <Button as={Link} href="/" variant="solid" width="100%">
                                    <FormattedMessage
                                        defaultMessage="Continue Shopping"
                                        id="checkout_confirmation.link.continue_shopping"
                                    />
                                </Button>
                            </Container>
                        </Show>
                    </Box>

                    <Box width={"100%"}>

                    {customer.isGuest && (
                            <Box
                                layerStyle="card"
                                rounded={[0, 0, 'base']}
                                px={[4, 4, 6]}
                                py={[6, 6, 8]}
                            >
                                <Container variant="form">
                                    <Heading fontSize="lg" marginBottom={6}>
                                        <FormattedMessage
                                            defaultMessage="Create an account for faster checkout"
                                            id="checkout_confirmation.heading.create_account"
                                        />
                                    </Heading>

                                    <form onSubmit={form.handleSubmit(submitForm)}>
                                        <Stack spacing={4}>
                                            {form.formState.errors?.global && (
                                                <Alert status="error">
                                                    <AlertIcon />
                                                    {form.formState.errors.global.message}
                                                </Alert>
                                            )}

                                            <PostCheckoutRegistrationFields form={form} />

                                            <Button
                                                type="submit"
                                                width="full"
                                                onClick={() => form.clearErrors('global')}
                                                isLoading={form.formState.isSubmitting}
                                            >
                                                <FormattedMessage
                                                    defaultMessage="Create Account"
                                                    id="checkout_confirmation.button.create_account"
                                                />
                                            </Button>
                                        </Stack>
                                    </form>
                                </Container>
                            </Box>
                        )}
                    </Box>
                </Flex>
            </Container>
        </Box>
    )
}

export default CheckoutConfirmation
