import Button from '@salesforce/retail-react-app/app/theme/components/base/button'

Button.variants.solid = (props) =>
    props.colorScheme === 'blue'
        ? {
            backgroundColor: '#FF0000', // custom change
            padding: '16px 40px', // custom change
            borderRadius: '8px', // custom change
            fontSize: '16px', // custom change
            color: 'white',
            _hover: { bg: 'white', _disabled: { bg: '#FF0000' }, color: '#FF0000' }, // custom change
            border: '1px solid #FF0000', // custom change
            _active: { bg: '#FF0000', color: 'white' }, // custom change
            _disabled: { bg: '#FF0000' } // custom change
        }
        : {},
    Button.variants.outline = (props) =>
        props.colorScheme === 'black'
            ? { color: '#FF0000', _hover: { bg: 'white' }, borderColor: 'white', borderRadius: '8px', padding: '16px 40px', fontSize: '16px' } // custom change
            : { color: '#FF0000', _hover: { bg: 'white' }, padding: '16px 40px', borderRadius: '8px', fontSize: '16px' }, // custom change
    Button.variants.link = () => ({
        color: "#FF0000", // custom change
        fontWeight: 'normal',
        minWidth: '1em',
        lineHeight: 4
    }),
    Button.variants['menu-link'] = {
        color: '#000000', // custom change for My Account section
        fontSize: '16px', // custom change
        fontWeight: "400", // custom change
        justifyContent: 'flex-start',
        fontSize: 'sm',
        _hover: { bg: 'gray.50', textDecoration: 'none' },
        _activeLink: {
            color: '#FF0000',  // custom change for My Account section
            borderLeft: '3px solid #F00',  // custom change
            borderRadius: "0px",  // custom change
            bg: 'gray.50',
            textDecoration: 'none'
        }
    },
    Button.variants['menu-link-mobile'] = {
        color: '#000000', // custom change for My Account section
        fontSize: '16px', // custom change
        fontWeight: "400", // custom change
        _activeLink: {
            color: '#FF0000', // custom change
            borderLeft: '3px solid #F00',  // custom change
            bg: 'gray.100',
            textDecoration: 'none'
        }
    },
    Button.variants['removeBtn'] = {
        color: '#FF0000', // custom change for My Account section
    }

export default Button