import { ProFormText } from '@ant-design/pro-form';
import React from 'react';

const AttrKeyFormItem: React.FC = () => {
  return (
    <>
      <ProFormText
        name="name"
        label="角色名"
        tooltip="最长为 16 位"
        placeholder="请输入角色名"
        rules={[
          { required: true, message: '请输入角色名!' },
          {
            validator: (rule, value, callback) => {
              if (value.length > 16) {
                callback('角色名过长，最长为 16 位');
              } else {
                callback();
              }
            },
          },
        ]}
      />
      <ProFormText
        name="desc"
        label="角色描述"
        rules={[{ required: true, message: '请输入角色描述!' }]}
      />
    </>
  );
};

export default AttrKeyFormItem;
