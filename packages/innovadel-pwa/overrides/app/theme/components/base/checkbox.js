/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import checkbox from '@salesforce/retail-react-app/app/theme/components/base/checkbox'

checkbox.baseStyle.control = {
    _checked: {
        backgroundColor: '#F00',
        borderColor: '#F00',
        _hover: {
            bg: '#F00',
            borderColor: '#F00'
        }
    }
}

export default checkbox
