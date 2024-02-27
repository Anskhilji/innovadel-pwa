/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
export default {
    baseStyle: {
        container: {
            minWidth: 'xs',
            width: 'full',
            boxShadow: 'base',
            backgroundColor: 'red.950',
            height: '43px'
        },

        content: {
            paddingLeft: [4, 4, 6, 8],
            paddingRight: [4, 4, 6, 6]
        },

        link: {
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '20px',
            letterSpacing: '0.14px',
            color: 'white',
            _hover: {
                color: 'black'
            }
        },

        currency: {
            fontFamily: 'Jost',
            fontStyle: 'normal',
            fontWeight: '500',
            lineHeight: '20px',
            letterSpacing: '0.035px',
            color: 'white',
            marginTop: '6px',
            paddingRight: '1',
            width: '66px'
        },

        downIcon: {
            width: '20px',
            height: '20px',
            color: 'white',
            marginLeft: '-8px',
            position: 'absolute',
            bottom: '12px',
            _hover: {
                color: 'black'
            }
        },

        flagIcon: {
            width: '16px',
            height: '16px'
        }
    },
    parts: ['container', 'content', 'link', 'currency', 'downIcon', 'flagIcon']
}
