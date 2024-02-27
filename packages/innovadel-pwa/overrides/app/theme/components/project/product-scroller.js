export default {
    baseStyle: {
        scrollBar: {
            '&::-webkit-scrollbar': {
                width: '8px',
                borderRadius: '16px',
                backgroundColor: 'none',
                height: '8px'
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: `rgba(0, 0, 0, 0.2)`,
                borderRadius: '16px'
            },
        }
    },
    parts: ['scrollBar']
}