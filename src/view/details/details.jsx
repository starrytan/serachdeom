import React from "react";
import styles from "./details.pcss";
import Imgbox from "../components/imgbox";
import common from "../../static/jsx/common";
import imgup from '../../static/img/up_arrow.svg';
import './no.css'
class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgurl: "",
      data:this.props.data,
      visibility:true
    };
  }
  viewimg = (item) => {
    this.props.viewimg(item)
  };
  flexible = (e)=>{
    e.persist();
    let target;
    console.log(e.target.tagName,);
    if(e.target.tagName=='B'){
      target=e.target;
    }else if(e.target.parentNode.tagName=='B'){
      target = e.target.parentNode
    }else{
      return
    }
    if(!target.nextSibling){
      return
    }
      if(target.nextSibling.style.maxHeight=='0px'||!target.nextSibling.style.maxHeight){
        target.firstChild.style.transform = 'rotate(0deg)'
        let myheight = target.nextSibling.getAttribute('myheight');
        target.nextSibling.style.maxHeight =myheight+'px'

      }else{
        target.nextSibling.style.maxHeight = '0px';
        target.firstChild.style.transform = 'rotate(-90deg)'
      }
  }
  render() {
    return (
      <div>
        <div className={styles.title}>{this.state.data.title}</div>
        <div className={styles.main}>
          <div className={styles.box}>
            <p>{this.state.data.section}</p>
            <div
              onClick={this.flexible}
              id="content"
              style={this.state.visibility?{opacity:'0'}:{opacity:'1'}}
              className={styles.content}
              dangerouslySetInnerHTML={{
                __html: this.state.data.content
              }}></div>
          </div>
          {this.state.data.urls&&this.state.data.urls.length>0?<div className={styles.rightbox}>
            {this.state.data.urls ? this.state.data.urls.slice(0, 2).map((item,index)=>{
              return(
                <div key={index} className={styles.infobox}>
                <div
                  onClick={() => {
                    this.viewimg(item);
                  }}
                  className={styles.card}>
                  <img
                     className='lazyload'
                     data={item}
                  />
                </div>
              </div>
              )
            }):''}
          </div>:''}
        </div>
      </div>
    );
  }
  componentWillMount() {
    let reg = /<div id=\"t\d\">/;
    let idreg = /t\d/;
    let data = this.state.data;
    console.log('data: ', data);
    data.content=data.content.replace(/<b class="bb1">/g,'<b class="bb1"><img style="width:10px;transform:rotate(-90deg);transition:transform .3s;margin-right:10px" src="'+imgup+'"/>');
    data.content=data.content.replace(/<b class="bb2">/g,'<b class="bb2"><img style="width:10px;transform:rotate(-90deg);transition:transform .3s;margin-right:10px" src="'+imgup+'"/>');
    data.content=data.content.replace(/<span>/g,'<span class="mainbox">');
    data.content=data.content.replace(/<span class="sub"/g,'<span class="mainbox sub"');
    let imgarr = data.content.match(reg);
    if(imgarr instanceof Array){
      imgarr.map(item => {
        data.content = data.content.replace(
          item,
          item + `<img class="lazyload" data="${data[item.match(idreg)]}" src="" />`
        );
      });
      this.setState({
        data:data
      });
    }
  }
  componentDidMount() {
    if(this.state.data){
      let mainbox = document.getElementsByClassName('mainbox');
      for(let box of mainbox){
        console.log('box: ', box);
        box.setAttribute('myheight',box.clientHeight+20);
        setTimeout(()=>{
          box.style.maxHeight='0px'
        },100)
      }
      this.setState({
        visibility:false
      })
    }
    let domarr = document.getElementsByClassName("lazyload");
    for (let dom of domarr) {
      common.lazyload(dom);
    }
  }
}

export default Details;