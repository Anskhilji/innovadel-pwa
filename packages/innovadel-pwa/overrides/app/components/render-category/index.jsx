import React, { useState } from 'react'
import { useLazyLoadCategories } from '../../components/_app/index'
import { useIntl } from 'react-intl';
import { Link as RouteLink } from 'react-router-dom'
// Components
import { Box, useTheme, Container, Image, useMultiStyleConfig } from '@chakra-ui/react'
import Section from '@salesforce/retail-react-app/app/components/section'
// Others
import { categoryUrlBuilder } from '@salesforce/retail-react-app/app/utils/url'
import Link from '@salesforce/retail-react-app/app/components/link'

export const Category = () => {
    const { data: categoriesTree } = useLazyLoadCategories()
    const root = categoriesTree.categories
    const intl = useIntl()
    const theme = useTheme()
    const { baseStyle } = theme.components.ListMenu
    const displayedCategories = root.slice(0, 4)
    const styles = useMultiStyleConfig('HomeCategory')
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Container
        maxWidth="container.lg"
        >
            <Section
                padding={4}
                paddingTop={16}
                title={intl.formatMessage({
                    defaultMessage: 'Categories',
                    id: '',
                })}
            >
                <Box {...styles.homeCategoryBox}>
                    {displayedCategories.map((item, index, isOpen) => (
                        <Box
                            borderRadius={10}
                            key={item.id}
                            {...baseStyle.listMenuTriggerContainer} 
                            backgroundColor={index % 4 === 0 || index % 4 === 3 ? 'red.1000' : 'gray.1050'} // Apply background color based on index
                            width={index % 4 === 0 || index % 4 === 3 ? '60%' : '39%'} // Set widths based on a repeating pattern
                        >
                            <Link
                                as={RouteLink}
                                to={categoryUrlBuilder(item)}
                                onMouseOver={() => setIsOpen(true)} // Assuming you have a state variable like isOpen
                                {...baseStyle.listMenuTriggerLink}
                                {...(item.hasItems ? { name: `${item.name} __` } : { name: item.name })}
                                {...(isOpen ? baseStyle.listMenuTriggerLinkActive : {})}
                                style={{...styles.boxText}}
                            >
                                <Box>
                                    {item.name}
                                </Box>
                                
                                <Box {...styles.container}>
                                    <Image {...styles.Image} src={item.thumbnail} alt={item.name} />
                                </Box>
                            </Link>
                        </Box>
                    ))}
                </Box>
            </Section>
        </Container>
    );
};
