import ComponTree from '@/components/ComponTree';
import {
  addCategory,
  delCategory,
  editCategory,
  queryCategoryList,
} from '@/services/mall/category/CategoryController';
import { toTree } from '@/utils';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, message, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import AttrKeyFormItem from './components/FormItem';

const ComponManage: React.FC = () => {
  const refTable = useRef<ActionType>();
  const formRef = useRef();
  const childrenRef = useRef<any>(null);

  const [cItem, setCItem] = useState<Compon.ComponEntity>();

  const del = async (id: string) => {
    const res = await delCategory({ id });
    if (res?.code === 200) {
      refTable?.current?.reload();
      message.success('删除成功！');
    }
  };

  const columns: ProColumns[] = [
    {
      title: '图表',
      dataIndex: 'icon',
      valueType: 'avatar',
    },
    {
      title: '组件名称',
      dataIndex: 'name',
      copyable: true,
    },
    {
      title: '序号',
      dataIndex: 'id',
    },
    {
      title: '是否显示',
      dataIndex: 'is_show',
      valueType: 'switch',
    },
    {
      title: '排序',
      dataIndex: 'order',
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record) => [
        <Button
          type="link"
          key="addChild"
          onClick={() => {
            childrenRef.current?.edit({
              pId: record?.id,
              parentName: record?.name,
            });
          }}
        >
          添加子分类
        </Button>,
        <Button
          type="link"
          key="editable"
          onClick={() => {
            setCItem({
              ...record,
              icon: [
                {
                  uid: record?.icon,
                  name: record?.icon?.split('/')?.[
                    record?.icon?.split('/')?.length - 1
                  ],
                  // name: '富文本',
                  status: 'done',
                  url: record?.icon,
                  file_link: record?.icon,
                  thumbUrl: record?.icon,
                },
              ],
              banner: record?.banner?.map((item: any, index: number) => ({
                uid: item + index,
                name: item?.split('/')?.[item?.split('/')?.length - 1],
                // name: '富文本',
                status: 'done',
                url: item,
                file_link: item,
                thumbUrl: item,
              })),
            });
            childrenRef.current?.edit({
              ...record,
              icon: [
                {
                  uid: record?.icon,
                  name: record?.icon?.split('/')?.[
                    record?.icon?.split('/')?.length - 1
                  ],
                  // name: '富文本',
                  status: 'done',
                  url: record?.icon,
                  file_link: record?.icon,
                  thumbUrl: record?.icon,
                },
              ],
              banner: record?.banner?.map((item: any, index: number) => ({
                uid: item + index,
                name: item?.split('/')?.[item?.split('/')?.length - 1],
                // name: '富文本',
                status: 'done',
                url: item,
                file_link: item,
                thumbUrl: item,
              })),
              parentName: record?.p?.name,
            });
          }}
        >
          编辑
        </Button>,
        <span key="del">
          {!record?.children && (
            <Popconfirm
              placement="topRight"
              title="确定要删除吗?"
              onConfirm={() => del(record?.id)}
              okText="确定"
              okType="danger"
              cancelText="取消"
            >
              <Button type="link" danger key="delete">
                删除
              </Button>
            </Popconfirm>
          )}
        </span>,
      ],
    },
  ];

  const renderFormItemDom = () => {
    return (
      // 在组件列表中复制对应的id
      // 当前['admin1', 'test'] 在mock中添加admin即可显示
      <>
        <AttrKeyFormItem />
      </>
    );
  };

  const onFinish = async (values: any) => {
    const relVal = {
      ...values,
      icon: values?.icon?.[0]?.file_link,
      banner: values?.banner?.map(
        (item: { file_link: any }) => item?.file_link,
      ),
    };
    if (cItem && cItem?.name) {
      // 编辑逻辑
      const res = await editCategory({
        ...relVal,
        id: cItem?.id,
        parentName: undefined,
      });
      if (res?.code === 200) {
        message.success(res?.message || '编辑成功');
        refTable?.current?.reload();
        childrenRef.current?.colseDrawer();
      }
    } else {
      const res = await addCategory(relVal);
      if (res.code === 200) {
        message.success(res?.message || '创建成功');
        refTable?.current?.reload();
        childrenRef.current?.colseDrawer();
      }
    }
  };

  return (
    <PageContainer>
      <ComponTree
        ref={childrenRef}
        onFinish={onFinish}
        formRef={formRef}
        refTable={refTable}
        newBtnTitle="添加一级分类"
        proTableProps={{
          headerTitle: '分类列表',
          request: async () => {
            const res = await queryCategoryList();
            if (res?.code === 200) {
              const dataTemp = toTree({
                data: JSON.parse(JSON.stringify(res?.data)),
                key: 'id',
                parentKey: 'pId',
                cb: (item) => item,
              });
              return {
                data: dataTemp,
                success: true,
                total: 0,
              };
            }
            return {
              success: false,
            };
          },
        }}
        FromProps={{
          initialValues: {
            // is_show: true,
            // parentId: cItem?.parentId,
          },
        }}
        cItem={cItem}
        setCItem={setCItem}
        drawerTitle={cItem?.name ? '编辑分类' : '新增分类'}
        renderFormItemDom={renderFormItemDom}
        columns={columns}
      />
    </PageContainer>
  );
};

export default ComponManage;
