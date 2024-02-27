/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import {innovadel, app} from '../../../../innovadel-pwa/config/default'

export const useSubscribeNewsletter = () => {

    return {
        async sendNewsLetter(email) {
            var endpoint = innovadel.newsletterSubscription
            var emailURL = `${innovadel.host}/on/demandware.store/Sites-${app.commerceAPI.parameters.siteId}-Site/default/${endpoint}`
            const body = {
                customerEmail: email
            }
            const response = await fetch(emailURL, {
                method: 'POST',
                body: JSON.stringify(body)
            })
            const resp = await response.json()
            const data = {
                status: resp.emailSendResponse
            }
            return data
        }
    }
}