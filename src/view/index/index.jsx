import React from 'react';
import styles from './index.pcss'
import {Tabs, Input, Pagination} from 'antd';
import Footer from '../components/footer';
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
            list: [
                {
                    "id": "1231",
                    type:'乳腺疾病',
                    "source":"乳腺疾病",
                    "author":"annam",
                    "title":"导管内乳头状病变",
                    "capter":"导管内乳头状瘤（Isolated intraductal papilloma、Multiple intraductal papilloma）",
                    "section":"导管内乳头状瘤（Isolated intraductal papilloma、Multiple intraductal papilloma）",
                    "content":"<p>导管内乳头状癌是指导管内恶性乳头状病变，纤维血管轴心被覆恶性腺上皮细胞，缺乏肌上皮。多数导管内乳头状癌属于低级别，如周闱没有导管原位癌和浸润性癌，其预后极好。 </p><p><b>大体检查</b></p><p>大体上肿瘤表现为界限清楚的圆形或卵圆形病灶，质地软，色灰白、灰红至棕褐，可伴有出血。37%肿瘤位于囊性扩张的导管或腔隙内，近1/3肿瘤具有乳头状外观。</p><p><b>诊断要点</b></p><p>1 导管和（或）终末导管小叶单位充满纤细、分枝状纤维血管轴心，被覆单一型肿瘤性上皮细胞。</p><p>2 肿瘤细胞呈单层或复层柱状细胞，有序覆盖于纤维血管轴上，形态温和；也可呈复层梭形细胞形态。</p><p>3 肿瘤细胞也可形成微乳头、筛状、实性结构，掩盖了乳头之间的空隙。</p><p>4 肿瘤细胞通常显示低-中级核特征。</p><p>5 乳头间和上皮增生灶内缺少肌上皮细胞，而导管周围存在肌上皮细胞层。</p><p><b>免疫组化</b></p><p>肌上皮标记物（如p63、calponin、SMMHC、SMA、CD10）染色乳头内的肌上皮全部缺失或少数散在阳性，导管周围有肌上皮，CK5/6、CKl4阴性，ER单克隆性表达。</p><p><b>鉴别诊断</b></p><p>良、恶性导管内乳头状病变的鉴别  尽管良、恶性导管内乳头状病变鉴别中没有所谓的绝对特征，但肿瘤内肌上皮细胞完全缺乏则几乎肯定地表明导管内乳头状肿瘤为恶性病变。（见表12-1）</p><p>需要注意的是良、恶性乳头状病变可以并存于同一活检标本中，伴或不伴有其他形式的导管增生。有研究者提出，紧邻导管内乳头状肿瘤的乳腺组织出现DCIS（常常表现为低核级）时，高度提示此导管内乳头状肿瘤可能是乳头状癌，常需要进行免疫组化染色来帮助明确诊断。</p><div id=\"t1\"></div><p><b>乳腺导管内乳头状癌预后</b></p><p>有研究提示乳头状肿瘤的复发似乎与不典型增生累及的范围无关。伴有不典型增生或DCIS的乳头状瘤的最佳处理方案是临床完整切除加上密切随访，并仔细检查乳头状肿瘤周围乳腺组织是否存在不典型增生或DCIS。即使部分导管内乳头状癌确实为具有包膜的浸润性乳头状癌，目前能获得的预后资料显示导管内乳头状癌具有极好的预后，因此临床治疗应避免将其等同于普通型浸润性乳头状癌，处理应类似DCIS。</p>",
                "urls":[]
                }
            ]
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
                        <div className={styles.example}>搜索示例：{this
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
                            {this
                                .state
                                .list
                                .map((item, index) => {
                                    return (
                                        <div
                                            onClick={() => {
                                            this.jump(item.id)
                                        }}
                                            key={index}
                                            className={styles.box}>
                                            <p className={styles.title}>[{item.type}]-{item.title}</p>
                                            <p className={styles.content}
                                                dangerouslySetInnerHTML={{
                                                __html: item.capter
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
    componentDidMount() {}

}
export default Index;