import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
import assetWarehouseActions from '@iso/vex_redux/assetWarehouse/actions';
import '@iso/cra/src/index.css';

import useRawFields from '../hooks/useRawFields';
import ModalTemplate from '../../../components/ModalTemplate/ModalTemplate';

const CreateModal = ({ open, setOpen }) => {
  const { confirm } = Modal;
  const intl = useIntl();
  const { createAssetWarehouse } = assetWarehouseActions;

  const dispatch = useDispatch();
  const { rawFields } = useRawFields();

  //confirm and dispatch create assetWarehouse action
  function ConfirmCreateAssetWarehouseHandle() {
    const assetWarehouseData = this;

    confirm({
      title: intl.formatMessage({
        id: 'text.confirm.assetWarehouseConfirmCreate',
      }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.assetWarehouseDescriptionCreate',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        // setOpen(false);
        dispatch(createAssetWarehouse(assetWarehouseData));
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
        titleModal={intl.formatMessage({ id: 'text.createAssetWarehouse' })}
        okModal={intl.formatMessage({ id: 'text.create' })}
        isAllowEdit={true}
        confirmHandle={ConfirmCreateAssetWarehouseHandle}
        rawFields={rawFields}
      />
    </React.Fragment>
  );
};

export default CreateModal;
