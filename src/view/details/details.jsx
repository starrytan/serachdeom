import React from "react";
import styles from "./details.pcss";
import Footer from "../components/footer";
import Imgbox from "../components/imgbox";
import common from "../../static//jsx/common";
import mydata from "./data.json";
import {PageHeader, BackTop} from "antd";
class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgurl: "",
      data:JSON.parse(localStorage.getItem('listdata'))
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
  render() {
    // console.log(this.state.data);
    
    return (
      <div>
        <PageHeader
          style={{padding: "15px 0"}}
          onBack={() => {
            this.props.history.push("/index");
          }}
          title="Back"
        />
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
            <p className={styles.titlename}>小节</p>
            <p><b>{this.state.data.section}</b></p>
            <p className={styles.titlename}>内容：</p>
            <div
              id="content"
              className={styles.content}
              dangerouslySetInnerHTML={{
                __html: this.state.data.content
              }}></div>
          </div>
          <div className={styles.rightbox}>
            {/* <div className={styles.infobox}>
              <p className={styles.infotitle}>InfoBox</p>
              <table className={styles.table}>
                <tbody>
                  <tr>
                    <td width="80">风格</td>
                    <td>扩员</td>
                  </tr>
                  <tr>
                    <td>风格</td>
                    <td>扩员</td>
                  </tr>
                  <tr>
                    <td>风格</td>
                    <td>扩员</td>
                  </tr>
                  <tr>
                    <td>风格</td>
                    <td>扩员</td>
                  </tr>
                </tbody>
              </table>
            </div> */}
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
    // localStorage.setItem('listdata',JSON.stringify(mydata));
    let reg = /<div id=\"t\d\">/;
    let idreg = /t\d/;
    let data = this.state.data;
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
    let domarr = document.getElementsByClassName("lazyload");
    for (let dom of domarr) {
      common.lazyload(dom);
    }
  }
}

export default Details;