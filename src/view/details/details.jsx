import React from "react";
import styles from "./details.pcss";
import Footer from "../components/footer";
import Imgbox from "../components/imgbox";
import common from "../../static/jsx/common";
import {BackTop,Icon} from "antd";
import imgup from '../../static/img/up_arrow.svg';
import './no.css'
class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgurl: "",
      data:JSON.parse(localStorage.getItem('listdata')),
      visibility:true
    };
  }
  viewimg = (item) => {
    this.setState({
      imgurl: item
    });
  };
  closebox = e => {
    e.persist();
    if (e.target.tagName == "IMG") {
      return;
    }
    this.setState({
      imgurl: ""
    });
  };
  flexible = (e)=>{
    e.persist();
    let target;
    if(e.target.tagName=='B'){
      target=e.target;
    }else if(e.target.parentNode=='B'){
      target = e.target.parentNode
    }
    if(target.tagName=='B'){
      if(target.nextSibling.style.maxHeight=='0px'||!target.nextSibling.style.maxHeight){
        target.lastChild.style.transform = 'rotate(0deg)'
        let myheight = target.nextSibling.getAttribute('myheight');
        target.nextSibling.style.maxHeight =myheight+'px'

      }else{
        target.nextSibling.style.maxHeight = '0px';
        target.lastChild.style.transform = 'rotate(-90deg)'
      }
    }
  }
  render() {
    return (
      <div>
        <div className={styles.PageHeader}><span onClick={()=>{this.props.history.go(-1)}}><Icon type="arrow-left" />Back</span></div>
        <div className={styles.title}>{this.state.data.title}</div>
        <div className={styles.main}>
          <div className={styles.box}>
           {/* <p className={styles.titlename}>作者：</p>
            <p>{this.state.data.author}</p>
            <p className={styles.titlename}>来源：</p>
            <p>{this.state.data.source}</p>*/}
            <p className={styles.titlename}>标题：</p>
            <p><b>{this.state.data.title}</b></p>
            <p className={styles.titlename}>章节：</p>
            <p><b>{this.state.data.capter}</b></p>
            <p className={styles.titlename}>简介：</p>
            <div
              onClick={this.flexible}
              id="content"
              style={this.state.visibility?{opacity:'0'}:{opacity:'1'}}
              className={styles.content}
              dangerouslySetInnerHTML={{
                __html: this.state.data.content
              }}></div>
            <p className={styles.titlename}>小节：</p>
            <p><b>{this.state.data.section}</b></p>
          </div>
          <div className={styles.rightbox}>
            {this.state.data.urls?this.state.data.urls.map((item,index)=>{
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
          </div>
        </div>
        <Footer />
        {this.state.imgurl ? <Imgbox closebox={this.closebox} imgurl={this.state.imgurl} /> : ""}
        <BackTop>
          <div className={styles.backtop}>UP</div>
        </BackTop>
      </div>
    );
  }
  componentWillMount() {
    let reg = /<div id=\"t\d\">/;
    let idreg = /t\d/;
    let data = this.state.data;
    data.content=data.content.replace(/<\/b>/g,'<img style="width:10px;transform:rotate(-90deg);transition:transform .3s;margin-right:150px" src="'+imgup+'"/></b>');
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
    setTimeout(()=>{
      let mainbox = document.getElementsByClassName('mainbox');
      for(let box of mainbox){
        box.setAttribute('myheight',box.clientHeight+20);
        box.style.maxHeight='0px'
      }
      this.setState({
        visibility:false
      })
    },100)

    let domarr = document.getElementsByClassName("lazyload");
    for (let dom of domarr) {
      common.lazyload(dom);
    }
  }
}

export default Details;