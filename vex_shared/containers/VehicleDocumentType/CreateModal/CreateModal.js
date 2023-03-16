import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
import vehicleDocumentTypeActions from '@iso/vex_redux/vehicleDocumentType/actions';
import '@iso/cra/src/index.css';

import useRawFields from '../hooks/useRawFields';
import ModalTemplate from '../../../components/ModalTemplate/ModalTemplate';

const CreateModal = ({ open, setOpen }) => {
  const { confirm } = Modal;
  const intl = useIntl();
  const { createVehicleDocumentType } = vehicleDocumentTypeActions;

  const dispatch = useDispatch();
  const { rawFields } = useRawFields();

  //confirm and dispatch create vehicleDocumentType action
  function ConfirmCreateVehicleDocumentTypeHandle() {
    const vehicleDocumentTypeData = this;

    confirm({
      title: intl.formatMessage({
        id: 'text.confirm.vehicleDocumentTypeConfirmCreate',
      }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.vehicleDocumentTypeDescriptionCreate',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        // setOpen(false);
        dispatch(createVehicleDocumentType(vehicleDocumentTypeData));
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
        titleModal={intl.formatMessage({
          id: 'text.createVehicleDocumentType',
        })}
        okModal={intl.formatMessage({ id: 'text.create' })}
        isAllowEdit={true}
        confirmHandle={ConfirmCreateVehicleDocumentTypeHandle}
        rawFields={rawFields}
      />
    </React.Fragment>
  );
};

export default CreateModal;
