/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import _header from '@salesforce/retail-react-app/app/theme/components/project/header'

_header.baseStyle.content = {
    paddingLeft: [4, 4, 6, 8],
    paddingRight: [4, 4, 6, 8],
    paddingTop: [1, 1, 2, 4],
    paddingBottom: [3, 3, 2, 4]
}

_header.baseStyle.bodyContainer = {
    ..._header.baseStyle.bodyContainer,
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '91px'
}

_header.baseStyle.icons = {
    ..._header.baseStyle.icons,
    marginRight: [0, 1, 2, 3],
    color: 'gray.950'
}

_header.baseStyle.accountIcon = {
    ..._header.baseStyle.accountIcon,
    marginLeft: [0, 1, 2, 3],
    color: 'gray.950'
}

_header.baseStyle.logo = {
    ..._header.baseStyle.logo,
    width: [8, 8, 8, 16],
    height: [6, 6, 6, 12]
}
export default _header
