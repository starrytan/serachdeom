import React from 'react';
import styles from '../../static/css/components.pcss';
import WSIBox from './wsibox';
import PropTypes from 'prop-types';
const ImgBox = ({imgurl,closebox})=>{
    class Imgbox extends React.Component{
        constructor(props){
            super(props)
            this.state = {
                viewtype:1,
                imgurl:imgurl
            }
        }
        switch = (e)=>{
            e.persist();
            e.stopPropagation();
            this.setState({
                viewtype:this.state.viewtype===1?2:1
            })
        }
        canvasck = (e)=>{
            e.stopPropagation();
        }
        render(){
            return(
                <div className={styles.masking}>
                    <div className={styles.mainbox}>
                   {/* {this.state.viewtype == 1 ? <img onClick={this.switch} src={imgurl}></img> : <div onClick={this.canvasck} className={styles.canvas}>canvas</div>}*/}
            {this.state.viewtype == 1 ? <img onClick={this.switch} src={imgurl}></img> : <WSIBox onClick={this.canvasck} className={styles.canvas} />}
                    <div className={styles.btnbox}>
                        <p onClick={closebox}>关闭</p>
                    </div>
                    </div>
                </div>
            )
        }
        getChildContext() {
            return {
                value: this.state.imgurl
            }
        }
    }
    
    Imgbox.chlidContextTypes = {
        value: PropTypes.string
    }
    return <Imgbox/>;
}
export default ImgBox;