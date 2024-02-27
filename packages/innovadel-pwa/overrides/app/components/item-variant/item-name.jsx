/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import {useItemVariant} from '@salesforce/retail-react-app/app/components/item-variant'
import Link from '@salesforce/retail-react-app/app/components/link'

import { useStyleConfig } from '@chakra-ui/react'

/**
 * In the context of a cart product item variant, this components simply renders
 * the item's name using the cart item field `productName`. We use this field
 * rather than variant `name` field as the variant detail may not yet be
 * available upon rendering.
 */
const ItemName = (props) => {
    const variant = useItemVariant()
    const productId = variant?.master?.masterId || variant.id ||  variant.ProductCode

    const styles = useStyleConfig('ConfirmationCheck')

    return (
        <Link fontWeight="bold" {...styles.lineItem} color="black.600" {...props} to={`/product/${productId}`}>
            {variant.productName || variant.name || variant.Name}
        </Link>
    )
}

export default ItemName
