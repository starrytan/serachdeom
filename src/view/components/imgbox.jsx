import React from 'react';
import styles from '../../static/css/components.pcss';
const ImgBox = ({imgurl,closebox})=>{
    class Imgbox extends React.Component{
        constructor(props){
            super(props)
            this.state = {
                viewtype:1
            }
        }
        switch = (e)=>{
            e.persist();
            e.stopPropagation();
            this.setState({
                viewtype:this.state.viewtype===1?2:1
            })
        }
        render(){
            return(
                <div onClick={closebox} className={styles.masking}>
                    <div className={styles.mainbox}>
                    {this.state.viewtype==1?<img src={imgurl}></img>:<div className={styles.canvas}>canvas</div>}
                    <div className={styles.btnbox}>
                        <p onClick={this.switch}>数字切片</p>
                        <p>关闭</p>
                    </div>
                    </div>
                </div>
            )
        }
    }
    return <Imgbox/>;
}
export default ImgBox;