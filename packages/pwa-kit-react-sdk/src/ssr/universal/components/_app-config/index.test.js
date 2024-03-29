/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import AppConfig from './index'

describe('The default AppConfig', () => {
    test('methods are all no-ops', () => {
        expect(AppConfig.restore()).toBeUndefined()
        expect(AppConfig.restore({frozen: 'any values here'})).toBeUndefined()
        expect(AppConfig.freeze()).toBeUndefined()
        expect(AppConfig.extraGetPropsArgs()).toEqual({})
    })
})
