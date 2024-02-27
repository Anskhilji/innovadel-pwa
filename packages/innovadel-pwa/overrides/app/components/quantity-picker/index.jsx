/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import { Button, HStack, Input, useNumberInput, Box, useStyleConfig } from '@chakra-ui/react'
import {useIntl} from 'react-intl'


/**
 * This is the mobile implementation of the Chakra NumberInput. This simple component essentially
 * is a helper so we don't have to reuse the hooks every time we need a number input since design dictates
 * we use the moobile variation on all screens.
 *
 * NOTE: We can optionally put global logic we see if in here, and various styling decisions in this single
 * component.
 *
 * @param {*} props
 * @returns
 */
const QuantityPicker = (props) => {
    const intl = useIntl()
    const styles = useStyleConfig('QuantitySelector')

    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
        ...props,
        // Defaults
        focusInputOnChange: false,
        onFocus: (e) => {
            // eslint-disable-next-line react/prop-types
            const { onFocus } = props

            // This is useful for mobile devices, this allows the user to pop open the keyboard and set the
            // new quantity with one click.
            e.target.select()

            // If there is a `onFocus` property define, call it with the event captured.
            // eslint-disable-next-line react/prop-types
            onFocus && onFocus.call(this, e)
        }
    })

    const inc = getIncrementButtonProps({ variant: 'outline' })
    const dec = getDecrementButtonProps({ variant: 'outline' })
    const input = getInputProps({ maxWidth: '44px', textAlign: 'center' })

    return (
        <HStack>
            <Box fontWeight="bold" marginRight="24px">
                <label htmlFor="quantity">
                    {intl.formatMessage({
                        defaultMessage: 'Quantity',
                        id: 'product_view.label.quantity'
                    })}
                </label>
            </Box>
            <Button data-testid="quantity-decrement" {...dec} {...styles.selector}>
                -
            </Button>
            <Input {...input} {...styles.input} />
            <Button data-testid="quantity-increment" {...inc} {...styles.selector}>
                +
            </Button>
        </HStack>
    )
}

export default QuantityPicker
