/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import _Footer from '@salesforce/retail-react-app/app/theme/components/project/footer'

_Footer.baseStyle.container = {
    ..._Footer.baseStyle.container,
    background: 'black',
    paddingTop: '40px',
    paddingBottom: '40px',  
    lineHeight: '24px',
    letterSpacing: '0.03px',
    wordwrap: 'break-word'
}

_Footer.baseStyle.horizontalRule= {
    ..._Footer.baseStyle.horizontalRule,
    display: 'none'
},

_Footer.baseStyle.copyright = {
    ..._Footer.baseStyle.copyright,
    paddingTop: '40px',
    color: 'gray.1000'
}

export default _Footer 