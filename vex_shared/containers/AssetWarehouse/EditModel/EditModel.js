import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Modal } from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
import assetWarehouseActions from '@iso/vex_redux/assetWarehouse/actions';
import '@iso/cra/src/index.css';
import { EDIT_MODAL } from '@iso/vex_containers/constants';

import ModalTemplate from '../../../components/ModalTemplate/ModalTemplate';
import useRawFields from '../hooks/useRawFields';

const EditModal = ({ open, setOpen }) => {
  const { confirm } = Modal;
  const intl = useIntl();
  const dispatch = useDispatch();
  const { updateAssetWarehouse, removeViewedAssetWarehouse } =
    assetWarehouseActions;
  const [isAllowEdit, setIsAllowEdit] = useState(false);

  const { rawFields } = useRawFields();
  const viewedAssetWarehouse = useSelector(
    state => state.assetWarehouse.viewedAssetWarehouse
  );
  //state

  function ConfirmEditAssetWarehouseHandle() {
    const assetWarehouseData = this;

    confirm({
      title: intl.formatMessage({
        id: 'text.confirm.assetWarehouseConfirmEdit',
      }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.assetWarehouseDescriptionEdit',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(updateAssetWarehouse(assetWarehouseData));
      },
      onCancel() {
        setOpen(true);
      },
    });
  }

  const detailsTitle = intl.formatMessage({ id: 'text.details' });
  const editTitle = intl.formatMessage({ id: 'text.editAssetWarehouse' });
  const titleModal = isAllowEdit ? editTitle : detailsTitle;
  return (
    <React.Fragment>
      <ModalTemplate
        open={open}
        setOpen={setOpen}
        titleModal={titleModal}
        okModal={intl.formatMessage({ id: 'text.edit' })}
        isAllowEdit={isAllowEdit}
        confirmHandle={ConfirmEditAssetWarehouseHandle}
        rawFields={rawFields}
        //props for edit
        parentComponent={EDIT_MODAL}
        setIsAllowEdit={setIsAllowEdit}
        viewedData={viewedAssetWarehouse}
        removeViewedData={removeViewedAssetWarehouse}
      />
    </React.Fragment>
  );
};

export default EditModal;
