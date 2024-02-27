/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {
    Stack,
    Button,
    Box,
    Flex,
    Heading,
    Text,
    Skeleton
} from '@salesforce/retail-react-app/app/components/shared/ui'
import useOrderStatus from './useOrderStatus'
import {FormattedMessage} from 'react-intl'
import Field from '@salesforce/retail-react-app/app/components/field'
import {useForm} from 'react-hook-form'
import {GetURL} from '../constants'
import {innovadel} from '../../../../innovadel-pwa/config/default'
import OrderTrackingDetail from '../order-tracking-detail'

var getOrder = async (orderNo, orderEmail) => {
    var resResult
    var endpoint = innovadel.orderStatus
    var orderURL = `${GetURL(endpoint)}orderNumber=${orderNo}&orderEmail=${orderEmail} `
    await fetch(orderURL)
        .then((res) => res.json())
        .then((result) => {
            resResult = result.omsResponse
        })
        .catch((e) => {
            console.log('ERORRRR', e)
        })
    return resResult
}

const OrderStatus = () => {
    const form = useForm()
    const [status, setstatus] = useState()
    const [isLoading, setLoading] = useState(false)
    const [statusCode, setstatusCode] = useState()
    const fields = useOrderStatus({form})

    const Submitform = (e) => {
        e.preventDefault()
        var orderNo = orderNumber.defaultValue.trim()
        var orderEmail = email.defaultValue.trim()

        if (orderNo && orderEmail) {
            setLoading(true)
            setstatus(false)
            getOrder(orderNo, orderEmail).then((data) => {
                setstatus(data.responseData)
                setstatusCode(data.statusCode)
                setLoading(false)
            })
        }
    }

    return (
        <Stack>
            <form onSubmit={Submitform}>
                <Flex minH={'50vh'} align={'center'} justify={'center'}>
                    <Stack spacing={10} mx={'auto'} maxW={'lg'} py={12} px={6} width={'full'}>
                        <Stack align={'center'}>
                            <Heading fontSize={'4xl'}>Check order status</Heading>
                            <Text fontSize={'lg'} color={'gray.600'}>
                                Use the form below to track your order.
                            </Text>
                        </Stack>
                        <Box rounded={'lg'} boxShadow={'lg'} p={7}>
                            <Stack spacing={4}>
                                <Field {...fields.orderNumber} />
                                <Field {...fields.email} />
                            </Stack>
                            <Stack spacing={4} pt={2}>
                                <Button type="submit" size="md" px={'8'} boxShadow="lg">
                                    <FormattedMessage
                                        defaultMessage="Get Order Status"
                                        id="innovadel.link.get_order_status"
                                    />
                                </Button>
                            </Stack>
                        </Box>
                    </Stack>
                </Flex>
            </form>

            {isLoading && (
                <Skeleton spacing={10} mx={'auto'} maxW={'lg'} py={12} px={6} width={'full'} />
            )}
            {status && (
                <Flex justify={'center'}>
                    <Box layerStyle="cardBordered">
                        <Stack>
                            <>
                                <Heading fontSize={'4xl'}>Order Tracking</Heading>
                                {statusCode === 404 ? (
                                    <Text fontSize={'md'} align={'center'}>
                                        <FormattedMessage
                                            defaultMessage="Order Not Found"
                                            id="innovadel.order.status.not.found"
                                        />
                                    </Text>
                                ) : (
                                    <OrderTrackingDetail orderData={status} />
                                )}
                            </>
                        </Stack>
                    </Box>
                </Flex>
            )}
        </Stack>
    )
}

OrderStatus.propTypes = {
    /** Object returned from `useForm` */
    form: PropTypes.object,

    /** Optional prefix for field names */
    prefix: PropTypes.string
}

export default OrderStatus
