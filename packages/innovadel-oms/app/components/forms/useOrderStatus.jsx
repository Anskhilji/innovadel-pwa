import {useIntl} from 'react-intl'

export default function useOrderStatus({
    form: {
        control
    }
}) {
    const {formatMessage} = useIntl()
    const fields = {
        email: {
            name: `email`,
            label: formatMessage({defaultMessage: 'Email', id: 'use_login_fields.label.email'}),
            placeholder: 'you@email.com',
            defaultValue: '',
            type: 'email',
            rules: {
                required: formatMessage({
                    defaultMessage: 'Please enter your email address.',
                    id: 'use_login_fields.error.required_email'
                })
            },
            control
        },
        orderNumber: {
            name: `orderNumber`,
            label: formatMessage({
                defaultMessage: 'Order Number',
                id: 'use_order_number.label'
            }),
            placeholder: ' your order number ',
            defaultValue: '',
            type: 'text',
            rules: {
                required: formatMessage({
                    defaultMessage: 'Please enter your order number.',
                    id: 'use_order_number.error.label'
                })
            },
            control
        }
    }
    return fields
}
