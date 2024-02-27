/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
export default {
    baseStyle: {
        homeCategoryBox: {
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px 0'
        },

        boxText: {
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
        },

        container: {
            borderRadius: '8px',
            maxWidth: '220px',
            maxHeight: '220px',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center'
        },

        Image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        }
    },
    parts: ['homeCategoryBox', 'boxText', 'container', 'Image']
}
