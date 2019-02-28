import React, {Component} from 'react';
import {Table, Divider, Tag, Button} from 'antd';
import './Article.less'
const {Column} = Table;
const data = [
    {
        id: '1',
        title: 'John',
        num: 32,
        abstract: 'New York No. 1 Lake Park',
        content: 'New York No. 1 Lake Park，New York No. 1 Lake Park，New York No. 1 Lake Park',
        category: 'js',
        tags: [
            {
                color: 'black',
                tag: 'nice'
            }, {
                color: 'pink',
                tag: 'developer'
            }
        ]
    }, {
        id: '2',
        title: 'Jim',
        num: 42,
        abstract: 'London No. 1 Lake Park',
        content: 'New York No. 1 Lake Park，New York No. 1 Lake Park，New York No. 1 Lake Park',
        category: 'vue',
        tags: [
            {
                color: 'geekblue',
                tag: 'loser'
            }
        ]
    }, {
        id: '3',
        title: 'Joe',
        num: 32,
        abstract: 'Sidney No. 1 Lake Park',
        content: 'New York No. 1 Lake Park，New York No. 1 Lake Park，New York No. 1 Lake Park',
        category: 'react',
        tags: [
            {
                color: 'pink',
                tag: 'cool'
            }, {
                color: 'green',
                tag: 'teacher'
            }
        ]
    }
];
export default class Article extends Component {
    render() {
        return (
            <div id='Article'>
                <Button type="primary" onClick={this.start} className='add_btn'>
                    新增
                </Button>
                <Table dataSource={data} rowKey="id">
                    <Column title="id" dataIndex="id" key="id"/>
                    <Column title="序号" dataIndex="num" key="num"/>
                    <Column title="标题" dataIndex="title" key="title"/>
                    <Column title="分类" dataIndex="category" key="category"/>
                    <Column title="摘要" dataIndex="abstract" key="abstract"/>
                    <Column title="内容" dataIndex="content" key="content"/>
                    <Column
                        title="标签"
                        dataIndex="tags"
                        key="tags"
                        render={tags => (
                        <span>
                            {tags.map(tagss => <Tag color={tagss.color} key={tagss.tag}>{tagss.tag}</Tag>)}
                        </span>
                    )}/>
                    <Column
                        title="操作"
                        key="action"
                        render={(text, record) => (
                        <span>
                            <Button icon="edit"/>
                            <Divider type="vertical"/>
                            <Button icon="delete"/>
                        </span>
                    )}/>
                </Table>
            </div>

        )
    }
}