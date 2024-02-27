/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {useState} from 'react'
import {ChevronDownIcon} from '../../icons'
import {getAssetUrl} from '@salesforce/pwa-kit-react-sdk/ssr/universal/utils'
import {
    useMultiStyleConfig,
    Box,
    Flex,
    Spacer,
    Select,
    Link,
    Image,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from '@chakra-ui/react'

const AboveHeader = () => {
    const styles = useMultiStyleConfig('AboveHeader')
    const [selectedFlag, setselectedFlag] = useState(getAssetUrl('static/img/countries/country-us.png'))

    const onChange = (e) => {
        var menuTarget = e.target && e.target.src ? e.target.src : ''
        if (!menuTarget) {
            menuTarget = e.target.children[0].src
        }
        setselectedFlag(menuTarget)
    }

    return (
        <Box {...styles.container}>
            <Box {...styles.content}>
                <Flex>
                    <Box marginLeft={{base: '-15px'}}>
                        <Flex alignItems="center">
                            <Menu>
                                <MenuButton display="flex" alignItems="center" 
                                    as={Button}
                                    rightIcon={<ChevronDownIcon {...styles.downIcon} />}
                                    variant="unstyled"
                                >
                                    <Image
                                        boxSize="1rem"
                                        src={selectedFlag}
                                        alt="CountrySelector"
                                        ml="15px"
                                        {...styles.flagIcon}
                                    />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem minH="48px" onClick={(e) => onChange(e)}>
                                        <Image
                                            boxSize="1rem"
                                            src={getAssetUrl('static/img/countries/country-us.png')}
                                            alt="CountrySelector"
                                            mr="12px"
                                        />
                                    </MenuItem>
                                    <MenuItem minH="48px" onClick={(e) => onChange(e)}>
                                        <Image
                                            boxSize="1rem"
                                            src={getAssetUrl('static/img/countries/country-uk.png')}
                                            alt="CountrySelectorSecond"
                                            mr="12px"
                                        />
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                            <Box
                                color="white"
                                mr={{base: '7px', sm: '24px'}}
                                ml={{base: '12px', sm: '27px'}}
                            >
                                |
                            </Box>
                            <Box
                                {...styles.currency}
                                _hover={{color: 'black'}}
                                fontSize={{base: '12px', sm: '14px'}}
                            >
                                <Select
                                    size="sm"
                                    _focus={{color: 'black'}}
                                    variant="unstyled"
                                    cursor="pointer"
                                >
                                    <option value="option1" label="USD"></option>
                                    <option value="option2" label="EUR"></option>
                                    <option value="option3" label="CAD"></option>
                                </Select>
                            </Box>
                        </Flex>
                    </Box>
                    <Spacer />
                    <Flex alignItems="center" fontSize={{base: '10px', sm: '12px', md: '14px'}}>
                        <Flex>
                            <Link href="#" {...styles.link} mr={{base: '10px', sm: '15px', md:"20px"}}>
                                Store Locator
                            </Link>
                            <Link href="#" {...styles.link} mr={{base: '10px', sm: '15px', md:"20px"}}>
                                Shipping
                            </Link>
                            <Link href="#" {...styles.link} mr={{base: '10px', sm: '15px', md:"20px"}}>
                                Subscribe
                            </Link>
                            <Link href="#" {...styles.link} mr={{base: '10px', sm: '15px', md:"20px"}}>
                                Gift Cards
                            </Link>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    )
}

export default AboveHeader
