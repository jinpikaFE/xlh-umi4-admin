import RightDrawer from '@/components/RightDrawer';
import {
  addAttrVal,
  delAttrVal,
  editAttrVal,
  queryAttrValList,
} from '@/services/mall/attrVal/AttrValController';

import { PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, message, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import AttrKeyFormItem from './components/FormItem';

const AttrVal: React.FC = () => {
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
  const [cItem, setCItem] = useState<Compon.ComponEntity>();
  const refTable = useRef<ActionType>();
  const formRef = useRef<ProFormInstance | any>();

  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const onCloseDrawer = () => {
    setVisibleDrawer(false);
  };

  const edit = async (item: any) => {
    setCItem({
      ...item,
    });
    showDrawer();
  };

  const del = async (id: string | number) => {
    const res = await delAttrVal({ id });
    if (res.code === 200) {
      message.success(res?.message || '删除成功');
      refTable?.current?.reloadAndRest?.();
    }
  };

  const columns: ProColumns<NAttrVal.AttrValEntity>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      hideInSearch: true,
      width: 60,
    },
    {
      title: '属性值名',
      dataIndex: 'name',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '排序',
      dataIndex: 'order',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTimeRange',
      hideInTable: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      valueType: 'dateTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record) => [
        <Button
          type="primary"
          key="editable"
          onClick={() => {
            edit(record);
          }}
        >
          编辑
        </Button>,
        <Popconfirm
          key="del"
          placement="topRight"
          title="确定要删除吗?"
          onConfirm={() => del(record?.id)}
          okText="确定"
          okType="danger"
          cancelText="取消"
        >
          <Button danger key="delete">
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  const renderFormItemDom = () => {
    return <AttrKeyFormItem />;
  };

  const onFinish = async (values: any) => {
    const relVal = {
      ...values,
    };
    if (cItem) {
      // 编辑逻辑，后端要操作组件数据和角色数据
      const res = await editAttrVal({ ...relVal, id: cItem?.id });
      if (res?.code === 200) {
        message.success(res?.message || '创建成功');
        setVisibleDrawer(false);
        refTable?.current?.reload();
      }
    } else {
      // 新增逻辑，后端要操作组件数据和角色数据
      const res = await addAttrVal(relVal);
      if (res?.code === 200) {
        message.success(res?.message || '创建成功');
        setVisibleDrawer(false);
        refTable?.current?.reload();
      }
    }
  };

  return (
    <PageContainer>
      <ProTable
        scroll={{ x: true }}
        bordered
        request={async (params, sort) => {
          const { current, pageSize, createTime, ...restParams } = params;
          const res = await queryAttrValList({
            current,
            pageSize,
            startTime: createTime?.[0] || undefined,
            endTime: createTime?.[1] || undefined,
            ...restParams,
            ...sort,
          });
          if (res?.code === 200) {
            return {
              total: res?.total,
              data: res?.data,
              success: true,
            };
          }
          return {
            success: false,
          };
        }}
        columns={columns}
        actionRef={refTable}
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 20,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30', '50', '100'],
        }}
        dateFormatter="string"
        headerTitle="角色列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              showDrawer();
              setCItem(undefined);
            }}
          >
            新建
          </Button>,
        ]}
      />
      <RightDrawer
        ref={formRef}
        onCloseDrawer={onCloseDrawer}
        visibleDrawer={visibleDrawer}
        cItem={cItem}
        title="新增角色"
        renderFormItemDom={renderFormItemDom}
        onFinish={onFinish as any}
      />
    </PageContainer>
  );
};

export default AttrVal;
