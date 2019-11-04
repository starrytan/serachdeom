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
                <p>©版权所有 四川大学华西临床医学院|华西医院病理研究室</p>
            </div>
        </div>
    )
}
export default footer;