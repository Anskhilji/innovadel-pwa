/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {FormattedNumber, useIntl} from 'react-intl'
import {Stack, Text} from '@salesforce/retail-react-app/app/components/shared/ui'
import {useItemVariant} from '.'
import {HideOnDesktop, HideOnMobile} from '@salesforce/retail-react-app/app/components/responsive'
import {useCurrency} from '@salesforce/retail-react-app/app/hooks'
import {useCurrentBasket} from '@salesforce/retail-react-app/app/hooks/use-current-basket'

const PricePerItem = ({currency, basket, basePrice}) => {
    const {currency: activeCurrency} = useCurrency()
    return (
        <Text as="s" fontSize={{base: '12px', lg: '14px'}}>
            <FormattedNumber
                style="currency"
                currency={currency || basket?.currency || activeCurrency}
                value={basePrice}
            />
        </Text>
    )
}

PricePerItem.propTypes = {
    currency: PropTypes.string,
    basket: PropTypes.object,
    basePrice: PropTypes.string
}

/**
 * In the context of a cart product item variant, this component renders the item's
 * pricing, taking into account applied discounts as well as base item prices.
 */
const ItemPrice = ({currency, align = 'right', baseDirection = 'column', ...props}) => {
    const variant = useItemVariant()
    const {data: basket} = useCurrentBasket()
    const {currency: activeCurrency} = useCurrency()
    const intl = useIntl()

    const {price, TotalLineAmount, AdjustedLineAmount} = variant
    const isProductASet = variant?.type?.set

    const displayPrice =
        typeof AdjustedLineAmount === 'number' ? Math.min(price, AdjustedLineAmount) : price

    const hasDiscount = displayPrice !== price

    return (
        <Stack
            textAlign={align}
            direction={hasDiscount ? 'column' : {base: baseDirection, lg: 'row'}}
            justifyContent={align === 'left' ? 'flex-start' : 'flex-end'}
            alignItems="baseline"
            spacing={hasDiscount ? 0 : 1}
            wrap="nowrap"
            {...props}
        >
            {TotalLineAmount && price !== TotalLineAmount && (
                <HideOnDesktop>
                    <PricePerItem currency={currency} basePrice={TotalLineAmount} basket={basket} />
                </HideOnDesktop>
            )}
            <Text fontWeight="bold" lineHeight={{base: '0.5', lg: '24px'}}>
                {isProductASet &&
                    `${intl.formatMessage({
                        defaultMessage: 'Starting at',
                        id: 'item_price.label.starting_at'
                    })} `}

                <FormattedNumber
                    style="currency"
                    currency={currency || basket?.currency || activeCurrency}
                    value={displayPrice}
                />
                {hasDiscount && (
                    <Text
                        as="span"
                        fontSize="sm"
                        fontWeight="normal"
                        textDecoration="line-through"
                        color="gray.500"
                        marginLeft={1}
                    >
                        <FormattedNumber
                            style="currency"
                            currency={currency || basket?.currency || activeCurrency}
                            value={price}
                        />
                    </Text>
                )}
            </Text>

            {TotalLineAmount && price !== TotalLineAmount && (
                <HideOnMobile>
                    <PricePerItem currency={currency} basePrice={TotalLineAmount} basket={basket} />
                </HideOnMobile>
            )}
        </Stack>
    )
}

ItemPrice.propTypes = {
    currency: PropTypes.string,
    align: PropTypes.string,
    baseDirection: PropTypes.string
}

export default ItemPrice
