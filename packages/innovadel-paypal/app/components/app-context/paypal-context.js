/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {createContext, useState} from 'react'

export const PaypalContext = createContext()
export const PaypalProvider = ({children}) => {
    const [paypalPaymentInstrument, setPaypalPaymentInstrument] = useState({})
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cc')
    const [userEmail, setUserEmail] = useState()

    return (
        <PaypalContext.Provider
            value={{
                paypalPaymentInstrument: paypalPaymentInstrument,
                setPaypalPaymentInstrument: setPaypalPaymentInstrument,
                selectedPaymentMethod: selectedPaymentMethod,
                setSelectedPaymentMethod: setSelectedPaymentMethod,
                userEmail: userEmail,
                setUserEmail: setUserEmail
            }}
        >
            {children}
        </PaypalContext.Provider>
    )
}
