import React, {Component} from 'react';
import {List, Avatar, Icon} from 'antd';
import './Home.less'
const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'http://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description: 'Ant Design, a design language for background applications, is refined by Ant UED' +
                ' Team.',
        content: 'We supply a series of design principles, practical patterns and high quality des' +
                'ign resources (Sketch and Axure), to help people create their product prototypes' +
                ' beautifully and efficiently.'
    });
}
// const IconText = ({type, text}) => (
//     <span>
//         <Icon type={type} style={{
//             marginRight: 8
//         }}/> {text}
//     </span>
// );
export default class Home extends Component {

    render() {

        return (
            <div id='Home'>
                <List
                    itemLayout="horizontal"
                    size="large"
                    pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 6
                }}
                    dataSource={listData}
                    renderItem={item => (
                    <List.Item key={item.title} actions={[< a > 编辑 </a>, <a>删除</a >]}>
                        <List.Item.Meta
                            avatar={< Avatar src = {
                            item.avatar
                        } />}
                            title={< a href = {
                            item.href
                        } > {
                            item.title
                        } </a>}
                            description={item.description}/> {item.content}
                    </List.Item>
                )}/>
            </div>

        )
    }
}