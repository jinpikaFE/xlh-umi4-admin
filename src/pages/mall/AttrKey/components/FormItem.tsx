import { queryAttrValList } from '@/services/mall/attrVal/AttrValController';
import {
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
} from '@ant-design/pro-components';
import { ProFormText } from '@ant-design/pro-form';
import React from 'react';

const AttrKeyFormItem: React.FC<{ cItem?: NAttrKey.AttrKeyEntity }> = ({
  cItem,
}) => {
  return (
    <>
      <ProFormText
        name="name"
        label="属性key名"
        tooltip="最长为 16 位"
        placeholder="请输入属性key名"
        rules={[
          { required: true, message: '请输入属性key名!' },
          {
            validator: (rule, value, callback) => {
              if (value.length > 16) {
                callback('属性key名过长，最长为 16 位');
              } else {
                callback();
              }
            },
          },
        ]}
      />
      <ProFormSwitch label="是否作为筛选项" name="is_filter" />
      <ProFormSwitch label="是否作为sku项" name="is_sku" />
      <ProFormDigit
        label="排序"
        name="order"
        fieldProps={{ precision: 0 }}
        rules={[{ required: true, message: '请输入!' }]}
      />
      <ProFormSelect
        label="属性值"
        name="attr_val"
        mode="multiple"
        request={async () => {
          const res = await queryAttrValList({
            current: 1,
            pageSize: 100,
            arr_key_id: cItem?.id,
          });
          if (res?.code === 200) {
            return res?.data?.map((item) => ({
              label: item?.name,
              value: item?.id,
            }));
          }
          return [];
        }}
        rules={[{ required: true, message: '请选择!' }]}
      />
    </>
  );
};

export default AttrKeyFormItem;
