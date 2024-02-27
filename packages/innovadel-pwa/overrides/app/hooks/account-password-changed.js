import {innovadel, app} from '../../../config/default'

export const useAccountPasswordChanged = () => {

    return {
        async passwordChanged(customer) {
            var endpoint = innovadel.accountPasswordChanged
            var firstName = customer.firstName
            var lastName = customer.lastName
            var email = customer.email
            var accountPasswordChangedUrl = `${innovadel.host}/on/demandware.store/Sites-${app.commerceAPI.parameters.siteId}-Site/default/${endpoint}?firstName=${firstName}&lastName=${lastName}&email=${email}`

            const response = await fetch(accountPasswordChangedUrl)
            const result = await response.json()
            return result
        }
    }
}