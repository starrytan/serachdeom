import React from 'react';
const footer = () => {
    let footercss = {
        textAlign: 'center',
        position: 'fixed',
        bottom:'0px',
        background: '#fff',
        left: '50%',
        transform: 'translateX(-50%)',
        width:'100%'
    }
    return (
        <div style={{ height: '100px', position:'relative'}}>
            <div style={footercss}>
                <p>©版权所有  </p>
            </div>
        </div>
    )
}
export default footer;