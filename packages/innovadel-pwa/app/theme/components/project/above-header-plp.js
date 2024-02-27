/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

export default {
    baseStyle: () => ({
        mainBanner: {
            bgSize: 'cover',
            bgPosition: 'center',
            bgRepeat: 'no-repeat',
            height: '400px',
            color: 'white',
            textAlign: 'left',
            flexShrink: 0,
            borderBottomRightRadius: '16px',
            borderTopRightRadius: '16px'
        },
        bannerTextWraper: {
            height: '100%',
            align: 'center'
        },
        bannerText: {
            lineHeight: '68px',
            fontStyle: 'normal',
            fontWeight: 600,
            letterSpacing: '-0.3px',
            textTransform: 'uppercase'
        }
    }),
    parts: ['mainBanner', 'bannerTextWraper', 'bannerText']
}
