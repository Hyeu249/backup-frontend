import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import '@iso/cra/src/index.css';

import { ExclamationCircleFilled } from '@ant-design/icons';
import actions from '@iso/vex_redux/vehicle/service/images/actions';

import ModalTemplate from '@iso/vex_components/ModalTemplate/ModalTemplate';
import useRawFields from '../hooks/useRawFields';

const CreateModal = ({ open, setOpen }) => {
  const { confirm } = Modal;
  const intl = useIntl();
  const { createVehicleImage } = actions;

  const dispatch = useDispatch();
  const { rawFields } = useRawFields();

  //confirm and dispatch create vehicle image action
  function confirmCreateVehicleImagesHandle() {
    const imageData = this;

    confirm({
      title: intl.formatMessage({ id: 'text.confirmCreateVehicleImages' }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.descriptionCreateVehicleImages',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(createVehicleImage(imageData));
        imageData.setOpen(false);
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
        titleModal={intl.formatMessage({ id: 'text.createImages' })}
        okModal={intl.formatMessage({ id: 'text.create' })}
        isAllowEdit={true}
        confirmHandle={confirmCreateVehicleImagesHandle}
        rawFields={rawFields}
      />
    </React.Fragment>
  );
};

export default CreateModal;
