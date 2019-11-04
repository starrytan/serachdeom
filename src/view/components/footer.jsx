import React from 'react';
const footer = () => {
    let footercss = {
        textAlign: 'center',
        position: 'fixed',
        bottom:'0px',
        width:'100%',
        background: '#fff'
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