import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
import fuelActions from '@iso/vex_redux/fuel/actions';
import '@iso/cra/src/index.css';

import useRawFields from '../hooks/useRawFields';
import ModalTemplate from '../../../components/ModalTemplate/ModalTemplate';

const CreateModal = ({ open, setOpen }) => {
  const { confirm } = Modal;
  const intl = useIntl();
  const { createFuel } = fuelActions;

  const dispatch = useDispatch();
  const { rawFields } = useRawFields();

  //confirm and dispatch create fuel action
  function ConfirmCreateFuelHandle() {
    const fuelData = this;

    confirm({
      title: intl.formatMessage({
        id: 'text.confirm.fuelConfirmCreate',
      }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.fuelDescriptionCreate',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        // setOpen(false);
        dispatch(createFuel(fuelData));
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
        titleModal={intl.formatMessage({ id: 'text.createFuel' })}
        okModal={intl.formatMessage({ id: 'text.create' })}
        isAllowEdit={true}
        confirmHandle={ConfirmCreateFuelHandle}
        rawFields={rawFields}
      />
    </React.Fragment>
  );
};

export default CreateModal;
