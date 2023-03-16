import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import { cloneDeep } from 'lodash';
import { useParams } from 'react-router-dom';

import '@iso/cra/src/index.css';
import { ExclamationCircleFilled } from '@ant-design/icons';
import actions from '@iso/vex_redux/vehicle/service/vehicleDocument/actions';
import ModalTemplate from '@iso/vex_components/ModalTemplate/ModalTemplate';

import useRawFields from '../hook/useRawFields.js';

const CreateModal = ({ open, setOpen }) => {
  const { confirm } = Modal;
  const intl = useIntl();
  const { createVehicleDocument } = actions;
  const dispatch = useDispatch();
  const { rawFields } = useRawFields();
  const { id } = useParams();

  //confirm and dispatch create vehicleDocument action
  function confirmCreateVehicleDocumentHandle() {
    const raw = this;
    const vehicleDocumentData = cloneDeep(raw);
    vehicleDocumentData.result.vehicle_id = id;

    confirm({
      title: intl.formatMessage({
        id: 'text.confirm.vehicleDocumentConfirmCreate',
      }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.vehicleDocumentDescriptionCreate',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(createVehicleDocument(vehicleDocumentData));
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
          id: 'text.createVehicleDocument',
        })}
        okModal={intl.formatMessage({ id: 'text.create' })}
        isAllowEdit={true}
        confirmHandle={confirmCreateVehicleDocumentHandle}
        rawFields={rawFields}
      />
    </React.Fragment>
  );
};

export default CreateModal;
