export default {
    baseStyle: {
        inputLabel: {
            color: '#262D33',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 500
        },
        input: {
            border: '1px solid #E7E7E7',
            background: '#FFF',
            display: 'flex',
            padding: '16px 20px',
            alignItems: 'center',
            gap: '5px',
            alignSelf: 'strech',
            marginTop: '6px',
            fontSize: '14px',

            _focus: {
                color: '#262D33',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 400,
                letterSpacing: '0.14px',
                borderColor: '#262D33',
                boxShadow: 'none'
            }
        },
        select: {
            border: '1px solid #E7E7E7',
            background: '#FFF',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            alignSelf: 'strech',
            fontSize: '14px',
            marginTop: '6px',
            
            _focus: {
                color: '#262D33',
                fontStyle: 'normal',
                fontWeight: 400,
                letterSpacing: '0.14px',
                borderColor: '#262D33',
                boxShadow: 'none'
            }
        }
    },
    parts: ['inputLabel', 'input', 'select'],
}