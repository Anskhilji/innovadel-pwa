/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'
import fetch from 'cross-fetch'
import { getAppOrigin } from '@salesforce/pwa-kit-react-sdk/utils/url'
import { useAccessToken } from '@salesforce/commerce-sdk-react'
import { app } from '../../../../../config/default'

const ContentAsset = ({ contentAssetId }) => {
    const [Asset, setAsset] = useState()
    const { getTokenWhenReady } = useAccessToken()
    const appOrigin = getAppOrigin()
    const clientId = app.commerceAPI.parameters.clientId

    useEffect(() => {
        const assetData = async (contentAssetId) => {
            const res = await fetch(`${appOrigin}/mobify/proxy/ocapi/s/RefArch/dw/shop/v20_2/content/${contentAssetId}?client_id=${clientId}`,
                {
                    headers: { authorization: `Bearer ${await getTokenWhenReady()}` }
                })

            if (res.ok) {
                setAsset(await res.json())
            }
        }

        assetData(contentAssetId)
    }, [])

    return (
        <Box>
            {Asset && Asset.c_body && <div dangerouslySetInnerHTML={{ __html: Asset.c_body }} />}
        </Box>
    )
}

ContentAsset.propTypes = {
    contentAssetId: PropTypes.string,
}

export { ContentAsset }
