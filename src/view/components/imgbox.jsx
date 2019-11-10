import React from 'react';
import styles from '../../static/css/components.pcss';
import WSIBox from './wsibox';
import PropTypes from 'prop-types';
const ImgBox = ({imgurl,closebox})=>{
    class Imgbox extends React.Component{
        constructor(props){
            super(props)
            let temp = imgurl;
            let start = temp.lastIndexOf("/");
  
            let temp2 = temp.substr((start+1)).split(".");
            let temp3  = { type: "openslide", name: temp2[0]+".tiff", path: temp2[0]+".tiff" } ;
            this.state = {
                viewtype:1,
                value:temp3
            }
            // this.props.value =temp3;
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
            console.log(this.props.value)
            return(
                <div className={styles.masking}>
                    <div className={styles.mainbox}>
                   {/* {this.state.viewtype == 1 ? <img onClick={this.switch} src={imgurl}></img> : <div onClick={this.canvasck} className={styles.canvas}>canvas</div>}*/}
            {this.state.viewtype == 1 ? <img onClick={this.switch} src={imgurl}></img> : <WSIBox onClick={this.canvasck} className={styles.canvas} value={this.state.value} />}
                    <div className={styles.btnbox}>
                        <p onClick={closebox}>关闭</p>
                    </div>
                    </div>
                </div>
            )
        }
        static getChildContext() {
            
            return {
                value: this.state.value
            }
        }

        static chlidContextTypes = {
            value: PropTypes.string
        }
    }
    
   
    return <Imgbox/>;
}
export default ImgBox;