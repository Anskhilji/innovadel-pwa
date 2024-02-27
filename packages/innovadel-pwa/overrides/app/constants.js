/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/* 
    Hello there! This is a demonstration of how to override a file from the base template.
    
    It's necessary that the module export interface remain consistent, 
    as other files in the base template rely on constants.js, thus we
    import the underlying constants.js, modifies it and re-export it.
*/

import {defineMessage} from 'react-intl'
import {
    DEFAULT_LIMIT_VALUES,
    DEFAULT_SEARCH_PARAMS
} from '@salesforce/retail-react-app/app/constants'

// original value is 25
DEFAULT_LIMIT_VALUES[0] = 3
DEFAULT_SEARCH_PARAMS.limit = 3

export const CUSTOM_HOME_TITLE = '🎉 Hello Extensible React Template!'

export {DEFAULT_LIMIT_VALUES, DEFAULT_SEARCH_PARAMS}

export * from '@salesforce/retail-react-app/app/constants'

export const EMAIL_SUBSCRIPTION_ERROR_MESSAGE = defineMessage({
    id: 'global.error.unexpected.email.subscription',
    defaultMessage: 'An unexpected error occurred during Email Subscription'
})

export const EMAIL_SUBSCRIPTION_SUCCESS_MESSAGE = defineMessage({
    id: 'global.success.subscribed.email',
    defaultMessage: 'You have subscribed the Email Newsletter'
})
