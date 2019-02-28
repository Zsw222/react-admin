import React, {Component} from 'react';

import SimpleMDE from 'simplemde'
import marked from 'marked';
import highlight from 'highlight.js';
import 'simplemde/dist/simplemde.min.css'
import {Form, Icon, Input, Button,Select } from 'antd';

// import 'highlight.js/styles/github.css';
import './About.less'
const {TextArea} = Input;
const Option = Select.Option;
class About extends Component {
    componentDidMount() {
        // marked相关配置  marked.setOptions({     renderer: new marked.Renderer(),     gfm:
        // true,     tables: true,     breaks: true,     pedantic: false,     sanitize:
        // true,     smartLists: true,     smartypants: false,     highlight: function
        // (code) {         return highlight.highlightAuto(code).value;     } });
        this.smde = new SimpleMDE({
            element: document
                .getElementById('editor')
                .childElementCount,
            autofocus: true,
            autosave: true,
            previewRender: function (plainText) {
                return marked(plainText, {
                    renderer: new marked.Renderer(),
                    gfm: true,
                    pedantic: false,
                    sanitize: false,
                    tables: true,
                    breaks: true,
                    smartLists: true,
                    smartypants: true,
                    highlight: function (code) {
                        return highlight
                            .highlightAuto(code)
                            .value;
                    }
                });
            }
        })
    }
    componentWillMount() {}
    // 输入marked文本 inputContent(val) {     this.setState({articleDetail:
    // val.target.value}) }
    render() {
        // const {articleDetail} = this.state
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 3
            },
            wrapperCol: {
                span: 20
            }
        }
        return (
            <div id='editArticle'>
                <Form onSubmit={this.handleSubmit} layout='inline' className='article_form'>
                    <Form.Item label="标题" >
                        {getFieldDecorator('userName', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入标题!'
                                }
                            ]
                        })(
                            <Input
                                placeholder="Username"/>
                        )}
                    </Form.Item>
                    <Form.Item label="作者" >
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入作者!'
                                }
                            ]
                        })(
                            <Input
                                type="password"
                                placeholder="Password"/>
                        )}
                    </Form.Item>
                    <Form.Item label="封面链接">
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入作者!'
                                }
                            ]
                        })(
                            <Input
                                type="password"
                                placeholder="Password"/>
                        )}
                    </Form.Item>
                    <Form.Item label="描述" >
                        {getFieldDecorator('password', {})(
                            <Input style={{ width: '100%' }}
                                type="password"
                                placeholder="Password"/>
                        )}
                    </Form.Item>
                    <Form.Item label="分类" >
                        {getFieldDecorator('password', {})(
                            <Select defaultValue="lucy" style={{ width: 120 }} >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>Disabled</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                          </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="标签" >
                        {getFieldDecorator('password', {})(
                            <Select defaultValue="lucy" style={{ width: 120 }} >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>Disabled</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                          </Select>
                        )}
                    </Form.Item>
                    <Form.Item>

                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>

                    </Form.Item>
                </Form>
                <textarea id="editor"></textarea>
                {/* <TextArea rows={4} value={articleDetail} onChange={this.inputContent}/>
                <div
                    id="content"
                    className="article-detail"
                    dangerouslySetInnerHTML={{
                    __html: this.state.articleDetail
                        ? marked(this.state.articleDetail)
                        : null
                }}/> */}
            </div>

        )
    }
}
const QUE = Form.create()(About)
export default QUE