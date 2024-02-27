import {innovadel, app} from '../../../../innovadel-pwa/config/default'

export const useOrderConfirmation = () => {

    return {
        async orderConfirm(orderNo) {
            var endpoint = innovadel.orderConfirmation
            var orderConfirmUrl = `${innovadel.host}/on/demandware.store/Sites-${app.commerceAPI.parameters.siteId}-Site/default/${endpoint}?orderNo=${orderNo}`

            const response = await fetch(orderConfirmUrl)
            const result = await response.json()
            return result
        }
    }
}