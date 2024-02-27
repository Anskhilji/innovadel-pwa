/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {useContext} from 'react'
import {FormattedMessage, FormattedNumber, useIntl} from 'react-intl'
import PropTypes from 'prop-types'
import {Box, Flex, Radio, RadioGroup, Stack, Text, Tooltip} from '@chakra-ui/react'
import {useCurrentBasket} from '@salesforce/retail-react-app/app/hooks/use-current-basket'
// Custom start: local file import for overriding our changes
import {CreditCard, PaypalIcon} from '../../../components/icons'
import CreditCardFields from '../../../components/forms/credit-card-fields'
// Custom end
import {useCurrency} from '@salesforce/retail-react-app/app/hooks'
// Custom start: Paypal integration
import PaypalPayment from '@innovadel/paypal/app/components/paypal-payment'
import {PaypalContext} from '@innovadel/paypal/app/components/app-context/paypal-context'
// Custom end

const PaymentForm = ({form, onSubmit}) => {
    const {formatMessage} = useIntl()
    const {data: basket} = useCurrentBasket()
    const {currency} = useCurrency()
    // Custom start: Paypal integration
    const {setSelectedPaymentMethod} = useContext(PaypalContext)
    const {selectedPaymentMethod} = useContext(PaypalContext)
    // Custom end

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Stack spacing={8}>
                <Stack spacing={5}>
                    <Box border="1px solid" borderColor="gray.100" rounded="base" overflow="hidden">
                        <RadioGroup
                            onChange={setSelectedPaymentMethod}
                            value={selectedPaymentMethod}
                        >
                            <Box
                                py={3}
                                px={[4, 4, 6]}
                                bg="gray.50"
                                borderBottom="1px solid"
                                borderColor="gray.100"
                            >
                                <Radio value="cc">
                                    <Flex justify="space-between">
                                        <Stack direction="row" align="center">
                                            <Text fontWeight="bold">
                                                <FormattedMessage
                                                    defaultMessage="Credit Card"
                                                    id="payment_selection.heading.credit_card"
                                                />
                                            </Text>
                                            <Tooltip
                                                hasArrow
                                                placement="top"
                                                label={formatMessage({
                                                    defaultMessage:
                                                        'This is a secure SSL encrypted payment.',
                                                    id: 'payment_selection.tooltip.secure_payment'
                                                })}
                                            >
                                                <CreditCard boxSize={5} />
                                            </Tooltip>
                                        </Stack>
                                        <Text fontWeight="bold">
                                            <FormattedNumber
                                                value={basket?.orderTotal}
                                                style="currency"
                                                currency={currency}
                                            />
                                        </Text>
                                    </Flex>
                                </Radio>
                            </Box>

                            {/* Custom Code for paypal integration :Start */}
                            {selectedPaymentMethod !== 'paypal' && (
                                <Box p={[4, 4, 6]} borderBottom="1px solid" borderColor="gray.100">
                                    <Stack spacing={6}>
                                        <Stack spacing={6}>
                                            <CreditCardFields form={form} />
                                        </Stack>
                                    </Stack>
                                </Box>
                            )}

                            <Box py={3} px={[4, 4, 6]} bg="gray.50" borderColor="gray.100">
                                <Radio value="paypal">
                                    <Flex justify="space-between">
                                        <Box>
                                            <PaypalIcon width="auto" height="20px" />
                                        </Box>
                                        <Text fontWeight="bold">
                                            <FormattedNumber
                                                value={basket?.orderTotal}
                                                style="currency"
                                                currency={currency}
                                            />
                                        </Text>
                                    </Flex>
                                </Radio>
                            </Box>
                            <Box p={[4, 4, 2]}>
                                <PaypalPayment />
                            </Box>
                            {/* Custom Code for paypal integration :End */}
                        </RadioGroup>
                    </Box>
                </Stack>
            </Stack>
        </form>
    )
}

PaymentForm.propTypes = {
    /** The form object returned from `useForm` */
    form: PropTypes.object,

    /** Callback for form submit */
    onSubmit: PropTypes.func
}

export default PaymentForm
