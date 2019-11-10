import React from 'react';
import styles from './index.pcss'
import {Tabs, Input, Pagination, Spin} from 'antd';
import Footer from '../components/footer';
import common from '../../static/jsx/common';
import axios from 'axios';
import Details from '../details/details';
import Imgbox from '../components/imgbox';
const {TabPane} = Tabs;
const {Search} = Input;
function callback(key) {
    console.log(key);
}
class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            example: [],
            list:[],
            loading: false,
            pageinfo:{},
            keywords:'',
            viewallarr:[0],
            imgurl:''
        }
    }
    search = (val) => {
        this.setState({
            keywords:val
        },()=>{
            this.getdata(0);
        });
        window.history.replaceState({},'','?keywords='+val);
    }
    getdata = (pageNo) => {
        console.log('pageNo: ', pageNo);
        this.setState({
            loading:true
        });
        axios
            .get(`http://2749q65j10.qicp.vip/querykeywords`,{
                params:{
                    keywords:this.state.keywords,
                    page:pageNo,
                    size:10
                }
            })
            .then((res) => {
                let pageinfo = res.data.pop();
                this.setState({
                    pageinfo: pageinfo,
                    list: res.data,
                    loading:false
                })
            })
            .catch((err) => {
                console.log('err: ', err);
            })
    }
    handchange = (e)=>{
        e.persist();
        this.setState({
            keywords:e.target.value
        })
    }
    viewall = (index,e)=>{
        e.persist();
        let arr = this.state.viewallarr;
        let num = arr.indexOf(index);
        if(num>-1){
            arr.splice(num,1);
        }else{
            arr.push(index);
        }
        this.setState({
            viewallarr:arr
        })
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
        console.log(this.state.list);
        return (
            <div>
                <header className={styles.header}><img height='200' src={require('../../static/img/header.png')}/></header>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="知识图谱语义搜索" key="1">
                        <Search
                            placeholder="请输入关键词"
                            enterButton="搜索"
                            size="large"
                            value={this.state.keywords}
                            onChange={this.handchange}
                            onSearch={this.search}/>
                        <div className={styles.example}>{this
                                .state
                                 .example
                                .map((item) => {
                                    return (
                                        <a href='#' key={item}>{item}</a>
                                    )
                                })}</div>
                        <hr className={styles.hr}></hr>
                        <div className={styles.listbox}>
                            {this.state.loading
                                ? <Spin className={styles.loading} size="large"/>
                                : this.state.list.length == 0
                                    ? <div className={styles.nothing}>暂无数据</div>
                                    : this
                                        .state
                                        .list
                                        .map((item, index) => {
                                            return (
                                                 <div
                                                    id={'box' + index}
                                                    key={index}
                                                    style={{
                                                    animationDelay: 0.05 *index + 's',
                                                    maxHeight:this.state.viewallarr.indexOf(index)>-1?'none':index==0?'400px':'100px'
                                                }}
                                                    className={styles.box}>
                                                    {/* <div onClick={()=>{this.viewall(index)}} className={styles.viewall}>{this.state.viewallarr.indexOf(index)>-1?'收起词条':'查看词条'}</div> */}
                                                    <Details unfold={this.viewall} viewimg={this.viewimg} data={item} index={index} />
                                                 </div>
                                               
                                            )
                                        })}
                        </div>
                        <div className={styles.pagination}><Pagination
                            showQuickJumper
                            defaultCurrrent={0}
                            total={this.state.pageinfo.pageTotal}
                            onChange={this.getdata}/></div>
                    </TabPane>
                </Tabs>
                <Footer/>
                {this.state.imgurl? <Imgbox closebox={this.closebox} imgurl={this.state.imgurl} /> : ""}
            </div>
        )
    }
    componentWillMount() {
        
    }
    componentDidMount() {
        let keywords = common.geturldata(this.props.location.search).keywords;
        if(typeof keywords =='string'){
            this.setState({
                keywords: keywords
            },()=>{
                this.getdata(0)
            })
        }
    }
}
export default Index;