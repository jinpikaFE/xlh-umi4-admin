import RightDrawer from '@/components/RightDrawer';
import {
  addAttrKey,
  delAttrKey,
  editAttrKey,
  queryAttrKeyList,
} from '@/services/mall/AttrKey/AttrKeyController';

import { PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, message, Popconfirm, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import AttrKeyFormItem from './components/FormItem';

const AttrKey: React.FC = () => {
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
  const [cItem, setCItem] = useState<NAttrKey.AttrKeyEntity>();
  const refTable = useRef<ActionType>();
  const formRef = useRef<ProFormInstance | any>();

  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const onCloseDrawer = () => {
    setVisibleDrawer(false);
  };

  const edit = async (item: NAttrKey.AttrKeyEntity) => {
    setCItem({
      ...item,
      attr_val: item?.attr_val?.map(
        (cItem: NAttrKey.AttrKeyEntity) => cItem?.id,
      ),
    });
    showDrawer();
  };

  const del = async (id: string | number) => {
    const res = await delAttrKey({ id });
    if (res.code === 200) {
      message.success(res?.message || '删除成功');
      refTable?.current?.reloadAndRest?.();
    }
  };

  const columns: ProColumns<NAttrKey.AttrKeyEntity>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      hideInSearch: true,
      width: 60,
    },
    {
      title: '属性key名',
      dataIndex: 'name',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '是否作为筛选项',
      dataIndex: 'is_filter',
      valueType: 'select',
      valueEnum: {
        true: '是',
        false: '否',
      },
      render: (_, values) => {
        return (
          <Switch
            defaultChecked={values?.is_filter}
            onChange={async (checked) => {
              const res = await editAttrKey({
                is_filter: checked,
                id: values?.id,
              });
              message.success(res?.message || '编辑成功');
              refTable?.current?.reload();
            }}
          />
        );
      },
    },
    {
      title: '是否作为sku项',
      dataIndex: 'is_sku',
      valueType: 'select',
      valueEnum: {
        true: '是',
        false: '否',
      },
      render: (_, values) => {
        return (
          <Switch
            defaultChecked={values?.is_sku}
            onChange={async (checked) => {
              const res = await editAttrKey({
                is_sku: checked,
                id: values?.id,
              });
              message.success(res?.message || '编辑成功');
              refTable?.current?.reload();
            }}
          />
        );
      },
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
      const res = await editAttrKey({ ...relVal, id: cItem?.id });
      if (res?.code === 200) {
        message.success(res?.message || '创建成功');
        setVisibleDrawer(false);
        refTable?.current?.reload();
      }
    } else {
      // 新增逻辑，后端要操作组件数据和角色数据
      const res = await addAttrKey(relVal);
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
          const res = await queryAttrKeyList({
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
        initialValues={{
          is_sku: true,
          is_filter: true,
        }}
        title="新增角色"
        renderFormItemDom={renderFormItemDom}
        onFinish={onFinish as any}
      />
    </PageContainer>
  );
};

export default AttrKey;
