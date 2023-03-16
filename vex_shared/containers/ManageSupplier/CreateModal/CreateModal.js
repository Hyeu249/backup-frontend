import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import '@iso/cra/src/index.css';

import { ExclamationCircleFilled } from '@ant-design/icons';
import actions from '@iso/vex_redux/supplier/service/supplier/actions';

import ModalTemplate from '@iso/vex_components/ModalTemplate/ModalTemplate';
import useRawFields from '../hook/useRawFields';

const CreateModal = ({ open, setOpen }) => {
  const { confirm } = Modal;
  const intl = useIntl();
  const { createSupplier } = actions;

  const dispatch = useDispatch();
  const { rawFields } = useRawFields();

  //confirm and dispatch create supplier action
  function confirmCreateSupplierHandle() {
    const supplierData = this;
    console.log('supplierData', supplierData);
    confirm({
      title: intl.formatMessage({ id: 'text.confirm.supplierConfirmCreate' }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.supplierDescriptionCreate',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(createSupplier(supplierData));
      },
      onCancel() {
        setOpen(true);
      },
    });
  }

  return (
    <React.Fragment>
      <ModalTemplate
        open={open}
        setOpen={setOpen}
        titleModal={intl.formatMessage({ id: 'text.createSupplier' })}
        okModal={intl.formatMessage({ id: 'text.create' })}
        isAllowEdit={true}
        confirmHandle={confirmCreateSupplierHandle}
        rawFields={rawFields}
      />
    </React.Fragment>
  );
};

export default CreateModal;
