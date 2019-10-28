import React from 'react';
import styles from './index.pcss'
import { Tabs, Input, Pagination, Spin } from 'antd';
import Footer from '../components/footer';
import data from './data.json';
const {TabPane} = Tabs;
const {Search} = Input;
function callback(key) {
    console.log(key);
}
class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            example: [
                '李白', '杜甫', '白居易', '苏轼', '于谦'
            ],
            list: data,
            loading:false
        }
    }
    search = (val) => {
        console.log('val: ', val);
    }
    getdata = (pageNo) => {
        console.log('pageNo: ', pageNo);
    }
    jump = (id) => {
        console.log('id: ', id);
        this
            .props
            .history
            .push('/details/'+id)
    }
    render() {
        console.log(this.state.list);
        
        return (
            <div>
                <header className={styles.header}><img height='200' src={require('../../static/img/header.jpeg')}/></header>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="知识图谱语义搜索" key="1">
                        <Search
                            placeholder="请输入关键词"
                            enterButton="搜索"
                            size="large"
                            onSearch={this.search}/>
                        <div className={styles.example}>搜索示例：
                        {this
                                .state
                                .example
                                .map((item) => {
                                    return (
                                        <a href='#' key={item}>{item}</a>
                                    )
                                })
                        }</div>
                        <hr className={styles.hr}></hr>
                        <div className={styles.listbox}>
                            {this.state.loading ? <Spin className={styles.loading} size="large" /> : this
                                .state
                                .list
                                .map((item, index) => {
                                    return (
                                        <div
                                           id={'box'+index}
                                            onClick={() => {
                                                this.jump(item.id)
                                            }}
                                            key={index}
                                            style={{animationDelay:0.05*index+'s'}}
                                            className={styles.box}>
                                            <p className={styles.title}>{item.title}</p>
                                            <p className={styles.content}
                                                dangerouslySetInnerHTML={{
                                                    __html: item.content
                                                }}></p>
                                        </div>
                                    )
                                })}
                        </div>
                        <div className={styles.pagination}><Pagination
                            showQuickJumper
                            defaultCurrent={2}
                            total={500}
                            onChange={this.getdata}/></div>
                    </TabPane>
                    <TabPane tab="知识图谱可视化" key="2">
                        <div className={styles.tipsbox}>
                            <div
                                style={{
                                backgroundColor: '#337ab7'
                            }}>
                                <span>诗人社交网络</span>
                            </div>
                            <div
                                style={{
                                backgroundColor: '#5bc0de'
                            }}>
                                <span>诗人迁徙游历</span>
                            </div>
                            <div
                                style={{
                                backgroundColor: '#5cb85c'
                            }}>
                                <span>作品热点地图</span>
                            </div>
                            <div
                                style={{
                                backgroundColor: '#d9534f'
                            }}>
                                <span>诗人社交网络</span>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
                <Footer />
            </div>
        )
    }
    componentWillMount(){
        
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading:false
            })
        }, 100);
    }

}
export default Index;