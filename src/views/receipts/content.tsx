import * as React from 'react';

import { Button, Icon, Menu, message, notification, Table, Upload } from 'antd';
import * as _ from 'lodash';
import moment = require('moment');
import { ReceiptService } from '../../api';
import { GetHistory, UploadFile } from '../../model';
import menuKeyList from './menuKeyList';

const { SubMenu }  = Menu;
interface Props {
    dataContext: any;
    setNewState: (newState: any) => void;
}
// tslint:disable-next-line:no-empty-interface
interface State {}
class Content extends React.Component<Props, State> {
    public state: State = {

    };
    constructor(props: Props) {
        super(props);
    }

    public componentDidMount() {
        // console.log('children\'s didmount' , this.props.dataContext);
    }

    public beforeUpload = (file: any) => {
        const { setNewState } = this.props;
        console.log(file);
        const name = file.name;
        const fileStatus = name.indexOf('.xls') > -1 || name.indexOf('.xlsx') > -1 || name.indexOf('.csv') > -1;
        setNewState({
            file,
            fileStatus,
        });
        if (!fileStatus) {
            notification.open({
                description: '请按照模板文件的格式上传',
                duration: 2,
                icon: <Icon type="close-circle" theme="filled" style={{color: '#EF5350'}} />,
                message: '文件格式校验失败',
              });
        }

        return false;
    }

    public upload = async () => {
        const { file, selectKey} = this.props.dataContext;
        const param: UploadFile = {
            file,
            // templateType: selectKey[0],
        };
        const res = await ReceiptService.uploadFile(param, menuKeyList[selectKey[0]]);
        if (res.result) {
            message.success('上传成功！');
        }
    }

    public tableChange = async (pagination: any, filter: any, sorter: any) => {
        const { setNewState, dataContext } = this.props;
        console.log(pagination, filter, sorter);
        const param: GetHistory = {
            active: filter && filter.active && filter.active.length === 1
                        ? (
                            _.includes(filter.active, 'yes') ? 1 : 0
                        )
                        : null,
            asc: sorter && sorter.order ? (sorter.order === 'ascend') : false,
            orderField: sorter && sorter.columnKey ? sorter.columnKey : 'gmtCreate',
            page: pagination.current,
            size: pagination.pageSize,
            templateType: menuKeyList[dataContext.selectKey[0]],
        };
        if (pagination.current === dataContext.current) {
            // 点排序或者筛选的时候需要重新转到第一页
            param.page = 1;
        }
        const res = await ReceiptService.getHistory(param);
        setNewState({
            current: param.page,
            total: 1,
            // tslint:disable-next-line:object-literal-sort-keys
            tableList: [
                {fileName: 'ddsa', gmtCreate: '2019-02-14', id: 111},
            ],
        });
    }

    public render() {
        console.log('render-----------------------content');
        const { dataContext, setNewState } = this.props;
        const { selectKey, selectName, nullArr, file, fileStatus, current, total, pageSize, tableList } = dataContext;
        const column = [
            {
                dataIndex: 'fileName',
                key: 'fileName',
                title: '文件名',
                width: '100px',
            },
            {
                dataIndex: 'creator',
                key: 'creator',
                title: '上传人',
                width: '120px',

            },
            {
                dataIndex: 'gmtCreate',
                key: 'gmtCreate',
                render: (text: any, rec: any) => {
                    return (
                        <div>
                            {text && moment(text).format('YYYY-MM-DD HH:mm:ss')}
                        </div>
                    );
                },
                sorter: true,
                title: '上传时间',
                width: '140px',
            },
            {
                dataIndex: 'fileTime',
                key: 'fileTime',
                render: (text: any, rec: any) => {
                    return (
                        <div>
                            {text && moment(text).format('YYYY-MM')}
                        </div>
                    );
                },
                sorter: true,
                title: '报表年月',
                width: '120px',
            },
            {
                dataIndex: 'active',
                filters: [
                    {
                        text: '有',
                        value: 'yes',
                      },
                      {
                        text: '无',
                        value: 'no',
                      },
                ],
                key: 'active',
                title: '是否有效',
                width: '80px',
            },
            {
                dataIndex: 'action',
                key: 'action',
                render: (text: any, rec: any) => {
                    return (
                        <div
                            style={{
                                color: '#2491F7',
                                cursor: 'pointer',
                            }}
                            // tslint:disable-next-line:jsx-no-lambda
                            onClick={() => {
                                console.log(rec.location);
                                window.open(rec.location);
                            }}
                        >
                            下载
                        </div>
                    );
                },
                title: '操作',
                width: '80px',
            },
        ];
        const props = {
            beforeUpload: this.beforeUpload,
            fileList: nullArr,
            name: 'file',
          };

        return (
            <div
                style={{
                    background: '#fff',
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    padding: '20px',
                }}
            >
                <div
                    style={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: '5px 0 12px',
                    }}
                >
                    <div
                        style={{
                            fontSize: '16px',
                        }}
                    >
                        {selectName}
                        {selectKey && selectKey[0]}
                    </div>
                    <Button
                        type="primary"
                        ghost={true}
                        // tslint:disable-next-line:jsx-no-lambda
                        onClick={() => {
                            const key = menuKeyList[dataContext.selectKey[0]];
                            window.open(`../api/traffic/v1/file/download?templateType=${key}`);
                        }}
                    >
                        <Icon type="download" />下载模板
                    </Button>
                </div>

                <div
                    style={{
                        alignItems: 'center',
                        display: 'flex',
                    }}
                >
                    <Upload {...props}>
                        <Button>
                        <Icon type="upload" /> 上传文件
                        </Button>
                    </Upload>
                    {
                        file != null
                            ? (
                                <div
                                    style={{
                                        color: '#666',
                                        fontSize: '12px',
                                        margin: '0 30px 0 17px',
                                    }}
                                >
                                    <Icon type="paper-clip" style={{marginRight: '5px'}} />
                                    {file.name}
                                </div>
                            )
                            : null
                    }
                    {
                        file != null
                            ? (
                                fileStatus
                                    ? (
                                        <div
                                            style={{
                                                color: '#00A755 ',
                                                fontSize: '12px',
                                            }}
                                        >
                                            <Icon type="check-circle"  style={{marginRight: '5px'}} />
                                            格式校验成功，点击“上传”，存储数据
                                        </div>
                                    )
                                    : (
                                        <div
                                            style={{
                                                color: '#ef5350',
                                                fontSize: '12px',
                                            }}
                                        >
                                            <Icon type="close-circle" style={{marginRight: '5px'}} />
                                            格式校验失败，您可以下载模板来检查格式
                                        </div>
                                    )
                            )
                            : null
                    }
                </div>
                <div
                    style={{
                        color: '#999',
                        fontSize: '12px',
                        marginTop: '10px',
                    }}
                >
                    支持扩展名：.xls  .xlsx  .csv支持Microsoft Excel 2010及以上版本
                </div>

                <Button
                    style={{
                        margin: '16px 0 29px',
                        width: '80px',
                    }}
                    type="primary"
                    // tslint:disable-next-line:jsx-no-lambda
                    onClick={this.upload}
                    disabled={!fileStatus}
                >
                    上传
                </Button>

                <div
                    style={{
                        borderTop: '1px dashed #DDD',
                        flex: 1,
                        margin: '0 -20px',
                        padding: '30px 20px',
                    }}
                >
                    <p
                        style={{
                            color: '#333',
                            fontSize: '14px',
                            marginBottom: '10px',
                        }}
                    >
                        上传历史
                    </p>
                    <Table
                        key={selectKey[0]}
                        // tslint:disable-next-line:jsx-no-lambda
                        rowKey={(record) => record.id}
                        className="yw-table"
                        columns={column}
                        dataSource={tableList}
                        pagination={{
                            current,
                            pageSize,
                            total,
                        }}
                        // loading={true}
                        scroll={{
                            y: document.body.clientHeight - 450,
                        }}
                        onChange={this.tableChange}
                    />
                </div>
            </div>
        );
    }
}

export default Content;
