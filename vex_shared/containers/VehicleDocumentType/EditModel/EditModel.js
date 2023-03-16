import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Modal } from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
import vehicleDocumentTypeActions from '@iso/vex_redux/vehicleDocumentType/actions';
import '@iso/cra/src/index.css';
import { EDIT_MODAL } from '@iso/vex_containers/constants';

import ModalTemplate from '../../../components/ModalTemplate/ModalTemplate';
import useRawFields from '../hooks/useRawFields';

const EditModal = ({ open, setOpen }) => {
  const { confirm } = Modal;
  const intl = useIntl();
  const dispatch = useDispatch();
  const { updateVehicleDocumentType, removeViewedVehicleDocumentType } =
    vehicleDocumentTypeActions;
  const [isAllowEdit, setIsAllowEdit] = useState(false);

  const { rawFields } = useRawFields();
  const viewedVehicleDocumentType = useSelector(
    state => state.vehicleDocumentType.viewedVehicleDocumentType
  );
  //state

  function ConfirmEditVehicleDocumentTypeHandle() {
    const vehicleDocumentTypeData = this;

    confirm({
      title: intl.formatMessage({
        id: 'text.confirm.vehicleDocumentTypeConfirmEdit',
      }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.vehicleDocumentTypeDescriptionEdit',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(updateVehicleDocumentType(vehicleDocumentTypeData));
      },
      onCancel() {
        setOpen(true);
      },
    });
  }

  const detailsTitle = intl.formatMessage({ id: 'text.details' });
  const editTitle = intl.formatMessage({ id: 'text.editVehicleDocumentType' });
  const titleModal = isAllowEdit ? editTitle : detailsTitle;
  return (
    <React.Fragment>
      <ModalTemplate
        open={open}
        setOpen={setOpen}
        titleModal={titleModal}
        okModal={intl.formatMessage({ id: 'text.edit' })}
        isAllowEdit={isAllowEdit}
        confirmHandle={ConfirmEditVehicleDocumentTypeHandle}
        rawFields={rawFields}
        //props for edit
        parentComponent={EDIT_MODAL}
        setIsAllowEdit={setIsAllowEdit}
        viewedData={viewedVehicleDocumentType}
        removeViewedData={removeViewedVehicleDocumentType}
      />
    </React.Fragment>
  );
};

export default EditModal;
