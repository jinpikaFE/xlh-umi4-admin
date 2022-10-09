import FormUploadImg from '@/components/formUploadImg';
import {
  ProFormDigit,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import React from 'react';

const AttrKeyFormItem: React.FC = () => {
  return (
    <>
      <ProFormText width="md" name="pId" label="上级组件" disabled hidden />
      <ProFormText width="md" name="parentName" label="上级组件" disabled />
      <ProFormText
        name="name"
        label="分类名"
        tooltip="最长为 16 位"
        placeholder="请输入分类名"
        rules={[
          { required: true, message: '请输入分类名!' },
          {
            validator: (rule, value, callback) => {
              if (value.length > 16) {
                callback('分类名过长，最长为 16 位');
              } else {
                callback();
              }
            },
          },
        ]}
      />
      <ProFormTextArea
        name="desc"
        label="分类描述"
        rules={[{ required: true, message: '请输入分类描述!' }]}
      />
      <FormUploadImg
        required
        uploadProps={{ maxCount: 1 }}
        formItemProps={{ name: 'icon', label: '图标' }}
      />
      <FormUploadImg
        required
        formItemProps={{ name: 'banner', label: '轮播图' }}
      />
      <ProFormTextArea
        name="key_word"
        label="关键词"
        rules={[{ required: true, message: '请输入关键词!' }]}
      />
      <ProFormSwitch label="是否显示" name="is_show" />
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
