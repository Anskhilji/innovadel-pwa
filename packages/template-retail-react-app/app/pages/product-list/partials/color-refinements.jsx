/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import {Box, SimpleGrid, HStack, Text, Button, Center, useMultiStyleConfig} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import {cssColorGroups} from '@salesforce/retail-react-app/app/constants'

const ColorRefinements = ({filter, toggleFilter, selectedFilters}) => {
    const styles = useMultiStyleConfig('SwatchGroup', {
        variant: 'circle',
        disabled: false
    })

    return (
        <SimpleGrid columns={2} spacing={2} mt={1}>
            {filter.values
                .filter((refinementValue) => refinementValue.hitCount > 0)
                .map((value, idx) => {
                    const isSelected = selectedFilters.includes(value.value)

                    return (
                        <Box key={idx}>
                            <HStack
                                onClick={() => toggleFilter(value, filter.attributeId, isSelected)}
                                spacing={1}
                                cursor="pointer"
                            >
                                <Button
                                    {...styles.swatch}
                                    color={isSelected ? 'black' : 'gray.200'}
                                    border={isSelected ? '1px' : '0'}
                                    aria-checked={isSelected}
                                    variant="outline"
                                    marginRight={0}
                                    marginBottom="-1px"
                                >
                                    <Center
                                        {...styles.swatchButton}
                                        marginRight={0}
                                        border={
                                            value.label.toLowerCase() === 'white' &&
                                            '1px solid black'
                                        }
                                    >
                                        <Box
                                            marginRight={0}
                                            height="100%"
                                            width="100%"
                                            minWidth="32px"
                                            backgroundRepeat="no-repeat"
                                            backgroundSize="cover"
                                            backgroundColor={
                                                cssColorGroups[value.presentationId.toLowerCase()]
                                            }
                                            background={
                                                value.presentationId.toLowerCase() ===
                                                    'miscellaneous' &&
                                                cssColorGroups[value.presentationId.toLowerCase()]
                                            }
                                        />
                                    </Center>
                                </Button>
                                <Text
                                    display="flex"
                                    alignItems="center"
                                    fontSize="sm"
                                    marginBottom="1px"
                                >{`${value.label} (${value.hitCount})`}</Text>
                            </HStack>
                        </Box>
                    )
                })}
        </SimpleGrid>
    )
}

ColorRefinements.propTypes = {
    filter: PropTypes.object,
    toggleFilter: PropTypes.func,
    selectedFilters: PropTypes.array
}

export default ColorRefinements
