import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
import maintenanceTypeActions from '@iso/vex_redux/maintenanceType/actions';
import '@iso/cra/src/index.css';

import useRawFields from '../hooks/useRawFields';
import ModalTemplate from '../../../components/ModalTemplate/ModalTemplate';

const CreateModal = ({ open, setOpen }) => {
  const { confirm } = Modal;
  const intl = useIntl();
  const { createMaintenanceType } = maintenanceTypeActions;

  const dispatch = useDispatch();
  const { rawFields } = useRawFields();

  //confirm and dispatch create maintenanceType action
  function ConfirmCreateMaintenanceTypeHandle() {
    const maintenanceTypeData = this;

    confirm({
      title: intl.formatMessage({
        id: 'text.confirm.maintenanceTypeConfirmCreate',
      }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.maintenanceTypeDescriptionCreate',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(createMaintenanceType(maintenanceTypeData));
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
        titleModal={intl.formatMessage({ id: 'text.createMaintenanceType' })}
        okModal={intl.formatMessage({ id: 'text.create' })}
        isAllowEdit={true}
        confirmHandle={ConfirmCreateMaintenanceTypeHandle}
        rawFields={rawFields}
      />
    </React.Fragment>
  );
};

export default CreateModal;
