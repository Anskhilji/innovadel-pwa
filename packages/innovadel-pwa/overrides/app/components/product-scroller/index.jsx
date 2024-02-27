/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, { forwardRef, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { AspectRatio, Box, Heading, IconButton, Skeleton, Stack, useStyleConfig, Button } from '@chakra-ui/react'
import ProductTile from '../../components/product-tile'
import { ChevronLeftIcon, ChevronRightIcon } from '@salesforce/retail-react-app/app/components/icons'
import { useToast } from '@salesforce/retail-react-app/app/hooks/use-toast'
import { useIntl } from 'react-intl'
import {
    API_ERROR_MESSAGE,
    TOAST_ACTION_VIEW_WISHLIST,
    TOAST_MESSAGE_ADDED_TO_WISHLIST,
    TOAST_MESSAGE_REMOVED_FROM_WISHLIST
} from '@salesforce/retail-react-app/app/constants'
import { useWishList } from '@salesforce/retail-react-app/app/hooks/use-wish-list'
import {
    useCustomerId,
    useShopperCustomersMutation
} from '@salesforce/commerce-sdk-react'

/**
 * Renders a scrollable, horizontal container of products with native scroll
 * snapping and manual button controls.
 */
const ProductScroller = forwardRef(
    (
        {
            header,
            title,
            products,
            isLoading,
            scrollProps,
            itemWidth = { base: '70%', md: '40%', lg: 'calc(33.33% - 10px)' },
            productTileProps,
            ...props
        },
        ref
    ) => {
        const styles = useStyleConfig('ProductScroller')
        const scrollRef = useRef()
        // Custom Start: add product to wishlist from recomendation on PDP and Cart page
        const toast = useToast()
        const { formatMessage } = useIntl()
        const [wishlistLoading, setWishlistLoading] = useState([])
        const { data: wishlist } = useWishList()
        const customerId = useCustomerId()

            /**************** Mutation Actions ****************/
    const {mutateAsync: createCustomerProductListItem} = useShopperCustomersMutation(
        'createCustomerProductListItem'
    )
    const {mutateAsync: deleteCustomerProductListItem} = useShopperCustomersMutation(
        'deleteCustomerProductListItem'
    )
    // Custom End: add product to wishlist from recomendation on PDP and Cart page

        // Renders nothing if we aren't loading and have no products.
        if ((!products || products.length < 1) && !isLoading) {
            return null
        }

        // Scroll the container left or right by 100%. Passing no args or `1`
        // scrolls to the right, and passing `-1` scrolls left.
        const scroll = (direction = 1) => {
            scrollRef.current?.scrollBy({
                top: 0,
                left: direction * window.innerWidth,
                behavior: 'smooth'
            })
        }
        // Custom Start: add product to wishlist from recomendation on PDP and Cart page
        const addItemToWishlist = async (product) => {
            setWishlistLoading([...wishlistLoading, product.productId])

            // TODO: This wishlist object is from an old API, we need to replace it with the new one.
            const listId = wishlist.id
            await createCustomerProductListItem(
                {
                    parameters: { customerId, listId },
                    body: {
                        quantity: 1,
                        public: false,
                        priority: 1,
                        type: 'product',
                        productId: product.productId
                    }
                },
                {
                    onError: () => {
                        toast({
                            title: formatMessage(API_ERROR_MESSAGE),
                            status: 'error'
                        })
                    },
                    onSuccess: () => {
                        toast({
                            title: formatMessage(TOAST_MESSAGE_ADDED_TO_WISHLIST, { quantity: 1 }),
                            status: 'success',
                            action: (
                                // it would be better if we could use <Button as={Link}>
                                // but unfortunately the Link component is not compatible
                                // with Chakra Toast, since the ToastManager is rendered via portal
                                // and the toast doesn't have access to intl provider, which is a
                                // requirement of the Link component.
                                <Button variant="link" onClick={() => navigate('/account/wishlist')}>
                                    {formatMessage(TOAST_ACTION_VIEW_WISHLIST)}
                                </Button>
                            )
                        })
                    },
                    onSettled: () => {
                        setWishlistLoading(wishlistLoading.filter((id) => id !== product.productId))
                    }
                }
            )
        }

        const removeItemFromWishlist = async (product) => {
            setWishlistLoading([...wishlistLoading, product.productId])

            const listId = wishlist.id
            const itemId = wishlist.customerProductListItems.find(
                (i) => i.productId === product.productId
            ).id

            await deleteCustomerProductListItem(
                {
                    body: {},
                    parameters: { customerId, listId, itemId }
                },
                {
                    onError: () => {
                        toast({
                            title: formatMessage(API_ERROR_MESSAGE),
                            status: 'error'
                        })
                    },
                    onSuccess: () => {
                        toast({
                            title: formatMessage(TOAST_MESSAGE_REMOVED_FROM_WISHLIST),
                            status: 'success'
                        })
                    },
                    onSettled: () => {
                        setWishlistLoading(wishlistLoading.filter((id) => id !== product.productId))
                    }
                }
            )
        }
        // Custom End: add product to wishlist from recomendation on PDP and Cart page
        return (
            <Box position="relative" data-testid="product-scroller" ref={ref}>
                <Stack spacing={6} {...props}>
                    {isLoading && <Skeleton height={6} width="150px" m="auto" />}

                    {title && !header && !isLoading && (
                        <Heading as="h2" fontSize="xl" textAlign="center">
                            {title}
                        </Heading>
                    )}

                    {!title && !isLoading && header}

                    <Stack
                        ref={scrollRef}
                        direction="row"
                        spacing={4}
                        wrap="nowrap"
                        overflowX={products?.length > 3 ? 'auto' : 'hidden'}
                        px={{ base: 4, md: 8, lg: 0 }}
                        {...scrollProps}
                        sx={{
                            ...styles.scrollBar,
                            scrollPadding: { base: 16, md: 32, lg: 0 },
                            scrollSnapType: 'x mandatory',
                            WebkitOverflowScrolling: 'touch', // Safari touch scrolling needed for scroll snap
                            ...scrollProps?.sx
                        }}
                    >
                        {(isLoading ? [0, 1, 2, 4] : products).map((product, idx) => {
                            return (
                                <Box
                                    key={product?.id || idx}
                                    flex="0 0 auto"
                                    width={itemWidth}
                                    style={{ scrollSnapAlign: 'start' }}
                                    mb={{base: 2}}
                                >
                                    {isLoading ? (
                                        <Stack data-testid="product-scroller-item-skeleton">
                                            <AspectRatio ratio={1}>
                                                <Skeleton />
                                            </AspectRatio>
                                            <Stack spacing={2}>
                                                <Skeleton width="150px" height={5} />
                                                <Skeleton width="75px" height={5} />
                                            </Stack>
                                        </Stack>
                                    ) : (
                                        <ProductTile
                                            data-testid="product-scroller-item"
                                            product={product}
                                            {...(typeof productTileProps === 'function'
                                                ? { ...productTileProps(product) }
                                                : { ...productTileProps })}
                                            dynamicImageProps={{
                                                widths: ['70vw', '70vw', '40vw', '30vw']
                                            }}
                                            // Custom Start: add product to wishlist from recomendation on PDP and Cart page
                                                onFavouriteToggle={(isFavourite) => {
                                                    const action = isFavourite
                                                        ? addItemToWishlist
                                                        : removeItemFromWishlist
                                                    return action(product)
                                                }}
                                            // Custom End: add product to wishlist from recomendation on PDP and Cart page

                                        />
                                    )}
                                </Box>
                            )
                        })}
                    </Stack>
                </Stack>

                {products?.length > 3 && (
                    <>
                        <Box
                            display={{
                                base: 'none',
                                lg: 'block'
                            }}
                            position="absolute"
                            top="50%"
                            left={{ base: 0, lg: 4 }}
                            transform="translateY(-50%)"
                        >
                            <IconButton
                                data-testid="product-scroller-nav-left"
                                aria-label="Scroll products left"
                                icon={<ChevronLeftIcon color="black" />}
                                borderRadius="full"
                                colorScheme="whiteAlpha"
                                onClick={() => scroll(-1)}
                            />
                        </Box>

                        <Box
                            display={{
                                base: 'none',
                                lg: 'block'
                            }}
                            position="absolute"
                            top="50%"
                            right={{ base: 0, lg: 4 }}
                            transform="translateY(-50%)"
                        >
                            <IconButton
                                data-testid="product-scroller-nav-right"
                                aria-label="Scroll products right"
                                icon={<ChevronRightIcon color="black" />}
                                borderRadius="full"
                                colorScheme="whiteAlpha"
                                onClick={() => scroll(1)}
                            />
                        </Box>
                    </>
                )}
            </Box>
        )
    }
)

ProductScroller.displayName = 'ProductScroller'

ProductScroller.propTypes = {
    header: PropTypes.any,
    title: PropTypes.any,
    products: PropTypes.array,
    isLoading: PropTypes.bool,
    scrollProps: PropTypes.object,
    itemWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
    productTileProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
}

export default ProductScroller
