/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import loadable from '@loadable/component'
import {getConfig} from '@salesforce/pwa-kit-runtime/utils/ssr-config'

// Components
import {Skeleton} from '@salesforce/retail-react-app/app/components/shared/ui'
import {configureRoutes} from '@salesforce/retail-react-app/app/utils/routes-utils'
import {routes as _routes} from '@salesforce/retail-react-app/app/routes'

const fallback = <Skeleton height="75vh" width="100%" />

// Create your pages here and add them to the routes array
// Use loadable to split code into smaller js chunks
const Home = loadable(() => import('./pages/home'), {fallback})
const ContactUs = loadable(() => import('@innovadel/service-cloud/app/pages/contact-us'))
const orderStatus = loadable (() => import('@innovadel/order-managment/app/components/forms/order-status'))
const ProductList = loadable(() => import('./pages/product-list'), {
    fallback
})
const ProductDetail = loadable(() => import('./pages/product-detail'), {fallback})
const Login = loadable(() => import('./pages/login'), {fallback})
const Cart = loadable(() => import('./pages/cart'), {fallback})
const Account = loadable(() => import('./pages/account'), {fallback})
const Wishlist = loadable(() => import('./pages/account/wishlist'), {
    fallback
})
const Checkout = loadable(() => import('./pages/checkout'), {
        fallback
})
const CheckoutConfirmation = loadable(() => import('./pages/checkout/confirmation'), {fallback})

// Create a loadable page for `page-viewer`.
const PageViewer = loadable(() => import('./pages/page-viewer'), {fallback})

const routes = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/contact-us',
        component: ContactUs,
        exact: true
    },{
        path:'/orderstatus',
        component:orderStatus
    },
    {
        path: '/category/:categoryId',
        component: ProductList
    },
    {
        path: '/product/:productId',
        component: ProductDetail
    },
    {
        path: '/login',
        component: Login,
        exact: true
    },
    {
        path: '/cart',
        component: Cart,
        exact: true
    },
    {
        path: '/account',
        component: Account
    },
    {
        path: '/account/wishlist',
        component: Wishlist
    },
    {
        path: '/checkout',
        component: Checkout,
        exact: true
    },
    {
        path: '/checkout/confirmation/:orderNo',
        component: CheckoutConfirmation
    },
    {
        path: '/page-viewer/:pageId',
        component: PageViewer,
        exact: true
    },  
    ..._routes
]

export default () => {
    const config = getConfig()
    return configureRoutes(routes, config, {
        ignoredRoutes: ['/callback', '*']
    })
}
