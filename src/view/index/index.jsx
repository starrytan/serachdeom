import React from "react";
import styles from "./index.pcss";
import { Spin } from "antd";
import Footer from "../components/footer";
import common from "../../static/jsx/common";
import axios from "axios";
import Details from "../details/details";
import Imgbox from "../components/imgbox";
import Header from "../components/header";
import Loading from "../components/loading";
import data from "./data.json";
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      example: ["小叶瘤变", "假泌乳性增生"],
      list: [],
      loading: false,
      pageinfo: {},
      keywords: "",
      viewallarr: [0],
      imgurl: ""
    };
  }
  search = val => {
    this.setState(
      {
        keywords: val
      },
      () => {
        this.getdata(0);
      }
    );
    window.history.replaceState({}, "", "?keywords=" + val);
    return false;
  };
  getdata = pageNo => {
    console.log("pageNo: ", pageNo);
    // this.setState({
    //   loading: true
    // });
    let pageinfo = { pageall: 5, page: pageNo };
    let list = this.state.list;
    let arr = data.slice((pageNo - 1) * 2, (pageNo - 1) * 2 + 2);
    setTimeout(() => {
      this.setState({
        pageinfo: pageinfo,
        list: list.concat(arr),
        loading: false
      });
    }, 500);
    // axios
    //     .get(`http://2749q65j10.qicp.vip/querykeywords`,{
    //         params:{
    //             keywords:this.state.keywords,
    //             page:pageNo,
    //             size:10
    //         }
    //     })
    //     .then((res) => {
    //         let pageinfo = res.data.pop();
    //         this.setState({
    //             pageinfo: pageinfo,
    //             list: res.data,
    //             loading:false
    //         })
    //     })
    //     .catch((err) => {
    //         console.log('err: ', err);
    //     })
  };
  handchange = e => {
    e.persist();
    this.setState({
      keywords: e.target.value
    });
  };
  viewall = (index, e) => {
    e.persist();
    let arr = this.state.viewallarr;
    let num = arr.indexOf(index);
    if (num > -1) {
      arr.splice(num, 1);
    } else {
      arr.push(index);
    }
    this.setState({
      viewallarr: arr
    });
  };
  viewimg = item => {
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
    return (
      <div>
        <Header />
        <div className="mainbox">
          <div className={styles.listbox}>
            {this.state.loading ? (
              <Spin className={styles.loading} size="large" />
            ) : this.state.list.length == 0 ? (
              <div className={styles.nothing}>暂无数据</div>
            ) : (
              <div>
                {this.state.list.map((item, index) => {
                  return (
                    <div
                      id={"box" + index}
                      key={index}
                      style={{
                        animationDelay: 0.05 * index + "s",
                        maxHeight:
                          this.state.viewallarr.indexOf(index) > -1
                            ? "none"
                            : index == 0
                            ? "400px"
                            : "400px"
                      }}
                      className={styles.box}
                    >
                      {/* <div onClick={()=>{this.viewall(index)}} className={styles.viewall}>{this.state.viewallarr.indexOf(index)>-1?'收起词条':'查看词条'}</div> */}
                      <Details
                        unfold={this.viewall}
                        viewimg={this.viewimg}
                        data={item}
                        index={index}
                      />
                    </div>
                  );
                })}
                <Loading
                  getData={this.getdata}
                  pageAll={this.state.pageinfo.pageall}
                  page={this.state.pageinfo.page}
                />
              </div>
            )}
          </div>
        </div>
        <Footer />
        {this.state.imgurl ? (
          <Imgbox closebox={this.closebox} imgurl={this.state.imgurl} />
        ) : (
          ""
        )}
      </div>
    );
  }
  componentWillMount() {}
  componentDidMount() {
    let keywords = common.geturldata(this.props.location.search).keywords;
    if (typeof keywords == "string") {
      this.setState(
        {
          keywords: keywords
        },
        () => {
          this.getdata(1);
        }
      );
    }
  }
}
export default Index;
