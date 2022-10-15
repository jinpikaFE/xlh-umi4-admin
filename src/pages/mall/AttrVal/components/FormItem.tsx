import { ProFormDigit } from '@ant-design/pro-components';
import { ProFormText } from '@ant-design/pro-form';
import React from 'react';

const AttrKeyFormItem: React.FC = () => {
  return (
    <>
      <ProFormText
        name="name"
        label="属性名"
        tooltip="最长为 16 位"
        placeholder="请输入属性名"
        rules={[
          { required: true, message: '请输入属性名!' },
          {
            validator: (rule, value, callback) => {
              if (value.length > 16) {
                callback('属性名过长，最长为 16 位');
              } else {
                callback();
              }
            },
          },
        ]}
      />
      <ProFormDigit
        label="排序"
        name="order"
        fieldProps={{ precision: 0 }}
        rules={[{ required: true, message: '请输入!' }]}
      />
    </>
  );
};

export default AttrKeyFormItem;
