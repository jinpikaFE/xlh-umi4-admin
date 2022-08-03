import type { ProFormInstance, ProFormProps } from '@ant-design/pro-form';
import { DrawerForm } from '@ant-design/pro-form';
import React, { useEffect } from 'react';
import styles from './index.less';
import type { RightDrawerProps } from './type';

const RightDrawer: React.FC<RightDrawerProps & ProFormProps> = React.forwardRef(
  (props, formRef: ProFormInstance | any) => {
    const {
      onCloseDrawer,
      visibleDrawer,
      cItem,
      onFinish,
      title,
      renderFormItemDom,
      ...otherFormProps
    } = props;

    useEffect(() => {
      if (visibleDrawer && cItem) {
        formRef?.current?.resetFields();
        formRef?.current?.setFieldsValue(cItem);
      }
    }, [visibleDrawer, cItem]);

    useEffect(() => {
      if (!cItem) {
        formRef?.current?.resetFields();
      }
    }, [cItem]);

    return (
      <DrawerForm
        className={styles.drawerForm}
        {...{
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }}
        title={title}
        layout="horizontal"
        visible={visibleDrawer}
        drawerProps={{
          forceRender: true,
          // destroyOnClose: true,
          onClose: onCloseDrawer,
        }}
        onFinish={onFinish}
        formRef={formRef}
        {...otherFormProps}
      >
        {renderFormItemDom()}
      </DrawerForm>
    );
  },
);

export default RightDrawer;
