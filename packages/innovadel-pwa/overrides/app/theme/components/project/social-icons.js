/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import _socialIcons from '@salesforce/retail-react-app/app/theme/components/project/social-icons'

_socialIcons.baseStyle.container = {
    ..._socialIcons.baseStyle.container,
    paddingBottom: '20px'

}

_socialIcons.variants.flex.item = {
    ..._socialIcons.variants.flex.item ,
    flex: 0
}

export default _socialIcons 