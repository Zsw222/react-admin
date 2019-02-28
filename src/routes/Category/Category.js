import React, {Component} from 'react';
import {
    Table,
    Divider,
    Button,
    Input,
    Form,
    InputNumber,
    Popconfirm
} from 'antd';
import './Category.less'
const {Column} = Table;
const data = [];
for (let i = 0; i < 8; i++) {
    data.push({
        key: i.toString(),
        id: i.toString(),
        title: `Edrward ${i}`,
        remark: `London Park no. ${i}`
    });
}
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({
    form,
    index,
    ...props
}) => (
    <EditableContext.Provider value={form}>
        <tr {...props}/>
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber/>;
        }
        return <Input/>;
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const {getFieldDecorator} = form;
                    return (
                        <td {...restProps}>
                            {editing
                                ? (
                                    <FormItem
                                        style={{
                                        margin: 0
                                    }}>
                                        {getFieldDecorator(dataIndex, {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: `Please Input ${title}!`
                                                }
                                            ],
                                            initialValue: record[dataIndex]
                                        })(this.getInput())}
                                    </FormItem>
                                )
                                : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data,
            editingKey: '', //当前正在编辑的行的key
            lastEditingKey: ''
        };
        this.columns = [
            {
                title: '序号',
                dataIndex: 'key',
                width: '15%',
                editable: false
            }, {
                title: 'id',
                dataIndex: 'id',
                width: '15%',
                editable: false
            }, {
                title: '类名',
                dataIndex: 'title',
                width: '15%',
                editable: true
            }, {
                title: '备注',
                dataIndex: 'remark',
                width: '40%',
                editable: true
            }, {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                    const editable = this.isEditing(record);
                    return (
                        <div>

                            {editable
                                ? (
                                    <span>
                                        <EditableContext.Consumer>
                                            {form => (
                                                <a
                                                    href="javascript:;"
                                                    onClick={() => this.save(form, record.key)}
                                                   >
                                                    保存
                                                </a>
                                            )}
                                        </EditableContext.Consumer>
                                        <Divider type="vertical" />
                                        <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record)}>
                                            <a>取消</a>
                                        </Popconfirm>
                                    </span>
                                )
                                : (
                                    <span>
                                        <a href="javascript:;" onClick={() => this.edit(record.key)}>编辑</a> 
                                        <Divider type="vertical" />
                                        <a href="javascript:;" onClick={() => this.delete(record.key)}>删除</a>
                                    </span>
                                )}
                        </div>
                    );
                }
            }
        ];
    }

    isEditing = record => record.key === this.state.editingKey;
    add = () => {
        let temp = new Array(...this.state.data);
        let newData = {
            key: (data.length).toString(),
            id: '',
            title: `Edrward ${ (data.length)}`,
            remark: `London Park no.${ (data.length)} `
        }
        temp.push(newData)
        this.edit(newData.key)
        this.setState({data: temp});
    }
    cancel = (record) => {
        if (!record.id) {
            this.delete(record.key)
        }
        this.setState({editingKey: ''})

    };

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row
                });
                this.setState({data: newData, editingKey: ''});
            } else {
                newData.push(row);
                this.setState({data: newData, editingKey: ''});
            }
        });
    }
    // 删除此行数据
    delete(key) {
        let temp = new Array(...this.state.data); //复制原数组
        temp.splice(temp.findIndex(item => item.key === key), 1)//删除数组中此条数据
        this.setState({data: temp});
    }
    edit(key) {
        this.setState({lastEditingKey: this.state.editingKey});//将上一次操作的数据的key保存下来
        this.setState({editingKey: key});
        // 由于setState是异步的，所以会导致状态更新不及时，增加setTimeout解决此问题
        setTimeout(() => {
            if (this.state.lastEditingKey !== '') {
                let newKey = this
                    .state
                    .data
                    .findIndex(item => item.key === this.state.lastEditingKey)
                    // 如果是新增的数据没有保存的则删除
                if (!this.state.data[newKey].id) {
                    this.delete(this.state.lastEditingKey)
                }
            }
        }, 0)

    }

    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell
            }
        };

        const columns = this
            .columns
            .map((col) => {
                if (!col.editable) {
                    return col;
                }
                return {
                    ...col,
                    onCell: record => ({
                        record,
                        inputType: col.dataIndex === 'age'
                            ? 'number'
                            : 'text',
                        dataIndex: col.dataIndex,
                        title: col.title,
                        editing: this.isEditing(record)
                    })
                };
            });

        return (
            <div id='Category'>
                <Button type="primary" onClick={this.add} className='add_btn'>
                    新增
                </Button><Table
                    components={components}
                    bordered
                    dataSource={this.state.data}
                    columns={columns}
                    rowClassName="editable-row"/></div>
        );
    }
}

export default EditableTable
