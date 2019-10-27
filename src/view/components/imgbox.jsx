import React from 'react';
import styles from '../../static/css/components.pcss';
const imgbox = ({imgurl,closebox})=>{
        return(
            <div onClick={closebox} className={styles.masking}>
                <div className={styles.mainbox}>
                <img src={imgurl}></img>
                </div>
            </div>
        )
}
export default imgbox;