import React from 'react';
import styles from '../../static/css/components.pcss';
import WSIBox from './wsibox';
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
        canvasck = (e)=>{
            e.stopPropagation();
        }
        render(){
            return(
                <div onClick={closebox} className={styles.masking}>
                    <div className={styles.mainbox}>
                        {/*{this.state.viewtype == 1 ? <img onClick={this.switch} src={imgurl}></img> : <div onClick={this.canvasck} className={styles.canvas}>canvas</div>}*/}
                        {this.state.viewtype == 1 ? <img onClick={this.switch} src={imgurl}></img> : <WSIBox onClick={this.canvasck} className={styles.canvas} />}
                    <div className={styles.btnbox}>
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