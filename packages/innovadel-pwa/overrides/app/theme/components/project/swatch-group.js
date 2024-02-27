/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import SwatchGroup from '@salesforce/retail-react-app/app/theme/components/project/swatch-group'

SwatchGroup.variants.circle = (props) => ({
        swatch: {
            height: 11,
            width: 11,
            borderRadius: 'full',
            padding: 1,
            cursor: 'pointer',
            marginRight: 2,
            marginLeft: 0,
            marginBottom: 2,
            color: `${props.selected ? '#FF0000' : 'gray.200'}`, // custom change
            border: `${props.selected ? '1px' : '0'}`,
            _hover: {
                borderColor: `${props.selected ? '#FF0000' : 'gray.200'}`, // custom change
                borderWidth: 1,
                borderStyle: 'solid'
            },
            _active: {
                background: 'transparent',
            },
            _before: {
                content: '""',
                display: `${props.disabled ? 'block' : 'none'}`,
                position: 'absolute',
                height: 11,
                width: '1px',
                transform: 'rotate(45deg)',
                backgroundColor: '#FF0000', // custom change
                zIndex: 1
            }
        },
        swatchButton: {
            height: 8,
            borderColor: 'gray.200',
            width: 8,
            overflow: 'hidden',
            borderRadius: 'full',
            minWidth: 'auto',
            opacity: 1,
            _focus: {
                outline: 'none'
            }
        }
    }),
    SwatchGroup.variants.square = (props) => ({
        swatch: {
            marginRight: 2,
            backgroundImage: `${
                props.disabled
                    ? `${
                          props.selected
                          ? 'linear-gradient(to top left, transparent calc(50% - 1px), transparent calc(50% + 1px) )' // custom change
                          : 'linear-gradient(to top left, white calc(50% - 1px), #c9c9c9, white calc(50% + 1px) )' // custom change
                      } `
                    : ''
            }`,
            borderColor: `${props.selected ? '#FF0000' : 'gray.200'}`, // custom change
            borderStyle: 'solid',
            borderWidth: 1,
            paddingLeft: 3,
            paddingRight: 3,
            marginBottom: 2,
            _focus: {outline: 'none'},
            _hover: {
                textDecoration: 'none',
                borderColor: 'gray.900'
            },
            _active: {
                borderColor: 'gray.900'
            },
            backgroundColor: `${
                props.selected ? (props.disabled ? '#FF8F8F' : '#FF0000') : 'white' // custom change
            }`,
            color: `${props.selected ? 'white' : 'gray.900'}` // custom change
        }, 
        swatchButton: {}
    })

export default SwatchGroup