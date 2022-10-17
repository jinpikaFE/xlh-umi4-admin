import FormUploadImg from '@/components/formUploadImg';
import { ProFormText } from '@ant-design/pro-form';
import React from 'react';

const AttrKeyFormItem: React.FC = () => {
  return (
    <>
      <ProFormText
        name="name"
        label="品牌名"
        tooltip="最长为 16 位"
        placeholder="请输入品牌名"
        rules={[
          { required: true, message: '请输入品牌名!' },
          {
            validator: (rule, value, callback) => {
              if (value.length > 16) {
                callback('品牌名过长，最长为 16 位');
              } else {
                callback();
              }
            },
          },
        ]}
      />
      <FormUploadImg
        required
        uploadProps={{ maxCount: 1 }}
        formItemProps={{ name: 'logo', label: 'logo' }}
      />
    </>
  );
};

export default AttrKeyFormItem;
