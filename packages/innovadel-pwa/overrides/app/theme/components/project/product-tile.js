/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import _productTile from '@salesforce/retail-react-app/app/theme/components/project/product-tile'
const baseStyle = _productTile.baseStyle();

baseStyle.favIcon = {
    ...baseStyle.favIcon,
    color: '#FF0000',
    backgroundColor: '#FFF',
    borderRadius: 8
}

baseStyle.imageWrapper = {
    ...baseStyle.imageWrapper,
   marginBottom: 0
}

baseStyle.image = {
    ...baseStyle.image,
    paddingBottom: 0
}

baseStyle.tileWrapper = {
    border: '1px solid #E6E6E6',
    borderTop: 'none',
    borderBottomRightRadius: '8px',
    borderBottomLeftRadius: '8px',
    marginTop: 0,
    paddingTop: '6px'
}

baseStyle.price = {
    ...baseStyle.price,
    color: '#F00',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 700,
    textTransform: 'capitalize',
    marginLeft: 3.5,
    marginBottom: 2
}

baseStyle.title = {
    ...baseStyle.title,
    fontStyle: 'normal',
    lineHeight: '38px',
    textTransform: 'capitalize',
    color: '#141516',
    fontWeight: 700,
    marginTop: 0,
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 2
}

baseStyle.rating = {
    ...baseStyle.rating,
    marginLeft: 3,
    marginBottom: 4
}

export default {
    baseStyle: () => ({
        ...baseStyle
    }),
    parts: [..._productTile.parts, 'tileWrapper']
}
