/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {useContext, useEffect} from 'react'
import {PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js'

import {PaypalContext} from '../app-context/paypal-context'
import {useCurrentBasket} from '@salesforce/retail-react-app/app/hooks/use-current-basket'

// This values are the props in the UI
const style = {layout: 'vertical'}

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({amount, currency, showSpinner}) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component

    const {setPaypalPaymentInstrument} = useContext(PaypalContext)
    const {setUserEmail} = useContext(PaypalContext)
    const [{options, isPending}, dispatch] = usePayPalScriptReducer()

    useEffect(() => {
        dispatch({
            type: 'resetOptions',
            value: {
                ...options,
                currency: currency
            }
        })
    }, [currency, showSpinner])

    useEffect(() => {
        if (!window.paypal?.Buttons) {
            window.paypal = undefined
        }
    }, [basket])

    return (
        <>
            {showSpinner && isPending && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount
                                    }
                                }
                            ]
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId
                        })
                }}
                onApprove={function (data, actions) {
                    return actions.order.get().then(function (details) {
                        // Your code here after capture the order
                        setUserEmail(details.payer.email_address)
                        var orderID = data.orderID
                        var accessToken = data.facilitatorAccessToken
                        var payerID = data.payerID
                        var email = details.payer.email_address
                        var responseObject = {
                            orderID: orderID,
                            facilitatorAccessToken: accessToken,
                            payerID: payerID,
                            email: email
                        }
                        setPaypalPaymentInstrument(responseObject)
                    })
                }}
            />
        </>
    )
}

export default function PaypalPayment() {
    const {selectedPaymentMethod} = useContext(PaypalContext)

    if (selectedPaymentMethod === 'paypal') {
        const {data: basket} = useCurrentBasket()
        const amount = basket.orderTotal
        const currency = basket.currency

        return (
            <div style={{maxWidth: '750px', minHeight: '200px'}}>
                <PayPalScriptProvider
                    options={{
                        clientId:
                            'AWEbTIkdSITMu2gAo12zsWeH2B9QrUb5M8SKKuPEQdP1rXsELBs--tMgaxWIZ-ZfVi0cq-TLtN1JQLk2',
                        components: 'buttons',
                        commit: false,
                        currency: 'USD'
                    }}
                >
                    <ButtonWrapper currency={currency} showSpinner={false} amount={amount} />
                </PayPalScriptProvider>
            </div>
        )
    }
}
