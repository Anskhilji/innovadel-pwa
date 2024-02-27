/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import _listMenu from '@salesforce/retail-react-app/app/theme/components/project/list-menu'

_listMenu.baseStyle.popoverContent = {
    ..._listMenu.baseStyle.popoverContent,
    top: '105px'
}

_listMenu.baseStyle.listMenuTriggerLink = {
    ..._listMenu.baseStyle.listMenuTriggerLink,
    color: 'gray.1000',
    _hover: {
        textDecoration: 'none',
        color: 'red.1000'
    }
}

_listMenu.baseStyle.listMenuTriggerLinkActive = {
    textDecoration: 'none',
    color: 'red.1000'
}

export default _listMenu
