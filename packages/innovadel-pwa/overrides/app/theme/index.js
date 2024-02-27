/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import {extendTheme} from '@chakra-ui/react'
import {overrides as _overrides} from '@salesforce/retail-react-app/app/theme'
// Foundational style overrides
import fonts from './foundations/fonts'
import colors from './foundations/colors'
import sizes from './foundations/sizes'

// Base component style overrides
import Badge from './components/base/badge'
import Popover from './components/base/popover'

// Project Component style overrides
import Footer from '../theme/components/project/footer'
import SocialIcons from '../theme/components/project/social-icons'

// Project Component style overrides
import AboveHeader from '../../../app/theme/components/project/above-header'
import Header from './components/project/header'
import ListMenu from './components/project/list-menu'
import Breadcrumb from './components/project/breadcrumb'
import ProductTile from './components/project/product-tile'
import AboveHeaderPlp from '../../../app/theme/components/project/above-header-plp'
import PageHeader from '../../../app/theme/components/project/page-header'
import Refinements from '../../../app/theme/components/project/refinements'
import QuantitySelector from '../../../app/theme/components/project/quantity-selector'
import ProductScroller from './components/project/product-scroller'
import HomeCategory from '../../../app/theme/components/project/home-category'
import ToggleCard from '../../../app/theme/components/project/toggle-card'
import Field from '../../../app/theme/components/project/field'
import OrderSummary from '../../../app/theme/components/project/order-summary'
import ConfirmationCheck from '../../../app/theme/components/project/confirmation-check'

// Please refer to the Chakra-Ui theme customization docs found
// here https://chakra-ui.com/docs/theming/customize-theme to learn
// more about extending and overriding themes for your project.

export const overrides = {
    ..._overrides,
    fonts,
    colors,
    sizes,
    components: {
        ..._overrides.components,
        // base components
        Badge,
        Popover,
        // project components
        ConfirmationCheck,
        Header,
        ListMenu,
        AboveHeader,
        Breadcrumb,
        ProductTile,
        AboveHeaderPlp,
        PageHeader,
        Refinements,
        QuantitySelector,
        ProductScroller,
        ToggleCard,
        Field,
        OrderSummary,
        Footer,
        SocialIcons,
        HomeCategory
    }
}

export default extendTheme(overrides)
