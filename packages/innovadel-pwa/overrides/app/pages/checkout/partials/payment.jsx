/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {useContext, useState} from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage, useIntl} from 'react-intl'
import {Box, Button, Checkbox, Container, Heading, Stack, Text, Divider} from '@chakra-ui/react'
import {useForm} from 'react-hook-form'
import {useToast} from '@salesforce/retail-react-app/app/hooks/use-toast'
import {useShopperBasketsMutation} from '@salesforce/commerce-sdk-react'
import {useCurrentBasket} from '@salesforce/retail-react-app/app/hooks/use-current-basket'
import {useCheckout} from '@salesforce/retail-react-app/app/pages/checkout/util/checkout-context'
import {
    getPaymentInstrumentCardType,
    getCreditCardIcon
} from '@salesforce/retail-react-app/app/utils/cc-utils'
import {
    ToggleCard,
    ToggleCardEdit,
    ToggleCardSummary
} from '../../../components/toggle-card'
import PaymentForm from './payment-form'
import ShippingAddressSelection from '../../../pages/checkout/partials/shipping-address-selection'
import AddressDisplay from '@salesforce/retail-react-app/app/components/address-display'
// Custom start: local file import for overriding our changes
import {PromoCode, usePromoCode} from '../../../components/promo-code'
// Custom end
import {API_ERROR_MESSAGE} from '@salesforce/retail-react-app/app/constants'
import {PaypalContext} from '@innovadel/paypal/app/components/app-context/paypal-context'
import {PaypalIcon} from '../../../components/icons'

const Payment = () => {
    const {formatMessage} = useIntl()
    const {data: basket} = useCurrentBasket()
    const selectedShippingAddress = basket?.shipments && basket?.shipments[0]?.shippingAddress
    const selectedBillingAddress = basket?.billingAddress
    const appliedPayment = basket?.paymentInstruments && basket?.paymentInstruments[0]
    const [billingSameAsShipping, setBillingSameAsShipping] = useState(true) // By default, have billing addr to be the same as shipping

    const {paypalPaymentInstrument} = useContext(PaypalContext)
    const {selectedPaymentMethod} = useContext(PaypalContext)

    const {mutateAsync: addPaymentInstrumentToBasket} = useShopperBasketsMutation(
        'addPaymentInstrumentToBasket'
    )
    const {mutateAsync: updateBillingAddressForBasket} = useShopperBasketsMutation(
        'updateBillingAddressForBasket'
    )
    const {mutateAsync: removePaymentInstrumentFromBasket} = useShopperBasketsMutation(
        'removePaymentInstrumentFromBasket'
    )
    const showToast = useToast()
    const showError = () => {
        showToast({
            title: formatMessage(API_ERROR_MESSAGE),
            status: 'error'
        })
    }

    const {step, STEPS, goToStep, goToNextStep} = useCheckout()

    const billingAddressForm = useForm({
        mode: 'onChange',
        shouldUnregister: false,
        defaultValues: {...selectedBillingAddress}
    })

    // Using destructuring to remove properties from the object...
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {removePromoCode, ...promoCodeProps} = usePromoCode()

    const paymentMethodForm = useForm()

    const onPaymentSubmit = async (formValue) => {
        // The form gives us the expiration date as `MM/YY` - so we need to split it into
        // month and year to submit them as individual fields.

        // Custom Code for paypal integration :Start
        if (selectedPaymentMethod === 'paypal') {
            var token = JSON.stringify({
                payerID: paypalPaymentInstrument.payerID,
                orderID: paypalPaymentInstrument.orderID,
                facilitatorAccessToken: paypalPaymentInstrument.facilitatorAccessToken,
                userEmail: paypalPaymentInstrument.email
            })

            const paymentInstrument = {
                paymentMethodId: 'PayPal',
                amount: basket.orderTotal,
                paymentCard: {
                    creditCardToken: token
                }
            }

            return addPaymentInstrumentToBasket({
                parameters: {basketId: basket?.basketId},
                body: paymentInstrument
            })
        } else {
            const [expirationMonth, expirationYear] = formValue.expiry.split('/')

            const paymentInstrument = {
                paymentMethodId: 'CREDIT_CARD',
                amount: basket?.orderTotal,
                paymentCard: {
                    holder: formValue.holder,
                    issueNumber: formValue.number.replace(/ /g, ''),
                    cardType: getPaymentInstrumentCardType(formValue.cardType),
                    expirationMonth: parseInt(expirationMonth),
                    expirationYear: parseInt(`20${expirationYear}`)
                }
            }

            return addPaymentInstrumentToBasket({
                parameters: {basketId: basket?.basketId},
                body: paymentInstrument
            })
        }
        // Custom Code for paypal integration :End
    }
    const onBillingSubmit = async () => {
        const isFormValid = await billingAddressForm.trigger()

        if (!isFormValid) {
            return
        }
        const billingAddress = billingSameAsShipping
            ? selectedShippingAddress
            : billingAddressForm.getValues()
        // Using destructuring to remove properties from the object...
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {addressId, creationDate, lastModified, preferred, ...address} = billingAddress
        return updateBillingAddressForBasket({
            body: address,
            parameters: {basketId: basket.basketId, shipmentId: 'me'}
        })
    }
    const onPaymentRemoval = async () => {
        try {
            await removePaymentInstrumentFromBasket({
                parameters: {
                    basketId: basket.basketId,
                    paymentInstrumentId: appliedPayment.paymentInstrumentId
                }
            })
        } catch (e) {
            showError()
        }
    }

    const onSubmit = paymentMethodForm.handleSubmit(async (paymentFormValues) => {
        // Custom Code for paypal integration :Start
        if (selectedPaymentMethod === 'paypal' && paypalPaymentInstrument.orderID || selectedPaymentMethod === 'cc') {
            if (!appliedPayment) {
                await onPaymentSubmit(paymentFormValues)
            }
            await onBillingSubmit()
            goToNextStep()
        } else {
            showError()
        }
        // Custom Code for paypal integration :End
    })

    return (
        <ToggleCard
            id="step-3"
            title={formatMessage({defaultMessage: 'Payment', id: 'checkout_payment.title.payment'})}
            editing={step === STEPS.PAYMENT}
            isLoading={
                paymentMethodForm.formState.isSubmitting ||
                billingAddressForm.formState.isSubmitting
            }
            disabled={appliedPayment == null}
            onEdit={() => goToStep(STEPS.PAYMENT)}
        >
            <ToggleCardEdit>
                <Box mt={-2} mb={4}>
                    <PromoCode {...promoCodeProps} itemProps={{border: 'none'}} />
                </Box>

                <Stack spacing={6}>
                    {!appliedPayment?.paymentCard ? (
                        <PaymentForm form={paymentMethodForm} onSubmit={onPaymentSubmit} />
                    ) : (
                        <Stack spacing={3}>
                            {selectedPaymentMethod === 'cc' && (
                                <Heading as="h3" fontSize="md">
                                    <FormattedMessage
                                        defaultMessage="Credit Card"
                                        id="checkout_payment.heading.credit_card"
                                    />
                                </Heading>
                            )}
                            <Stack direction="row" spacing={4}>
                                <PaymentCardSummary payment={appliedPayment} />
                                <Button
                                    variant="link"
                                    size="sm"
                                    colorScheme="red"
                                    onClick={onPaymentRemoval}
                                >
                                    <FormattedMessage
                                        defaultMessage="Remove"
                                        id="checkout_payment.action.remove"
                                    />
                                </Button>
                            </Stack>
                        </Stack>
                    )}

                    <Divider borderColor="gray.1100" />

                    <Stack spacing={2}>
                        <Heading as="h3" fontSize="md">
                            <FormattedMessage
                                defaultMessage="Billing Address"
                                id="checkout_payment.heading.billing_address"
                            />
                        </Heading>

                        <Checkbox
                            name="billingSameAsShipping"
                            isChecked={billingSameAsShipping}
                            onChange={(e) => setBillingSameAsShipping(e.target.checked)}
                        >
                            <Text fontSize="sm" color="gray.700">
                                <FormattedMessage
                                    defaultMessage="Same as shipping address"
                                    id="checkout_payment.label.same_as_shipping"
                                />
                            </Text>
                        </Checkbox>

                        {billingSameAsShipping && selectedShippingAddress && (
                            <Box pl={7}>
                                <AddressDisplay address={selectedShippingAddress} />
                            </Box>
                        )}
                    </Stack>

                    {!billingSameAsShipping && (
                        <ShippingAddressSelection
                            form={billingAddressForm}
                            selectedAddress={selectedBillingAddress}
                            hideSubmitButton
                        />
                    )}

                    <Box pt={3}>
                        <Container variant="form">
                            <Button w="full" onClick={onSubmit}>
                                <FormattedMessage
                                    defaultMessage="Review Order"
                                    id="checkout_payment.button.review_order"
                                />
                            </Button>
                        </Container>
                    </Box>
                </Stack>
            </ToggleCardEdit>

            <ToggleCardSummary>
                <Stack spacing={6}>
                    {appliedPayment && (
                        <Stack spacing={3}>
                            {selectedPaymentMethod === 'cc' && (
                                <Heading as="h3" fontSize="md">
                                    <FormattedMessage
                                        defaultMessage="Credit Card"
                                        id="checkout_payment.heading.credit_card"
                                    />
                                </Heading>
                            )}
                            <PaymentCardSummary payment={appliedPayment} />
                        </Stack>
                    )}

                    <Divider borderColor="gray.1100" />

                    {selectedBillingAddress && (
                        <Stack spacing={2}>
                            <Heading as="h3" fontSize="md">
                                <FormattedMessage
                                    defaultMessage="Billing Address"
                                    id="checkout_payment.heading.billing_address"
                                />
                            </Heading>
                            <AddressDisplay address={selectedBillingAddress} />
                        </Stack>
                    )}
                </Stack>
            </ToggleCardSummary>
        </ToggleCard>
    )
}

const PaymentCardSummary = ({payment}) => {
    const CardIcon = getCreditCardIcon(payment?.paymentCard?.cardType)
    // Custom Code for paypal integration :Start
    const paymentMethodId = payment && payment.paymentMethodId
    const paymentCard = paymentMethodId == 'PayPal' ? JSON.parse(payment.paymentCard.creditCardToken) : ''
    const paypalEmail = paymentMethodId == 'PayPal' && paymentCard ? paymentCard.userEmail : ''

    return (
        <Stack direction="row" alignItems="center" spacing={3}>
            {paymentMethodId == 'PayPal' && (
                <>
                    <PaypalIcon width="auto" height="20px" />
                    <Box>{paypalEmail}</Box>
                </>
            )}
            {CardIcon && paymentMethodId === 'CREDIT_CARD' && <CardIcon layerStyle="ccIcon" />}

            {paymentMethodId === 'CREDIT_CARD' && (
                <Stack direction="row">
                    <Text>{payment.paymentCard.cardType}</Text>
                    <Text>&bull;&bull;&bull;&bull; {payment.paymentCard.numberLastDigits}</Text>
                    <Text>
                        {payment.paymentCard.expirationMonth}/{payment.paymentCard.expirationYear}
                    </Text>
                </Stack>
            )}
        </Stack>
       // Custom Code for paypal integration :End
    )
}

PaymentCardSummary.propTypes = {payment: PropTypes.object}

export default Payment
