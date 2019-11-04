import React from 'react';
const footer = () => {
    let footercss = {
        textAlign: 'center',
        marginTop: '50px',
        position: 'fixed',
        bottom:'0px'
    }
    return (
        <div style={footercss}>
            <p>©版权所有 四川大学华西临床医学院|华西医院病理研究室</p>
        </div>
    )
}
export default footer;